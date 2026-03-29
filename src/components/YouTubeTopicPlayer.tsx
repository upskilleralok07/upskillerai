import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface VideoTopic {
  id: string;
  title: string;
  start_time: number;
  end_time: number;
  submoduleId: string;
}

interface YouTubeTopicPlayerProps {
  videoId: string;
  topics: VideoTopic[];
  completedIds: Set<string>;
  onTopicComplete: (submoduleId: string) => void;
  onClose?: () => void;
}

const formatSeconds = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const YouTubeTopicPlayer = ({
  videoId,
  topics,
  completedIds,
  onTopicComplete,
}: YouTubeTopicPlayerProps) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [activeTopic, setActiveTopic] = useState<VideoTopic | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const autoCompleteTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(tag, firstScript);

    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (autoCompleteTimerRef.current) clearTimeout(autoCompleteTimerRef.current);
      if (playerRef.current?.destroy) playerRef.current.destroy();
    };
  }, []);

  const initPlayer = useCallback(() => {
    if (playerRef.current?.destroy) playerRef.current.destroy();
    
    playerRef.current = new window.YT.Player('yt-topic-player', {
      videoId,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        controls: 1,
      },
      events: {
        onReady: () => setIsReady(true),
        onStateChange: (event: any) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        },
      },
    });
  }, [videoId]);

  // Poll current time and auto-pause at end_time
  useEffect(() => {
    if (!isPlaying || !activeTopic || !playerRef.current?.getCurrentTime) return;

    intervalRef.current = setInterval(() => {
      const time = playerRef.current.getCurrentTime();
      setCurrentTime(time);

      if (time >= activeTopic.end_time) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
        // Auto-complete on reaching end
        if (!completedIds.has(activeTopic.submoduleId)) {
          onTopicComplete(activeTopic.submoduleId);
        }
      }
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, activeTopic, completedIds, onTopicComplete]);

  // Auto-complete after 30s of watching
  useEffect(() => {
    if (!activeTopic || !isPlaying) {
      if (autoCompleteTimerRef.current) clearTimeout(autoCompleteTimerRef.current);
      return;
    }

    autoCompleteTimerRef.current = setTimeout(() => {
      if (!completedIds.has(activeTopic.submoduleId)) {
        onTopicComplete(activeTopic.submoduleId);
      }
    }, 30000);

    return () => {
      if (autoCompleteTimerRef.current) clearTimeout(autoCompleteTimerRef.current);
    };
  }, [activeTopic, isPlaying, completedIds, onTopicComplete]);

  const playTopic = (topic: VideoTopic) => {
    setActiveTopic(topic);
    if (playerRef.current?.seekTo && isReady) {
      playerRef.current.seekTo(topic.start_time, true);
      playerRef.current.playVideo();
    }
  };

  const topicDuration = (t: VideoTopic) => t.end_time - t.start_time;

  const getTopicProgress = (t: VideoTopic) => {
    if (!activeTopic || activeTopic.id !== t.id) return 0;
    const elapsed = currentTime - t.start_time;
    const dur = topicDuration(t);
    return Math.min(100, Math.max(0, (elapsed / dur) * 100));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {/* Player */}
      <div className="flex-1 min-w-0">
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <div id="yt-topic-player" className="w-full h-full" />
        </div>
        {activeTopic && (
          <div className="mt-3 p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{activeTopic.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatSeconds(activeTopic.start_time)} – {formatSeconds(activeTopic.end_time)}
                </p>
              </div>
              <Badge variant={isPlaying ? 'default' : 'secondary'} className="text-xs">
                {isPlaying ? 'Playing' : 'Paused'}
              </Badge>
            </div>
            <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${getTopicProgress(activeTopic)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Topic List */}
      <div className="lg:w-80 flex-shrink-0">
        <h4 className="text-sm font-semibold text-foreground mb-3 px-1">
          Topics ({topics.length})
        </h4>
        <ScrollArea className="h-[400px] lg:h-[480px]">
          <div className="space-y-1 pr-2">
            {topics.map((topic, idx) => {
              const isActive = activeTopic?.id === topic.id;
              const isCompleted = completedIds.has(topic.submoduleId);
              const dur = topicDuration(topic);
              const mins = Math.ceil(dur / 60);

              return (
                <button
                  key={topic.id}
                  onClick={() => playTopic(topic)}
                  className={`w-full text-left p-3 rounded-lg transition-all group ${
                    isActive
                      ? 'bg-primary/15 border border-primary/30 shadow-sm'
                      : 'hover:bg-muted/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium ${
                      isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : isActive
                        ? 'bg-primary/20 text-primary border border-primary/40'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : isActive && isPlaying ? (
                        <Pause className="w-3 h-3" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-tight ${
                        isActive ? 'text-primary font-medium' : isCompleted ? 'text-primary/80' : 'text-foreground'
                      }`}>
                        {topic.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-muted-foreground">
                          <Clock className="w-3 h-3 inline mr-0.5" />
                          {mins} min
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {formatSeconds(topic.start_time)}
                        </span>
                      </div>
                      {isActive && (
                        <div className="mt-1.5 h-0.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${getTopicProgress(topic)}%` }}
                          />
                        </div>
                      )}
                    </div>
                    {!isActive && (
                      <Play className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default YouTubeTopicPlayer;
