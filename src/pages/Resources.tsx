
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { ExternalLink, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

interface StudyResource {
  id: string;
  title: string;
  description: string;
  url: string;
  resource_type: string;
}

interface ChatMessage {
  isUser: boolean;
  content: string;
}

const Resources = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { isUser: false, content: "Hi! I'm your College Sarthi AI assistant. How can I help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: resources, isLoading: resourcesLoading } = useQuery({
    queryKey: ["study-resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_resources")
        .select("*");
      if (error) throw error;
      return data as StudyResource[];
    },
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = { isUser: true, content: inputMessage.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Here you would typically call your AI service
      // For now, we'll simulate a response
      setTimeout(() => {
        const aiResponse = {
          isUser: false,
          content: "I'm here to help you with college-related questions. While I'm being configured, feel free to check out our study resources listed above!"
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
      setIsLoading(false);
    }
  };

  if (resourcesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <p>Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Study Resources Section */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-8">Free Study Resources</h1>
            <div className="grid grid-cols-1 gap-6">
              {resources?.map((resource) => (
                <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-2xl font-semibold mb-2">{resource.title}</h2>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                  >
                    Access Resource <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Chat Section */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-8">AI Assistant</h2>
            <Card className="p-6">
              <ScrollArea className="h-[500px] pr-4 mb-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;

