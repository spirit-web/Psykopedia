import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

export default function useAuth() {

    const [session, setSession] = useState(undefined);

    const [isAdmin, setIsAdmin] = useState(false);

    const [profileLoading, setProfileLoading] = useState(false);

    useEffect(() => {

        supabase.auth.getSession().then(({ data }) => setSession(data.session));

        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {

            setSession(newSession);

        });

        return () => listener.subscription.unsubscribe();

    }, []);

    useEffect(() => {

        if (!session?.user) {

            setIsAdmin(false);

            return;

        }

        let cancelled = false;

        setProfileLoading(true);

        supabase

            .from("profiles")

            .select("is_admin")

            .eq("id", session.user.id)

            .single()

            .then(({ data }) => {

                if (!cancelled) {

                    setIsAdmin(!!data?.is_admin);

                    setProfileLoading(false);

                }

            });

        return () => { cancelled = true; };

    }, [session?.user?.id]);

    return {

        session,
        user: session?.user ?? null,
        isAdmin,
        loading: session === undefined || profileLoading,

        signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
        signUp: (email, password) => supabase.auth.signUp({ email, password }),
        signOut: () => supabase.auth.signOut()

    };

}
