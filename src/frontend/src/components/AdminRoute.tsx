import { useGetAdminStatus } from '../hooks/queries/useAdminStatus';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { data: isAdmin, isLoading, isError } = useGetAdminStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (isError || !isAdmin)) {
      navigate({ to: '/access-denied' });
    }
  }, [isAdmin, isLoading, isError, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-black to-red-900">
        <Loader2 className="h-12 w-12 animate-spin text-red-500" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
