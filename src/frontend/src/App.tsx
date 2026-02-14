import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TaskDetails from './pages/TaskDetails';
import Payout from './pages/Payout';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Support from './pages/Support';
import SupportThread from './pages/SupportThread';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTasks from './pages/admin/AdminTasks';
import AdminPayouts from './pages/admin/AdminPayouts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSupport from './pages/admin/AdminSupport';
import AuthGate from './components/AuthGate';
import AppShell from './components/AppShell';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AccessDenied from './pages/AccessDenied';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
});

// Public About route for deployment verification (no auth required)
const publicAboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component: () => (
    <AuthGate>
      <AppShell>
        <Outlet />
      </AppShell>
    </AuthGate>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/dashboard',
  component: Dashboard,
});

const tasksRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/tasks',
  component: Tasks,
});

const taskDetailsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/tasks/$taskId',
  component: TaskDetails,
});

const payoutRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/payout',
  component: Payout,
});

const profileRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/profile',
  component: Profile,
});

const notificationsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/notifications',
  component: Notifications,
});

const supportRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/support',
  component: Support,
});

const supportThreadRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/support/$threadId',
  component: SupportThread,
});

// Authenticated About route (kept for backward compatibility)
const authenticatedAboutRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/about',
  component: About,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AuthGate>
      <AdminRoute>
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      </AdminRoute>
    </AuthGate>
  ),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/dashboard',
  component: AdminDashboard,
});

const adminTasksRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/tasks',
  component: AdminTasks,
});

const adminPayoutsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/payouts',
  component: AdminPayouts,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/users',
  component: AdminUsers,
});

const adminSupportRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/support',
  component: AdminSupport,
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/access-denied',
  component: AccessDenied,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  publicAboutRoute,
  appRoute.addChildren([
    dashboardRoute,
    tasksRoute,
    taskDetailsRoute,
    payoutRoute,
    profileRoute,
    notificationsRoute,
    supportRoute,
    supportThreadRoute,
    authenticatedAboutRoute,
  ]),
  adminRoute.addChildren([
    adminDashboardRoute,
    adminTasksRoute,
    adminPayoutsRoute,
    adminUsersRoute,
    adminSupportRoute,
  ]),
  accessDeniedRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
