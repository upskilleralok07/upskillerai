
import { useState } from "react";
import { Mail, MapPin, Instagram, Youtube, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

const UpskillerContact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you soon." });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Contact <span className="gradient-text">Upskiller</span>
          </h1>
          <p className="text-lg text-muted-foreground">Course inquiries, collaboration requests, or mentorship questions — we're here to help.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                <h3 className="font-semibold text-foreground">Based in</h3>
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
                <a href="https://instagram.com/upskiller1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary"><Instagram className="w-5 h-5" />Instagram</a>
                <a href="https://youtube.com/@upskiller1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary"><Youtube className="w-5 h-5" />YouTube</a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <Input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <Input placeholder="Subject (e.g., Course Inquiry, Collaboration)" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
            <Textarea placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="min-h-[120px]" />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpskillerContact;
