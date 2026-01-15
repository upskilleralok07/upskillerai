import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface DSAProfile {
  name: string;
  email: string;
  phone: string;
  college: string;
  address: string;
  tshirt_size: string;
  avatar_url: string | null;
  dsa_access_date: string | null;
}

const defaultProfile: DSAProfile = {
  name: '',
  email: '',
  phone: '',
  college: '',
  address: '',
  tshirt_size: 'M',
  avatar_url: null,
  dsa_access_date: null,
};

export const useDSAProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<DSAProfile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch profile from Supabase
  const fetchProfile = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, email, phone, college, address, tshirt_size, avatar_url, dsa_access_date')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({
          name: data.name || user.user_metadata?.full_name || '',
          email: data.email || user.email || '',
          phone: data.phone || '',
          college: data.college || '',
          address: data.address || '',
          tshirt_size: data.tshirt_size || 'M',
          avatar_url: data.avatar_url,
          dsa_access_date: data.dsa_access_date,
        });
      } else {
        // Create profile if doesn't exist
        setProfile({
          ...defaultProfile,
          name: user.user_metadata?.full_name || '',
          email: user.email || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Update profile in Supabase
  const updateProfile = useCallback(async (updates: Partial<DSAProfile>) => {
    if (!user?.id) {
      toast.error('Please login to update profile');
      return false;
    }

    setSaving(true);
    try {
      // Mark DSA access date if not already set
      const updateData: Record<string, unknown> = { ...updates };
      if (!profile.dsa_access_date) {
        updateData.dsa_access_date = new Date().toISOString();
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updateData,
        }, { onConflict: 'id' });

      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
        return false;
      }

      setProfile(prev => ({ ...prev, ...updates }));
      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return false;
    } finally {
      setSaving(false);
    }
  }, [user, profile.dsa_access_date]);

  // Register DSA access (creates leaderboard entry)
  const registerDSAAccess = useCallback(async () => {
    if (!user?.id) return;

    try {
      // Check if already registered
      const { data: existing } = await supabase
        .from('dsa_leaderboard')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!existing) {
        // Create leaderboard entry
        await supabase.from('dsa_leaderboard').insert({
          user_id: user.id,
          xp: 0,
          problems_solved: 0,
          current_streak: 0,
          longest_streak: 0,
        });

        // Update profile with access date
        await supabase
          .from('profiles')
          .update({ dsa_access_date: new Date().toISOString() })
          .eq('id', user.id);
      }
    } catch (error) {
      console.error('Error registering DSA access:', error);
    }
  }, [user]);

  return {
    profile,
    loading,
    saving,
    updateProfile,
    registerDSAAccess,
    refetch: fetchProfile,
  };
};
