import GlassCard from '../../components/GlassCard';

export default function AdminSupport() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Support Management</h1>
        <p className="text-gray-300">View and respond to user inquiries</p>
      </div>

      <GlassCard className="text-center py-12">
        <p className="text-gray-400">No support tickets yet</p>
      </GlassCard>
    </div>
  );
}
