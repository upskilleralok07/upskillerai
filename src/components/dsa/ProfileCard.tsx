import { useState } from 'react';
import { User, MapPin, Phone, Mail, Shirt, GraduationCap, Edit2, Save, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDSAProfile } from '@/hooks/useDSAProfile';
import { useAuth } from '@/contexts/AuthContext';

const TSHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProfileCard = () => {
  const { user } = useAuth();
  const { profile, loading, saving, updateProfile } = useDSAProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    address: '',
    phone: '',
    tshirt_size: 'M',
  });

  const handleEdit = () => {
    setFormData({
      name: profile.name,
      college: profile.college,
      address: profile.address,
      phone: profile.phone,
      tshirt_size: profile.tshirt_size,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Card className="premium-card red-border-glow overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary via-red-500 to-orange-500" />
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="premium-card red-border-glow overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary via-red-500 to-orange-500" />
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Please login to view profile</p>
        </CardContent>
      </Card>
    );
  }

  const displayName = profile.name || user.user_metadata?.full_name || 'Student';
  const displayEmail = profile.email || user.email || '';

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
          {isEditing ? (
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                onClick={handleCancel}
                disabled={saving}
              >
                <X className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-primary hover:text-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handleEdit}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center red-glow-sm overflow-hidden">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success flex items-center justify-center border-2 border-card">
              <span className="text-[10px] text-white">✓</span>
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your name"
                className="font-bold text-lg bg-muted/50 border-primary/30 focus:border-primary"
              />
            ) : (
              <>
                <h3 className="font-bold text-foreground text-lg">{displayName}</h3>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                  Premium Member
                </Badge>
              </>
            )}
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
              {isEditing ? (
                <Input
                  value={formData.college}
                  onChange={(e) => handleChange('college', e.target.value)}
                  placeholder="Your college name"
                  className="h-8 text-sm bg-muted/50 border-primary/30 focus:border-primary"
                />
              ) : (
                <p className="font-medium truncate">{profile.college || 'Not specified'}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Address</p>
              {isEditing ? (
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Your address"
                  className="h-8 text-sm bg-muted/50 border-primary/30 focus:border-primary"
                />
              ) : (
                <p className="font-medium truncate">{profile.address || 'Not specified'}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium truncate">{displayEmail}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Phone</p>
              {isEditing ? (
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="h-8 text-sm bg-muted/50 border-primary/30 focus:border-primary"
                />
              ) : (
                <p className="font-medium">{profile.phone || 'Not specified'}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shirt className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">T-Shirt Size</p>
              {isEditing ? (
                <Select
                  value={formData.tshirt_size}
                  onValueChange={(value) => handleChange('tshirt_size', value)}
                >
                  <SelectTrigger className="h-8 text-sm bg-muted/50 border-primary/30 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TSHIRT_SIZES.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium">{profile.tshirt_size || 'M'}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
