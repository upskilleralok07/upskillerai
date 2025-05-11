
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { ExternalLink, Send, ChevronRight, Download, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FreeRankAnalysis } from "@/components/FreeRankAnalysis";

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

  const { data: resources, isLoading: resourcesLoading, error } = useQuery({
    queryKey: ["study-resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_resources")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      return data as StudyResource[];
    },
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { isUser: true, content: inputMessage.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulated AI response for now
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

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load resources. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Free Resources & Analysis</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access free study materials, get a quick rank analysis, or chat with our AI assistant to help with your college journey
          </p>
        </div>

        <Tabs defaultValue="resources" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="resources">Study Resources</TabsTrigger>
            <TabsTrigger value="rank-analysis">Free Rank Analysis</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources?.map((resource) => (
                <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow h-full">
                  <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
                  <p className="text-muted-foreground mb-4 flex-grow">{resource.description}</p>
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
              
              {resources?.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No resources found</h3>
                  <p className="text-muted-foreground">Check back soon for updated study materials</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rank-analysis">
            <FreeRankAnalysis />
          </TabsContent>
          
          <TabsContent value="ai-assistant">
            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">College Sarthi AI Assistant</h2>
                <p className="text-muted-foreground">
                  Ask any questions about college admissions, JEE preparation, or career guidance
                </p>
              </div>
              <ScrollArea className="h-[400px] pr-4 mb-4 border rounded-lg p-4">
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
                  placeholder="Type your question about colleges or JEE..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage} disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 bg-muted/30 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Need More Personalized Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Download Our Ultimate Guide</h3>
                <p className="text-sm text-muted-foreground">Complete roadmap for JEE preparation and college admission strategy</p>
                <Button variant="link" className="p-0 h-auto mt-1">
                  Download PDF <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Schedule 1:1 Counseling</h3>
                <p className="text-sm text-muted-foreground">Get expert guidance tailored to your specific needs and goals</p>
                <Button variant="link" className="p-0 h-auto mt-1">
                  Book Now <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
