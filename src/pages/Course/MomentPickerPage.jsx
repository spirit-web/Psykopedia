import { useNavigate, useParams } from "react-router-dom";

import "./CoursePage.css";
import "../../components/CourseSections/CourseSections.css";
import "../../components/CourseHeader/CourseHeader.css";

import BackButton from "../../components/BackButton/BackButton";

import useCourse from "../../hooks/useCourse";
import useMoments from "../../hooks/useMoments";

function MomentPickerPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { course, loading: courseLoading } = useCourse(id);

    const { moments, loading: momentsLoading } = useMoments(id);

    if (courseLoading || momentsLoading) {

        return <h2>Laddar kurs...</h2>;

    }

    if (!course) {

        return <h2>Kursen hittades inte.</h2>;

    }

    return (

        <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

            <BackButton />

            <div className="course-page">

                <h1>{course.name}</h1>

                <p>{course.credits} poäng</p>

                <p style={{ color: "#666" }}>Välj vilket moment du vill öppna.</p>

                <div className="section-grid">

                    {

                        moments.map(moment => (

                            <div

                                key={moment.id}

                                className="section-card"

                                style={{ cursor: "pointer" }}

                                onClick={() => navigate(`/course/${course.id}/moment/${moment.id}`)}

                            >

                                <h3>{moment.name}</h3>

                                {moment.subtitle && <p style={{ color: "#888", margin: "4px 0 10px" }}>{moment.subtitle}</p>}

                                {

                                    moment.teachers.length > 0 &&

                                    <div className="course-teachers" style={{ justifyContent: "center" }}>

                                        {

                                            moment.teachers.map(teacher => (

                                                <div key={teacher.id} className="course-teacher-chip">

                                                    {teacher.image_url && <img src={teacher.image_url} alt={teacher.name} />}

                                                    <span>{teacher.name}</span>

                                                </div>

                                            ))

                                        }

                                    </div>

                                }

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default MomentPickerPage;
