import { paths } from 'src/routes/paths'

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const _account = [
    // overview
    {
        label: 'Dashboard',
        href: '/',
        icon: <Iconify icon="solar:home-angle-bold-duotone" />
    },
    // management
    {
        label: 'Profile',
        href: paths.menu.user.profile,
        icon: <Iconify icon="custom:profile-duotone" />,
    },
    {
        label: 'Account settings',
        href: '#',
        icon: <Iconify icon="solar:settings-bold-duotone" />
    },
];
