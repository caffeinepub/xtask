import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Copy, Eye, EyeOff, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function PrincipalReveal() {
  const { identity } = useInternetIdentity();
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const principalId = identity?.getPrincipal().toText();

  const handleCopy = async () => {
    if (!principalId) return;
    
    try {
      await navigator.clipboard.writeText(principalId);
      setCopied(true);
      toast.success('Principal ID copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  if (!identity) {
    return (
      <div className="p-4 border border-white/10 rounded-lg bg-white/5">
        <p className="text-sm text-gray-400">
          You must be signed in to view your Principal ID.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">Principal ID</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsRevealed(!isRevealed)}
          className="text-white hover:bg-white/10"
        >
          {isRevealed ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Hide
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Show my Principal
            </>
          )}
        </Button>
      </div>

      {isRevealed && principalId && (
        <div className="p-4 border border-white/10 rounded-lg bg-white/5 space-y-3">
          <code className="text-xs font-mono text-white break-all block">
            {principalId}
          </code>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="w-full text-white border-white/20 hover:bg-white/10"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
