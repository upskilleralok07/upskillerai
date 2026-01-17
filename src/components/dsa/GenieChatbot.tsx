import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles, Key, Trash2, Bot, User, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GENIE_SYSTEM_PROMPT = `You are Genie 🧞, a friendly and encouraging DSA (Data Structures and Algorithms) teacher. Your role is to help students learn DSA concepts, understand problems, and build problem-solving skills.

Your personality:
- You're patient, supportive, and genuinely excited about helping students learn
- You use simple analogies and real-world examples to explain complex concepts
- You encourage students and celebrate their progress
- You use occasional emojis to keep the conversation engaging 🎯💡✨
- You break down problems step-by-step
- You ask clarifying questions to understand what the student is struggling with

Your teaching approach:
1. First understand what the student is trying to solve
2. Guide them towards the solution rather than giving direct answers
3. Explain the underlying concepts and patterns
4. Provide hints and pseudocode when needed
5. Suggest similar problems for practice

Rules:
- ONLY answer questions related to DSA, programming, coding interviews, and related technical topics
- If someone asks about anything unrelated (personal questions, general knowledge, etc.), politely redirect them to DSA topics
- Never provide complete copy-paste solutions immediately - guide the student to understand first
- Always explain the time and space complexity of solutions
- Suggest the optimal approach after explaining the brute force method

Start every conversation warmly and be ready to help with DSA! 🧞✨`;

const API_KEY_STORAGE = 'genie_gemini_api_key';

const GenieChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(API_KEY_STORAGE) || '');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const saveApiKey = () => {
    if (!apiKeyInput.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }
    localStorage.setItem(API_KEY_STORAGE, apiKeyInput.trim());
    setApiKey(apiKeyInput.trim());
    setShowApiKeyInput(false);
    setApiKeyInput('');
    toast.success('API key saved! Genie is ready to help 🧞');
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE);
    setApiKey('');
    setMessages([]);
    toast.info('API key cleared');
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    if (!apiKey) {
      setShowApiKeyInput(true);
      toast.error('Please add your Gemini API key first');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: GENIE_SYSTEM_PROMPT },
                ],
                role: 'user',
              },
              ...messages.map(msg => ({
                parts: [{ text: msg.content }],
                role: msg.role === 'user' ? 'user' : 'model',
              })),
              {
                parts: [{ text: userMessage.content }],
                role: 'user',
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response');
      }

      const data = await response.json();
      const assistantContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t generate a response. Please try again.';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Genie error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      
      if (errorMessage.includes('API key')) {
        toast.error('Invalid API key. Please check and try again.');
        setShowApiKeyInput(true);
      } else {
        toast.error(`Genie encountered an error: ${errorMessage}`);
      }
      
      // Remove the user message if we couldn't get a response
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast.info('Chat cleared');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full",
          "bg-gradient-to-r from-primary to-red-600 shadow-lg",
          "flex items-center justify-center text-white",
          "hover:scale-110 transition-transform duration-200",
          "red-glow animate-pulse-glow",
          isOpen && "hidden"
        )}
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] flex flex-col shadow-2xl border-primary/20 bg-card/95 backdrop-blur-xl">
          <CardHeader className="pb-3 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-red-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Genie 🧞
                    <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
                      DSA Expert
                    </Badge>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">Your DSA Learning Companion</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={clearChat} title="Clear chat">
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShowApiKeyInput(!showApiKeyInput)} title="API Key">
                  <Key className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* API Key Input */}
            {showApiKeyInput && (
              <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Enter your Gemini API key (stored locally)
                </p>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="AIza..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="text-xs h-8"
                  />
                  <Button size="sm" onClick={saveApiKey} className="h-8 px-3">
                    Save
                  </Button>
                </div>
                {apiKey && (
                  <Button variant="link" size="sm" onClick={clearApiKey} className="text-xs text-destructive mt-1 p-0 h-auto">
                    Clear saved key
                  </Button>
                )}
              </div>
            )}
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Hey there! I'm Genie 🧞</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your friendly DSA teacher. Ask me anything about:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Arrays', 'Trees', 'DP', 'Graphs', 'Sorting'].map(topic => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  {!apiKey && (
                    <p className="text-xs text-amber-500 mt-4 flex items-center gap-1">
                      <Key className="w-3 h-3" />
                      Add your Gemini API key to start
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.role === 'user' && "flex-row-reverse"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        message.role === 'user' 
                          ? "bg-primary/20" 
                          : "bg-gradient-to-br from-primary to-red-600"
                      )}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-primary" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.role === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-red-600 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-muted rounded-lg px-4 py-3">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder={apiKey ? "Ask Genie about DSA..." : "Add API key to chat"}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!apiKey || isLoading}
                  className="flex-1 bg-muted border-border focus:border-primary"
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={!apiKey || isLoading || !inputMessage.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by Gemini • Only for DSA learning
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default GenieChatbot;
