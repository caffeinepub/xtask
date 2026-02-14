import { useGetCallerUserProfile } from '../hooks/queries/useCallerProfile';
import GlassCard from '../components/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, CheckCircle, Clock, Users, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Dashboard() {
  const { data: profile, isLoading } = useGetCallerUserProfile();

  const copyReferralCode = () => {
    if (profile?.referralCode) {
      navigator.clipboard.writeText(profile.referralCode);
      toast.success('Referral code copied!');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  const taskEarnings = 0; // Backend gap: no method to get task earnings
  const referralEarnings = 0; // Backend gap: no method to get referral earnings
  const completedTasks = profile?.tasksCompleted.length || 0;
  const activeTasks = 0; // Backend gap: no method to get active tasks

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Welcome back, {profile?.name}!</h1>
        <p className="text-gray-300">Here's your earnings overview</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Task Earnings</p>
                <p className="text-2xl font-bold text-white">${taskEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Referral Earnings</p>
                <p className="text-2xl font-bold text-white">${referralEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed Tasks</p>
              <p className="text-2xl font-bold text-white">{completedTasks}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Tasks</p>
              <p className="text-2xl font-bold text-white">{activeTasks}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="space-y-4">
        <h2 className="text-xl font-bold text-white">Your Referral Code</h2>
        <p className="text-gray-300">Share your code and earn $5 for each friend who completes their first task!</p>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3">
            <code className="text-lg font-mono text-white">{profile?.referralCode}</code>
          </div>
          <Button
            onClick={copyReferralCode}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/30"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
