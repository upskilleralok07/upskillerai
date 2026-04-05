
import { useState } from "react";
import { Mail, MapPin, Instagram, Youtube, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

const CollegeSarthiContact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24-48 hours." });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const policies = [
    { title: "Contact Policy", content: "We aim to respond to all inquiries within 24-48 hours. Please use the contact form or email us directly at alok46134@gmail.com." },
    { title: "Refund Policy", content: "We offer a 3-day refund policy for premium mentorship plans. Refund requests must be submitted within 3 days of purchase." },
    { title: "Privacy Policy", content: "We collect and store user data only for mentorship purposes. We do not share your personal information with third parties without your consent." },
    { title: "Disclaimer", content: "College Sarthi provides guidance based on available data and expert insights. We do not guarantee college admission or rank improvements." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Contact <span className="gradient-text">College Sarthi</span>
          </h1>
          <p className="text-lg text-muted-foreground">Get in touch for counselling inquiries, mentorship bookings, or support.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <p className="text-muted-foreground">alok46134@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Address</h3>
                <p className="text-muted-foreground">Bhopal, Madhya Pradesh</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MessageCircle className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">WhatsApp</h3>
                <a href="https://wa.me/917389031762" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chat with us</a>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="font-semibold text-foreground mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://instagram.com/upskiller1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" /><span>Instagram</span>
                </a>
                <a href="https://youtube.com/@upskiller1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Youtube className="w-5 h-5" /><span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <Input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <Input placeholder="Phone Number (optional)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <Textarea placeholder="Your Message (e.g., counselling inquiry, mentorship booking)" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="min-h-[120px]" />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">Our Policies</h2>
          <Accordion type="single" collapsible className="w-full">
            {policies.map((p, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{p.title}</AccordionTrigger>
                <AccordionContent>{p.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CollegeSarthiContact;
