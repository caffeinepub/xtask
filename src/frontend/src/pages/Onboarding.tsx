import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/queries/useCallerProfile';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '../components/GlassCard';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Onboarding() {
  const [name, setName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const { identity } = useInternetIdentity();
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!identity) {
      toast.error('Not authenticated');
      return;
    }

    try {
      const principal = identity.getPrincipal();
      const profile = {
        id: principal.toString(),
        name: name.trim(),
        balance: BigInt(0),
        tasksCompleted: [],
        referralCode: principal.toString().slice(0, 8).toUpperCase(),
        referrals: [],
        referredBy: referralCode.trim() || undefined,
      };

      await saveProfile.mutateAsync(profile);
      toast.success('Welcome to Xtask!');
    } catch (error: any) {
      console.error('Profile creation error:', error);
      toast.error(error.message || 'Failed to create profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-black to-red-900 p-4">
      <GlassCard className="max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome to Xtask</h1>
            <p className="text-gray-300">Let's set up your profile</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Your Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="referralCode" className="text-white">
                Referral Code <span className="text-gray-400">(Optional)</span>
              </Label>
              <Input
                id="referralCode"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <p className="text-sm text-gray-400">
                Have a referral code? Enter it to give your friend a reward!
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={saveProfile.isPending}
            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/50"
            size="lg"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Profile...
              </>
            ) : (
              'Get Started'
            )}
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
