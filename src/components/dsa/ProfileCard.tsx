import { User, MapPin, Phone, Mail, Shirt, GraduationCap, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProfileCardProps {
  name?: string;
  college?: string;
  address?: string;
  tshirtSize?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

const ProfileCard = ({
  name = "John Doe",
  college = "IIT Delhi",
  address = "New Delhi, India",
  tshirtSize = "L",
  email = "john@example.com",
  phone = "+91 98765 43210",
  avatar
}: ProfileCardProps) => {
  return (
    <Card className="premium-card red-border-glow overflow-hidden">
      {/* Decorative top gradient */}
      <div className="h-2 bg-gradient-to-r from-primary via-red-500 to-orange-500" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center red-glow-sm overflow-hidden">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success flex items-center justify-center border-2 border-card">
              <span className="text-[10px] text-white">✓</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">{name}</h3>
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              Premium Member
            </Badge>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid gap-3 pt-2">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">College</p>
              <p className="font-medium truncate">{college}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Address</p>
              <p className="font-medium truncate">{address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium truncate">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium">{phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shirt className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">T-Shirt Size</p>
              <p className="font-medium">{tshirtSize}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
