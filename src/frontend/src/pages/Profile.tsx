import { useGetCallerUserProfile } from '../hooks/queries/useCallerProfile';
import { useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import LoginButton from '../components/LoginButton';
import { User, Settings, Info } from 'lucide-react';

export default function Profile() {
  const { data: profile, isLoading } = useGetCallerUserProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="text-gray-300">Manage your account settings</p>
      </div>

      <GlassCard className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
            <User className="h-10 w-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{profile?.name}</h2>
            <p className="text-gray-400 text-sm">Member since {new Date().getFullYear()}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-400">Referral Code</p>
          <code className="text-lg font-mono text-white">{profile?.referralCode}</code>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-400">Total Referrals</p>
          <p className="text-2xl font-bold text-white">{profile?.referrals.length || 0}</p>
        </div>
      </GlassCard>

      <GlassCard className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Account Settings
        </h2>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-white border-white/20 hover:bg-white/10"
            onClick={() => navigate({ to: '/app/about' })}
          >
            <Info className="mr-2 h-4 w-4" />
            About Xtask
          </Button>
          <LoginButton />
        </div>
      </GlassCard>
    </div>
  );
}
