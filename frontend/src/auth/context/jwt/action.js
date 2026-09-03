import axios, { endpoints } from 'src/lib/axios';

import { setSession } from './utils';
import { JWT_ACCESS_STORAGE_KEY, JWT_REFRESH_STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }) => {
    try {
        const params = { email, password };

        const res = await axios.post(endpoints.auth.signIn, params);

        const { accessToken, refreshToken } = res.data;

        if (!accessToken) {
            throw new Error('Access token not found in response');
        }

        if (!refreshToken) {
            throw new Error('Refresh token not found in response');
        }

        if (refreshToken) {
            sessionStorage.setItem(JWT_REFRESH_STORAGE_KEY, refreshToken);
        }

        setSession(accessToken);
    } catch (error) {
        console.error('Error during sign in:', error);
        throw error;
    }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ email, password, firstName, lastName }) => {
    try {
        const params = {
            email,
            password,
            firstName,
            lastName,
        };

        const res = await axios.post(endpoints.auth.signUp, params);

        const { accessToken } = res.data;

        if (!accessToken) {
            throw new Error('Access token not found in response');
        }

        sessionStorage.setItem(JWT_ACCESS_STORAGE_KEY, accessToken);
    } catch (error) {
        console.error('Error during sign up:', error);
        throw error;
    }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
    try {
        const refreshToken = sessionStorage.getItem(JWT_REFRESH_STORAGE_KEY);

        if (refreshToken) {
            await axios.post(endpoints.auth.logout, { refresh: refreshToken });
        }
    } catch (error) {
        console.error('Error during sign out:', error);
    } finally {
        sessionStorage.removeItem(JWT_REFRESH_STORAGE_KEY);
        await setSession(null);
    }
};
