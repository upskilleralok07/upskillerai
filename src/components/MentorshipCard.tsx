
import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentButton } from "./PaymentButton"

interface MentorshipCardProps {
  title: string
  description: string
  features: string[]
  price: string
  planType: "free" | "premium"
  featured?: boolean
}

const MentorshipCard = ({
  title,
  description,
  features,
  price,
  planType,
  featured = false,
}: MentorshipCardProps) => {
  const amount = price === "Free" ? 0 : parseInt(price.replace("₹", ""))

  return (
    <Card className={`relative ${
      featured ? "border-primary shadow-lg scale-105" : ""
    }`}>
      {featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-muted-foreground mt-2">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-3xl font-bold">
            {price}
            {price !== "Free" && <span className="text-base font-normal">/session</span>}
          </div>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            {planType === "free" ? (
              <PaymentButton 
                amount={0} 
                productName={title}
                onSuccess={() => console.log("Free plan selected")}
              />
            ) : (
              <PaymentButton 
                amount={amount} 
                productName={title}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MentorshipCard
