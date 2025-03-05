
import { useState, useEffect } from 'react'
import { useQuery } from "@tanstack/react-query"
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { supabase } from "@/integrations/supabase/client"
import { MessageCircle, Book, ExternalLink } from "lucide-react"

interface ResourcesPopupProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ResourcesPopup({ isOpen, onOpenChange }: ResourcesPopupProps) {
  const telegramGroupLink = "https://t.me/+xvC3KZxuZFpjOTU1"

  const { data: roadmaps } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_resources")
        .select("*")
        .eq('resource_type', 'roadmap')
        .eq('plan_type', 'free')
        .order('title', { ascending: true });
      
      if (error) {
        console.error("Error fetching roadmaps:", error);
        throw error;
      }
      return data;
    },
  });

  const handleJoinClick = () => {
    window.open(telegramGroupLink, '_blank')
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl gradient-text flex items-center justify-center gap-2">
            <Book className="h-5 w-5 animate-float" />
            Free Resources & Roadmaps
          </SheetTitle>
          <SheetDescription className="text-base">
            Access free career roadmaps and join our community for expert guidance
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <Button 
            className="w-full mb-6 bg-[#0088cc] hover:bg-[#006699] text-white hover-lift"
            onClick={handleJoinClick}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Join Free Telegram Group for Counselling
          </Button>
          
          <h3 className="font-medium text-lg mb-3">Available Roadmaps</h3>
          <ScrollArea className="h-[400px] pr-2">
            <div className="space-y-4">
              {roadmaps?.map((resource) => (
                <div 
                  key={resource.id} 
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover-lift bg-card"
                >
                  <h4 className="font-medium mb-1">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 flex items-center"
                  >
                    View Roadmap <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              ))}
              
              {roadmaps?.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No free roadmaps available at the moment.</p>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
