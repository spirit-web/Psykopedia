import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

export default function useMoments(courseId) {

    const [moments, setMoments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            setLoading(true);

            const { data, error } = await supabase

                .from("moments")

                .select("*, moment_teachers(teachers(id, name, image_url))")

                .eq("course_id", courseId)

                .order("order_index");

            if (error) {

                console.error(error);

                setMoments([]);

            } else {

                setMoments(data.map(moment => ({

                    ...moment,

                    teachers: moment.moment_teachers.map(mt => mt.teachers)

                })));

            }

            setLoading(false);

        }

        if (courseId) {

            load();

        } else {

            setLoading(false);

        }

    }, [courseId]);

    return { moments, loading };

}
