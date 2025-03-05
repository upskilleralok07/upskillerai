
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Send, MessageSquare } from "lucide-react"
import { ResourcesPopup } from './ResourcesPopup'

interface PaymentButtonProps {
  amount: number
  productName: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function PaymentButton({ amount, productName, onSuccess, onError }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const { toast } = useToast()
  
  // Different WhatsApp group links based on amount
  const whatsappGroupLinks = {
    399: "https://chat.whatsapp.com/ByBo7LqvC9r7KPqY2Gdx9V", // For ₹399 plan
    699: "https://chat.whatsapp.com/LxqaRjEm8tv5D1u5qabyIh", // For ₹699 plan
    default: "https://chat.whatsapp.com/ByBo7LqvC9r7KPqY2Gdx9V" // Default link
  }

  const telegramGroupLink = "https://t.me/+xvC3KZxuZFpjOTU1" // Telegram group for free analysis

  const getWhatsAppLink = () => {
    if (amount === 699) return whatsappGroupLinks[699]
    if (amount === 399) return whatsappGroupLinks[399]
    return whatsappGroupLinks.default
  }

  const handlePayment = async () => {
    try {
      setLoading(true)

      // If it's the free plan, open resources popup and redirect to Telegram
      if (amount === 0) {
        setResourcesOpen(true)
        toast({
          title: "Free Resources Available",
          description: "We've opened our free roadmaps and resources for you",
        })
        window.open(telegramGroupLink, '_blank')
        onSuccess?.()
        return
      }

      // Get current user session for paid plans
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to continue",
          variant: "destructive",
        })
        return
      }

      // Get the appropriate WhatsApp link
      const whatsappLink = getWhatsAppLink()

      // Show success toast
      toast({
        title: "Redirecting to WhatsApp",
        description: "You'll be redirected to our WhatsApp group to complete the payment",
      })
      
      // Redirect to WhatsApp group
      window.open(whatsappLink, '_blank')
      
      onSuccess?.()
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Redirection Failed",
        description: "Unable to redirect. Please try again.",
        variant: "destructive",
      })
      onError?.(error as string)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button 
        onClick={handlePayment} 
        disabled={loading}
        className={`hover-lift ${amount === 0 ? 
          "bg-[#0088cc] hover:bg-[#006699] text-white" : 
          "bg-[#25D366] hover:bg-[#128C7E] text-white"}`}
      >
        {amount === 0 ? (
          loading ? (
            "Redirecting..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get Free Analysis
            </>
          )
        ) : (
          loading ? (
            "Redirecting..."
          ) : (
            <>
              <MessageSquare className="w-4 h-4 mr-2" />
              Pay ₹{amount} with WhatsApp
            </>
          )
        )}
      </Button>
      <ResourcesPopup isOpen={resourcesOpen} onOpenChange={setResourcesOpen} />
    </>
  )
}
