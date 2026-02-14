import { useParams } from '@tanstack/react-router';
import { useGetTasks } from '../hooks/queries/useTasks';
import GlassCard from '../components/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';
import TaskSubmissionForm from '../components/TaskSubmissionForm';

export default function TaskDetails() {
  const { taskId } = useParams({ from: '/app/tasks/$taskId' });
  const { data: tasks, isLoading } = useGetTasks();

  const task = tasks?.find((t) => t.id.toString() === taskId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mx-auto px-4 py-8">
        <GlassCard className="text-center py-12">
          <p className="text-gray-400">Task not found</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <GlassCard className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">{task.title}</h1>
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

          <div className="flex items-center space-x-2 text-red-500">
            <DollarSign className="h-6 w-6" />
            <span className="text-2xl font-bold">${Number(task.reward).toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Description</h2>
            <p className="text-gray-300 whitespace-pre-wrap">{task.description}</p>
          </div>
        </div>

        {task.status === 'available' && <TaskSubmissionForm taskId={task.id} />}

        {task.status === 'pendingReview' && task.submission && (
          <div className="space-y-2 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-500">Submission Under Review</h3>
            <p className="text-gray-300">Your submission is being reviewed by our team.</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-400">Your submission:</p>
              <p className="text-white">{task.submission.text}</p>
              {task.submission.url && (
                <a
                  href={task.submission.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 text-sm"
                >
                  {task.submission.url}
                </a>
              )}
            </div>
          </div>
        )}

        {task.status === 'completed' && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h3 className="text-lg font-bold text-green-500">Task Completed!</h3>
            <p className="text-gray-300">You've earned ${Number(task.reward).toFixed(2)} for this task.</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
