import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";
import useAuth from "./useAuth";

const STORAGE_KEY = "psykopedia_favorites";

function readStoredIds() {

    try {

        const raw = localStorage.getItem(STORAGE_KEY);

        return raw ? JSON.parse(raw) : [];

    } catch {

        return [];

    }

}

export default function useFavorites() {

    const { user } = useAuth();

    const [favoriteIds, setFavoriteIds] = useState(readStoredIds);

    // Anonym besökare: spara bara i webbläsaren, som tidigare.
    useEffect(() => {

        if (user) return;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));

    }, [favoriteIds, user]);

    // Inloggad: hämta favoriterna från kontot istället för webbläsaren.
    useEffect(() => {

        if (!user) return;

        let cancelled = false;

        supabase

            .from("favorites")

            .select("image_id")

            .eq("user_id", user.id)

            .then(({ data }) => {

                if (!cancelled && data) {

                    setFavoriteIds(data.map(row => row.image_id));

                }

            });

        return () => { cancelled = true; };

    }, [user]);

    function isFavorite(imageId) {

        return favoriteIds.includes(imageId);

    }

    async function toggleFavorite(imageId) {

        const alreadyFavorite = favoriteIds.includes(imageId);

        setFavoriteIds(current =>

            alreadyFavorite
                ? current.filter(id => id !== imageId)
                : [...current, imageId]

        );

        if (!user) return;

        if (alreadyFavorite) {

            await supabase.from("favorites").delete().eq("user_id", user.id).eq("image_id", imageId);

        } else {

            await supabase.from("favorites").insert({ user_id: user.id, image_id: imageId });

        }

    }

    return {

        favoriteIds,
        isFavorite,
        toggleFavorite

    };

}
