
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

const JoinWhatsApp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    console.log("Form submitted");
  };

  return (
    <div className="p-8 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in border border-border dark:bg-gray-800/50">
      <div className="grid md:grid-cols-2 gap-8">
        {/* WhatsApp Section */}
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-2xl font-bold text-center mb-6 dark:text-white">
            Join Our WhatsApp Community
          </h3>
          <img 
            src="/lovable-uploads/80322bb6-ffce-4839-a5b6-561d9e6ca1d7.png" 
            alt="WhatsApp QR Code" 
            className="w-64 h-64 object-contain bg-white p-4 rounded-xl"
          />
          <p className="text-center text-muted-foreground dark:text-gray-300 max-w-md">
            Scan this QR code to join our WhatsApp group for exclusive updates, tips, and community discussions
          </p>
          <Button 
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold"
            onClick={() => window.open('https://chat.whatsapp.com/HRDY89g8TK42vWujw0Vwte')}
          >
            Join Now
          </Button>
        </div>

        {/* Login/Signup Section */}
        <div className="flex flex-col">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Sign Up</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default JoinWhatsApp;
