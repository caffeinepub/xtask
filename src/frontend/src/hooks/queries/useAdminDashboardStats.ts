import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { AdminDashboardStats } from '../../backend';

export function useAdminDashboardStats() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<AdminDashboardStats>({
    queryKey: ['adminDashboardStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAdminDashboardStats();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
