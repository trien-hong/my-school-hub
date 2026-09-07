import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { usePathname } from '../hooks';

// ----------------------------------------------------------------------

const DashboardPage = lazy(() => import('src/pages/menus/dashboard'));
const ProfilePage = lazy(() => import('src/pages/menus/user/profile'));

// ----------------------------------------------------------------------

function SuspenseOutlet() {
    const pathname = usePathname();
    return (
        <Suspense key={pathname} fallback={<LoadingScreen />}>
            <Outlet />
        </Suspense>
    );
}

const menuLayout = () => (
    <DashboardLayout>
        <SuspenseOutlet />
    </DashboardLayout>
);

export const menuRoutes = [
    {
        path: '/dashboard',
        element: CONFIG.auth.skip ? menuLayout() : <AuthGuard>{menuLayout()}</AuthGuard>,
        children: [
            { element: <DashboardPage />, index: true },
        ],
    },
    {
        path: '/profile',
        element: CONFIG.auth.skip ? menuLayout() : <AuthGuard>{menuLayout()}</AuthGuard>,
        children: [
            { element: <ProfilePage />, index: true },
        ],
    },
];
