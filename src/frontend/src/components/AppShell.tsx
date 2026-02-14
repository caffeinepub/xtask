import TopHeader from './TopHeader';
import BottomNav from './BottomNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-900 flex flex-col">
      <TopHeader />
      <main className="flex-1 pb-20 pt-16">{children}</main>
      <BottomNav />
    </div>
  );
}
