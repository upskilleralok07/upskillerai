
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

  const initiatePayment = async () => {
    try {
      setLoading(true)

      // Get current user session
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to make a payment",
          variant: "destructive",
        })
        return
      }

      // Create a unique order ID
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

      // Call our payment function
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          amount,
          orderId,
          productName,
          userPhone: session.user.phone || '',
        },
      })

      if (error) throw error

      if (data.paymentUrl) {
        // In a real implementation, you would:
        // 1. Redirect to PhonePe's payment page
        // 2. Handle the payment callback
        // For now, we'll just show a success message
        toast({
          title: "Payment Initiated",
          description: "Please complete the payment in your PhonePe app",
        })
        onSuccess?.()
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: "Payment Failed",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      })
      onError?.(error as string)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={initiatePayment} 
      disabled={loading}
      className="bg-[#5F259F] hover:bg-[#4A1D7A] text-white"
    >
      {loading ? "Processing..." : `Pay ₹${amount} with PhonePe`}
    </Button>
  )
}
