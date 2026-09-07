import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function UserProfile() {
    const { user } = useAuthContext();

    const getInitials = () => {
        if (user?.first_name && user?.last_name) {
            return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
        }
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    return (
        <DashboardContent maxWidth="md">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4">Profile</Typography>
            </Box>

            <Card
                sx={{
                    p: 4,
                    mb: 3,
                    background: (theme) =>
                        `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                }}
            >
                <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            background: (theme) =>
                                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            color: 'white',
                        }}
                    >
                        {getInitials()}
                    </Avatar>

                    <Stack spacing={1} sx={{ flex: 1 }}>
                        <Typography variant="h5">{user?.username}</Typography>
                        {user?.email && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {user?.email}
                            </Typography>
                        )}
                        {user?.role && (
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    width: 'fit-content',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 1,
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                                    color: (theme) => theme.palette.primary.main,
                                    typography: 'caption',
                                    fontWeight: 600,
                                    textTransform: 'capitalize',
                                }}
                            >
                                {user.role}
                            </Box>
                        )}
                    </Stack>
                </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
                    Personal Information
                </Typography>

                <Stack spacing={3}>
                    {(user?.first_name || user?.last_name) && (
                        <Stack direction="row" spacing={4}>
                            {user?.first_name && (
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                        FIRST NAME
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                                        {user.first_name}
                                    </Typography>
                                </Box>
                            )}

                            {user?.last_name && (
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                        LAST NAME
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                                        {user.last_name}
                                    </Typography>
                                </Box>
                            )}
                        </Stack>
                    )}
                    <Divider />
                    {user?.username && (
                        <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                USERNAME
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {user.username}
                            </Typography>
                        </Box>
                    )}
                    <Divider />
                    {user?.email && (
                        <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                EMAIL
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {user.email}
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Card>
        </DashboardContent>
    );
}
