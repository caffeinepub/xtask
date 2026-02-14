import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, DollarSign, CheckCircle, Users } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import TextLogo from '../components/TextLogo';

export default function Landing() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();

  useEffect(() => {
    if (identity) {
      navigate({ to: '/app/dashboard' });
    }
  }, [identity, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/generated/xtask-hero-bg.dim_1600x900.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TextLogo />
          </div>
          <Button
            onClick={() => navigate({ to: '/app/dashboard' })}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/50"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </header>

        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Earn Money by
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
              Completing Tasks
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of users earning real money by completing simple tasks. Get paid fast and securely.
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/app/dashboard' })}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-lg px-8 py-6 shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 transition-all"
          >
            Start Earning Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="text-center space-y-4 hover:scale-105 transition-transform">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Earn Money</h3>
              <p className="text-gray-300">Complete tasks and get paid instantly. Withdraw anytime.</p>
            </GlassCard>

            <GlassCard className="text-center space-y-4 hover:scale-105 transition-transform">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Simple Tasks</h3>
              <p className="text-gray-300">Easy tasks that anyone can complete. No special skills required.</p>
            </GlassCard>

            <GlassCard className="text-center space-y-4 hover:scale-105 transition-transform">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Refer & Earn</h3>
              <p className="text-gray-300">Invite friends and earn $5 for each referral who completes a task.</p>
            </GlassCard>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-8 text-center text-gray-400 border-t border-white/10">
          <p>
            © {new Date().getFullYear()} Xtask. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
