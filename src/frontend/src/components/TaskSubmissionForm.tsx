import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface TaskSubmissionFormProps {
  taskId: bigint;
}

export default function TaskSubmissionForm({ taskId }: TaskSubmissionFormProps) {
  const [proofText, setProofText] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!proofText.trim()) {
      toast.error('Please provide proof of completion');
      return;
    }

    if (proofUrl && !isValidUrl(proofUrl)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsSubmitting(true);
    
    // Backend gap: no method to submit task completion
    setTimeout(() => {
      toast.info('Task submission feature is being implemented');
      setIsSubmitting(false);
    }, 1000);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white/5 border border-white/10 rounded-lg">
      <h3 className="text-lg font-bold text-white">Submit Task Completion</h3>

      <div className="space-y-2">
        <Label htmlFor="proofText" className="text-white">
          Proof of Completion *
        </Label>
        <Textarea
          id="proofText"
          value={proofText}
          onChange={(e) => setProofText(e.target.value)}
          placeholder="Describe how you completed the task..."
          rows={4}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="proofUrl" className="text-white">
          Proof URL <span className="text-gray-400">(Optional)</span>
        </Label>
        <Input
          id="proofUrl"
          type="url"
          value={proofUrl}
          onChange={(e) => setProofUrl(e.target.value)}
          placeholder="https://example.com/proof"
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/30"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Task'
        )}
      </Button>
    </form>
  );
}
