import GlassCard from '../../components/GlassCard';
import { Users, DollarSign, ListTodo, Clock, AlertCircle } from 'lucide-react';
import { useAdminDashboardStats } from '../../hooks/queries/useAdminDashboardStats';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboard() {
  const { data: stats, isLoading, isError, error } = useAdminDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-300">Platform overview and statistics</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <GlassCard key={i} className="space-y-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load dashboard statistics';
    const isAuthError = errorMessage.includes('Unauthorized') || errorMessage.includes('admin');

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-300">Platform overview and statistics</p>
        </div>

        <GlassCard className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                {isAuthError ? 'Access Denied' : 'Error Loading Statistics'}
              </h3>
              <p className="text-gray-400 max-w-md">
                {isAuthError
                  ? 'You do not have permission to view admin statistics. Only administrators can access this page.'
                  : errorMessage}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  const totalUsers = Number(stats?.totalUsers ?? 0);
  const totalEarnings = Number(stats?.totalEarnings ?? 0);
  const activeTasks = Number(stats?.activeTasks ?? 0);
  const pendingPayouts = Number(stats?.pendingPayouts ?? 0);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-300">Platform overview and statistics</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{totalUsers}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Earnings</p>
              <p className="text-2xl font-bold text-white">${totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
              <ListTodo className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Tasks</p>
              <p className="text-2xl font-bold text-white">{activeTasks}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending Payouts</p>
              <p className="text-2xl font-bold text-white">{pendingPayouts}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
