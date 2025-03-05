
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface PaymentButtonProps {
  amount: number
  productName: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function PaymentButton({ amount, productName, onSuccess, onError }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  
  const whatsappGroupLink = "https://chat.whatsapp.com/ByBo7LqvC9r7KPqY2Gdx9V"

  const handlePayment = async () => {
    try {
      setLoading(true)

      // Get current user session
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to continue",
          variant: "destructive",
        })
        return
      }

      // Show success toast
      toast({
        title: "Redirecting to WhatsApp",
        description: "You'll be redirected to our WhatsApp group to complete the payment",
      })
      
      // Redirect to WhatsApp group
      window.open(whatsappGroupLink, '_blank')
      
      onSuccess?.()
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Redirection Failed",
        description: "Unable to redirect to WhatsApp. Please try again.",
        variant: "destructive",
      })
      onError?.(error as string)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={handlePayment} 
      disabled={loading}
      className="bg-[#25D366] hover:bg-[#128C7E] text-white"
    >
      {amount === 0 ? (
        "Get Free Analysis"
      ) : (
        loading ? "Redirecting..." : `Pay ₹${amount} with WhatsApp`
      )}
    </Button>
  )
}
