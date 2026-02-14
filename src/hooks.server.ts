
import { createServerClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    event.cookies.set(name, value, { ...options, path: '/' });
                });
            },
        },
    });

    /**
     * Unlike `supabase.auth.getSession()`, which is unsafe on the server because it
     * doesn't validate the token, this safe `getUser()` does.
     */
    event.locals.safeGetSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession();
        if (!session) {
            return { session: null, user: null };
        }

        const {
            data: { user },
            error,
        } = await event.locals.supabase.auth.getUser();
        if (error) {
            // huge security risk if we don't return null here
            return { session: null, user: null };
        }

        return { session, user };
    };

    // Backward compatibility for code getting session directly
    event.locals.getSession = async () => {
        const { session } = await event.locals.safeGetSession();
        return session;
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version';
        },
    });
};
