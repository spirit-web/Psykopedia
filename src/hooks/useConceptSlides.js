import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

// Groups concept_slides rows by image_id, with star ("stjarna") slides first.
export default function useConceptSlides(imageIds) {

    const [slidesByImage, setSlidesByImage] = useState({});

    useEffect(() => {

        async function load() {

            if (imageIds.length === 0) {

                setSlidesByImage({});

                return;

            }

            const { data, error } = await supabase

                .from("concept_slides")

                .select("image_id, niva, original_slides(id, image_url, page_number, lectures(lecture_number))")

                .in("image_id", imageIds);

            if (error) {

                console.error(error);

                return;

            }

            const grouped = {};

            for (const row of data) {

                if (!grouped[row.image_id]) grouped[row.image_id] = [];

                grouped[row.image_id].push({
                    niva: row.niva,
                    slideId: row.original_slides?.id,
                    imageUrl: row.original_slides?.image_url,
                    kalla: `F${row.original_slides?.lectures?.lecture_number} s. ${row.original_slides?.page_number}`
                });

            }

            for (const id of Object.keys(grouped)) {

                grouped[id].sort((a, b) => (a.niva === "stjarna" ? -1 : 1) - (b.niva === "stjarna" ? -1 : 1));

            }

            setSlidesByImage(grouped);

        }

        load();

    }, [JSON.stringify(imageIds)]);

    return slidesByImage;

}
