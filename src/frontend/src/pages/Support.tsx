import GlassCard from '../components/GlassCard';
import { MessageCircle } from 'lucide-react';

export default function Support() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Support</h1>
        <p className="text-gray-300">Get help with your account</p>
      </div>

      <GlassCard className="text-center py-12 space-y-4">
        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto" />
        <p className="text-gray-400">Support system coming soon</p>
        <p className="text-sm text-gray-500">
          You'll be able to create support tickets and get help from our team.
        </p>
      </GlassCard>
    </div>
  );
}
