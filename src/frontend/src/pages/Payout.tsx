import GlassCard from '../components/GlassCard';
import { DollarSign, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Payout() {
  const availableBalance = 0; // Backend gap: no method to get available balance
  const minimumPayout = 10;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Payout</h1>
        <p className="text-gray-300">Manage your earnings and withdrawals</p>
      </div>

      <GlassCard className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Available Balance</p>
            <p className="text-3xl font-bold text-white">${availableBalance.toFixed(2)}</p>
          </div>
        </div>
      </GlassCard>

      <Alert className="bg-yellow-500/10 border-yellow-500/30">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="text-gray-300">
          Minimum withdrawal amount is ${minimumPayout.toFixed(2)}. Complete more tasks to reach the minimum!
        </AlertDescription>
      </Alert>

      <GlassCard className="space-y-4">
        <h2 className="text-xl font-bold text-white">Payout Methods</h2>
        <p className="text-gray-400">
          Payout functionality is currently being implemented. You'll be able to add payout methods and request
          withdrawals soon.
        </p>
        <div className="space-y-2 text-sm text-gray-400">
          <p>Supported methods:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Cryptocurrency (USDT, BTC, ETH, SOL)</li>
            <li>PayPal</li>
            <li>Bank Transfer</li>
          </ul>
        </div>
      </GlassCard>

      <GlassCard className="space-y-4">
        <h2 className="text-xl font-bold text-white">Transaction History</h2>
        <p className="text-gray-400 text-center py-8">No transactions yet</p>
      </GlassCard>
    </div>
  );
}
