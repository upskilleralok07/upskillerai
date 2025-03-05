
import { useState, useEffect } from 'react'
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function TelegramPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const telegramGroupLink = "https://t.me/+xvC3KZxuZFpjOTU1"

  useEffect(() => {
    // Check if the popup has been shown before
    const hasSeenPopup = localStorage.getItem('telegramPopupSeen')
    
    // Show popup after 3 seconds if not seen before
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        // Set flag in localStorage so it doesn't show again in this session
        localStorage.setItem('telegramPopupSeen', 'true')
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleJoinClick = () => {
    window.open(telegramGroupLink, '_blank')
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl">Join Our Telegram Community!</SheetTitle>
          <SheetDescription className="text-base">
            Get free counseling and college guidance from our experts
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <p className="mb-4">
            Join our Telegram group to:
          </p>
          <ul className="space-y-2 mb-6 pl-5 list-disc">
            <li>Receive free college counseling</li>
            <li>Get answers to your admission queries</li>
            <li>Access exclusive resources and tips</li>
            <li>Connect with other aspiring students</li>
          </ul>
          <div className="flex justify-center">
            <Button 
              className="bg-[#0088cc] hover:bg-[#006699] text-white" 
              onClick={handleJoinClick}
            >
              Join Telegram Group
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
