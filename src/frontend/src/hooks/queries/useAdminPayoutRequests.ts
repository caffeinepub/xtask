import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { PayoutRequest, PayoutStatus } from '../../backend';

export function useAdminPayoutRequests() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PayoutRequest[]>({
    queryKey: ['adminPayoutRequests'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllPayoutRequests();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useUpdatePayoutRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      requestId,
      newStatus,
    }: {
      requestId: bigint;
      newStatus: PayoutStatus;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updatePayoutRequestStatus(requestId, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPayoutRequests'] });
      queryClient.invalidateQueries({ queryKey: ['adminDashboardStats'] });
    },
  });
}
