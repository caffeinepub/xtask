import GlassCard from '../../components/GlassCard';
import { useAdminPayoutRequests, useUpdatePayoutRequestStatus } from '../../hooks/queries/useAdminPayoutRequests';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { PayoutStatus } from '../../backend';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function AdminPayouts() {
  const { data: payoutRequests, isLoading, isError, error } = useAdminPayoutRequests();
  const updateStatus = useUpdatePayoutRequestStatus();

  const handleApprove = async (requestId: bigint) => {
    try {
      await updateStatus.mutateAsync({
        requestId,
        newStatus: PayoutStatus.approved,
      });
      toast.success('Payout request approved successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to approve payout request';
      toast.error(errorMessage);
    }
  };

  const handleDecline = async (requestId: bigint) => {
    try {
      await updateStatus.mutateAsync({
        requestId,
        newStatus: PayoutStatus.declined,
      });
      toast.success('Payout request declined');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to decline payout request';
      toast.error(errorMessage);
    }
  };

  const getStatusBadge = (status: PayoutStatus) => {
    switch (status) {
      case PayoutStatus.pending:
        return (
          <Badge variant="outline" className="bg-yellow-600/20 text-yellow-400 border-yellow-600/50">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case PayoutStatus.approved:
        return (
          <Badge variant="outline" className="bg-green-600/20 text-green-400 border-green-600/50">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case PayoutStatus.declined:
        return (
          <Badge variant="outline" className="bg-red-600/20 text-red-400 border-red-600/50">
            <XCircle className="h-3 w-3 mr-1" />
            Declined
          </Badge>
        );
    }
  };

  const getPayoutMethodSummary = (request: any) => {
    const methodType = request.method.methodType;
    const details = request.method.details;
    return `${methodType} - ${details.substring(0, 20)}${details.length > 20 ? '...' : ''}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Payout Management</h1>
          <p className="text-gray-300">Review and approve withdrawal requests</p>
        </div>

        <GlassCard className="p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-10 w-24" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    );
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load payout requests';
    const isAuthError = errorMessage.includes('Unauthorized') || errorMessage.includes('admin');

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Payout Management</h1>
          <p className="text-gray-300">Review and approve withdrawal requests</p>
        </div>

        <GlassCard className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                {isAuthError ? 'Access Denied' : 'Error Loading Payout Requests'}
              </h3>
              <p className="text-gray-400 max-w-md">
                {isAuthError
                  ? 'You do not have permission to manage payout requests. Only administrators can access this page.'
                  : errorMessage}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (!payoutRequests || payoutRequests.length === 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Payout Management</h1>
          <p className="text-gray-300">Review and approve withdrawal requests</p>
        </div>

        <GlassCard className="text-center py-12">
          <p className="text-gray-400">No payout requests yet</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Payout Management</h1>
        <p className="text-gray-300">Review and approve withdrawal requests</p>
      </div>

      <GlassCard className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-transparent">
              <TableHead className="text-gray-300">User</TableHead>
              <TableHead className="text-gray-300">Amount</TableHead>
              <TableHead className="text-gray-300">Method</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payoutRequests.map((request) => (
              <TableRow key={request.id.toString()} className="border-gray-700 hover:bg-white/5">
                <TableCell className="font-mono text-sm text-gray-300">
                  {request.userId.toString().substring(0, 12)}...
                </TableCell>
                <TableCell className="text-white font-semibold">
                  ${Number(request.amount).toFixed(2)}
                </TableCell>
                <TableCell className="text-gray-300">
                  {getPayoutMethodSummary(request)}
                </TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  {request.status === PayoutStatus.pending && (
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-600/20 text-green-400 border-green-600/50 hover:bg-green-600/30"
                        onClick={() => handleApprove(request.id)}
                        disabled={updateStatus.isPending}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-600/20 text-red-400 border-red-600/50 hover:bg-red-600/30"
                        onClick={() => handleDecline(request.id)}
                        disabled={updateStatus.isPending}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  );
}
