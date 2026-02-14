import { useGetTasks } from '../hooks/queries/useTasks';
import { useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, ArrowRight } from 'lucide-react';

export default function Tasks() {
  const { data: tasks, isLoading } = useGetTasks();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Available Tasks</h1>
        <p className="text-gray-300">Complete tasks to earn money</p>
      </div>

      {tasks && tasks.length === 0 ? (
        <GlassCard className="text-center py-12">
          <p className="text-gray-400">No tasks available at the moment. Check back soon!</p>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {tasks?.map((task) => (
            <GlassCard key={task.id.toString()} className="hover:bg-white/10 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-white">{task.title}</h3>
                    <Badge
                      variant={
                        task.status === 'available'
                          ? 'default'
                          : task.status === 'completed'
                          ? 'secondary'
                          : 'outline'
                      }
                      className={
                        task.status === 'available'
                          ? 'bg-green-600'
                          : task.status === 'completed'
                          ? 'bg-blue-600'
                          : 'bg-yellow-600'
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-gray-300 line-clamp-2">{task.description}</p>
                  <div className="flex items-center space-x-2 text-red-500">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-lg font-bold">${Number(task.reward).toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  onClick={() => navigate({ to: '/app/tasks/$taskId', params: { taskId: task.id.toString() } })}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/30"
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
