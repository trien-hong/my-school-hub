import { paths } from 'src/routes/paths';

import axios, { endpoints } from 'src/lib/axios';

import { JWT_ACCESS_STORAGE_KEY, JWT_REFRESH_STORAGE_KEY } from './constant';

// Tracks the pending expiration timer so repeated setSession calls don't stack up duplicate alerts/redirects.
let expirationTimeoutId;

// ----------------------------------------------------------------------

export function jwtDecode(token) {
    try {
        if (!token) return null;

        const parts = token.split('.');
        if (parts.length < 2) {
            throw new Error('Invalid token!');
        }

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));

        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        throw error;
    }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken) {
    if (!accessToken) {
        return false;
    }

    try {
        const decoded = jwtDecode(accessToken);

        if (!decoded || !('exp' in decoded)) {
            return false;
        }

        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;
    } catch (error) {
        console.error('Error during token validation:', error);
        return false;
    }
}

// ----------------------------------------------------------------------

export function tokenExpired(exp) {
    const currentTime = Date.now();
    const timeLeft = exp * 1000 - currentTime;

    if (expirationTimeoutId) {
        clearTimeout(expirationTimeoutId);
    }

    expirationTimeoutId = setTimeout(async () => {
        try {
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                await setSession(newAccessToken);
                return;
            }

            sessionStorage.removeItem(JWT_ACCESS_STORAGE_KEY);
            sessionStorage.removeItem(JWT_REFRESH_STORAGE_KEY);
            window.location.href = paths.auth.jwt.signIn;
        } catch (error) {
            console.error('Error during token expiration:', error);
        }
    }, timeLeft);
}

// ----------------------------------------------------------------------

export async function refreshAccessToken() {
    try {
        const refreshToken = sessionStorage.getItem(JWT_REFRESH_STORAGE_KEY);

        if (!refreshToken) {
            return null;
        }

        const res = await axios.post(endpoints.auth.refresh, { refresh: refreshToken });

        return res.data?.access ?? null;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}

// ----------------------------------------------------------------------

export async function setSession(accessToken) {
    try {
        if (accessToken) {
            sessionStorage.setItem(JWT_ACCESS_STORAGE_KEY, accessToken);

            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

            const decodedToken = jwtDecode(accessToken);

            if (decodedToken && 'exp' in decodedToken) {
                tokenExpired(decodedToken.exp);
            } else {
                throw new Error('Invalid access token!');
            }
        } else {
            if (expirationTimeoutId) {
                clearTimeout(expirationTimeoutId);
                expirationTimeoutId = undefined;
            }

            sessionStorage.removeItem(JWT_ACCESS_STORAGE_KEY);
            delete axios.defaults.headers.common.Authorization;
        }
    } catch (error) {
        console.error('Error during set session:', error);
        throw error;
    }
}
