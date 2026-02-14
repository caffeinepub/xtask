import { useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/GlassCard';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-black to-red-900 p-4">
      <GlassCard className="max-w-md w-full text-center space-y-6">
        <ShieldAlert className="h-16 w-16 text-red-500 mx-auto" />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Access Denied</h1>
          <p className="text-gray-300">You don't have permission to access this area.</p>
        </div>
        <Button
          onClick={() => navigate({ to: '/app/dashboard' })}
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
        >
          Go to Dashboard
        </Button>
      </GlassCard>
    </div>
  );
}
