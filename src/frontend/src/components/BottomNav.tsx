import { Home, ListTodo, Wallet, User } from 'lucide-react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/app/dashboard' },
  { icon: ListTodo, label: 'Tasks', path: '/app/tasks' },
  { icon: Wallet, label: 'Payout', path: '/app/payout' },
  { icon: User, label: 'Profile', path: '/app/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate({ to: item.path })}
                className={cn(
                  'flex flex-col items-center justify-center space-y-1 px-4 py-2 rounded-lg transition-all',
                  isActive
                    ? 'text-red-500'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                <Icon className={cn('h-6 w-6', isActive && 'drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]')} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
