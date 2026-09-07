import { CONFIG } from 'src/global-config';

import { UserProfile } from 'src/sections/user/profile-view'

// ----------------------------------------------------------------------

const metadata = { title: `User - Profile | ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <title>{metadata.title}</title>

            <UserProfile title="Profile" />
        </>
    );
}
