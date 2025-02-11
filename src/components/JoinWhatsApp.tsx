
import { Button } from "./ui/button";

const JoinWhatsApp = () => {
  return (
    <div className="p-8 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in border border-border dark:bg-gray-800/50">
      <h3 className="text-2xl font-bold text-center mb-6 dark:text-white">
        Join Our WhatsApp Community
      </h3>
      <div className="flex flex-col items-center gap-6">
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
          onClick={() => window.open('https://wa.me/qr/YOUR_WHATSAPP_LINK')}
        >
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default JoinWhatsApp;
