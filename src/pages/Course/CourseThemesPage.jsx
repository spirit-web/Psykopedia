import { useState } from "react";

import { useParams } from "react-router-dom";

import "./CoursePage.css";

import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";
import CourseHeader from "../../components/CourseHeader/CourseHeader";
import CourseSections from "../../components/CourseSections/CourseSections";

import useCourse from "../../hooks/useCourse";
import useCourseImages from "../../hooks/useCourseImages";
import useConceptSlides from "../../hooks/useConceptSlides";

function CourseThemesPage() {

    const { id, momentId } = useParams();

    const { course, loading: courseLoading } = useCourse(id);

    const { images, loading } = useCourseImages(id, momentId);

    const [lightboxId, setLightboxId] = useState(null);

    const [expandedIds, setExpandedIds] = useState(() => new Set());

    const sorted = [...images].sort((a, b) =>
        (a.title || "").localeCompare(b.title || "", "sv")
    );

    const slidesByImage = useConceptSlides(sorted.map(image => image.id));

    function toggleExpanded(imageId) {

        setExpandedIds(current => {

            const next = new Set(current);

            if (next.has(imageId)) {
                next.delete(imageId);
            } else {
                next.add(imageId);
            }

            return next;

        });

    }

    if (courseLoading) {

        return <h2>Laddar kurs...</h2>;

    }

    if (!course) {

        return <h2>Kursen hittades inte.</h2>;

    }

    return (

        <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

            <BackButton />

            <div className="course-page">

                <CourseHeader course={course} />

                <CourseSections courseId={course.id} momentId={momentId} />

            </div>

            <div style={{ maxWidth: "800px", margin: "0 auto" }}>

                <h1 style={{ fontSize: 32, lineHeight: 1.3, margin: "0 0 8px" }}>🧠 Begrepp — {course?.name}</h1>

                <p>Alla koncept som finns representerade i kursens bilder.</p>

                {
                    loading &&
                    <p>Laddar...</p>
                }

                {
                    !loading && sorted.length === 0 &&
                    <p>Inga bilder i den här kursen än.</p>
                }

                <ol style={{ listStyle: "none", padding: 0, marginTop: 25, counterReset: "concept" }}>

                    {

                        sorted.map((image, index) => {

                            const slides = slidesByImage[image.id] || [];

                            const starSlides = slides.filter(s => s.niva === "stjarna");

                            const supportSlides = slides.filter(s => s.niva !== "stjarna");

                            const expanded = expandedIds.has(image.id);

                            return (

                                <li

                                    key={image.id}

                                    style={{

                                        display: "flex",

                                        alignItems: "flex-start",

                                        gap: 14,

                                        padding: "12px 0",

                                        borderBottom: "1px solid #eee"

                                    }}

                                >

                                    <span style={{ width: 24, textAlign: "right", color: "#999", flexShrink: 0, paddingTop: 2 }}>

                                        {index + 1}.

                                    </span>

                                    {

                                        image.image_url &&

                                        <img

                                            src={image.image_url}

                                            alt={image.title}

                                            onClick={() => setLightboxId(image.id)}

                                            style={{

                                                width: 48,

                                                height: 48,

                                                objectFit: "cover",

                                                borderRadius: 6,

                                                cursor: "pointer",

                                                flexShrink: 0,

                                                background: "#eef1f6"

                                            }}

                                        />

                                    }

                                    <div style={{ flex: 1, minWidth: 0 }}>

                                        <strong>{image.title}</strong>

                                        {
                                            image.description &&
                                            <p style={{ margin: "2px 0 0", color: "#888", fontSize: 14 }}>{image.description}</p>
                                        }

                                        {

                                            slides.length > 0 &&

                                            <div style={{ marginTop: 6, fontSize: 12, color: "#aaa" }}>

                                                {starSlides.map(s => s.kalla).join(", ")}

                                                {

                                                    supportSlides.length > 0 &&

                                                    <>

                                                        {starSlides.length > 0 && " · "}

                                                        <button

                                                            onClick={() => toggleExpanded(image.id)}

                                                            style={{ background: "none", border: "none", color: "#2D7FF9", cursor: "pointer", fontSize: 12, padding: 0 }}

                                                        >

                                                            {expanded ? "Dölj fler slides" : `Fler slides (${supportSlides.length})`}

                                                        </button>

                                                    </>

                                                }

                                                {

                                                    expanded &&

                                                    <div style={{ marginTop: 4 }}>

                                                        {supportSlides.map(s => s.kalla).join(", ")}

                                                    </div>

                                                }

                                            </div>

                                        }

                                    </div>

                                </li>

                            );

                        })

                    }

                </ol>

            </div>

            {

                lightboxId &&

                <ImageViewer

                    images={sorted}

                    hideGrid

                    startId={lightboxId}

                    onCloseLightbox={() => setLightboxId(null)}

                />

            }

        </div>

    );

}

export default CourseThemesPage;
