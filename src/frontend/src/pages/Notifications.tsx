import GlassCard from '../components/GlassCard';
import { Bell } from 'lucide-react';

export default function Notifications() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Notifications</h1>
        <p className="text-gray-300">Stay updated with your activity</p>
      </div>

      <GlassCard className="text-center py-12 space-y-4">
        <Bell className="h-12 w-12 text-gray-400 mx-auto" />
        <p className="text-gray-400">No notifications yet</p>
        <p className="text-sm text-gray-500">
          You'll receive notifications for new tasks, approved payouts, and referral rewards.
        </p>
      </GlassCard>
    </div>
  );
}
