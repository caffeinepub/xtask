import GlassCard from '../../components/GlassCard';

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <p className="text-gray-300">View and manage platform users</p>
      </div>

      <GlassCard className="text-center py-12">
        <p className="text-gray-400">User management features coming soon</p>
      </GlassCard>
    </div>
  );
}
