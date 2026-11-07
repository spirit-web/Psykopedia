import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

export default function useCourseSlides(courseId, momentId) {

    const [slides, setSlides] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            setLoading(true);

            let query = supabase

                .from("original_slides")

                .select("*, lectures!inner(course_id, moment_id)")

                .eq("lectures.course_id", courseId);

            if (momentId) {

                query = query.eq("lectures.moment_id", momentId);

            }

            const { data, error } = await query.order("id");

            if (error) {

                console.error(error);

                setSlides([]);

            } else {

                setSlides(data);

            }

            setLoading(false);

        }

        if (courseId) {

            load();

        }

    }, [courseId, momentId]);

    return {

        slides,

        loading

    };

}
