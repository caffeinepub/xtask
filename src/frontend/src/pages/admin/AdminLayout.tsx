import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ListTodo, Wallet, Users, MessageCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: ListTodo, label: 'Tasks', path: '/admin/tasks' },
  { icon: Wallet, label: 'Payouts', path: '/admin/payouts' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: MessageCircle, label: 'Support', path: '/admin/support' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-900">
      <header className="backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/app/dashboard' })}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 min-h-[calc(100vh-4rem)] backdrop-blur-xl bg-black/20 border-r border-white/10 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={cn(
                    'w-full justify-start',
                    isActive
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  )}
                  onClick={() => navigate({ to: item.path })}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
