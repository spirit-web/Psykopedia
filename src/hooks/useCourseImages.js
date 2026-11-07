import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

export default function useCourseImages(courseId, momentId) {

    const [images, setImages] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            setLoading(true);

            let query = supabase

                .from("images")

                .select("*, lectures!inner(course_id, moment_id)")

                .eq("lectures.course_id", courseId);

            if (momentId) {

                query = query.eq("lectures.moment_id", momentId);

            }

            const { data, error } = await query.order("id");

            if (error) {

                console.error(error);

                setImages([]);

            } else {

                setImages(data);

            }

            setLoading(false);

        }

        if (courseId) {

            load();

        }

    }, [courseId, momentId]);

    function removeImage(imageId) {

        setImages(current => current.filter(image => image.id !== imageId));

    }

    return {

        images,

        loading,

        removeImage

    };

}
