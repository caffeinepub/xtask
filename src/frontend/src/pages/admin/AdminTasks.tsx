import { useState } from 'react';
import { useGetTasks, useCreateTask } from '../../hooks/queries/useTasks';
import GlassCard from '../../components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminTasks() {
  const { data: tasks, isLoading } = useGetTasks();
  const createTask = useCreateTask();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !reward) {
      toast.error('Please fill in all fields');
      return;
    }

    const rewardAmount = parseFloat(reward);
    if (isNaN(rewardAmount) || rewardAmount <= 0) {
      toast.error('Please enter a valid reward amount');
      return;
    }

    try {
      await createTask.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        reward: BigInt(Math.floor(rewardAmount * 100)),
      });
      toast.success('Task created successfully');
      setTitle('');
      setDescription('');
      setReward('');
      setShowForm(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create task');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Task Management</h1>
          <p className="text-gray-300">Create and manage tasks</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/30"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      {showForm && (
        <GlassCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Task Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                rows={4}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reward" className="text-white">
                Reward Amount ($)
              </Label>
              <Input
                id="reward"
                type="number"
                step="0.01"
                min="0"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="0.00"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                type="submit"
                disabled={createTask.isPending}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
              >
                {createTask.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Task'
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </GlassCard>
      )}

      <div className="space-y-4">
        {tasks && tasks.length === 0 ? (
          <GlassCard className="text-center py-12">
            <p className="text-gray-400">No tasks created yet</p>
          </GlassCard>
        ) : (
          tasks?.map((task) => (
            <GlassCard key={task.id.toString()}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{task.title}</h3>
                    <p className="text-gray-300 mt-2">{task.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Reward</p>
                    <p className="text-xl font-bold text-red-500">${Number(task.reward).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
