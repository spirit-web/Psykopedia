import { useNavigate } from "react-router-dom";

import "./CourseSections.css";

function CourseSections({ courseId, momentId }) {

    const navigate = useNavigate();

    const base = momentId ? `/course/${courseId}/moment/${momentId}` : `/course/${courseId}`;

    const sections = [

        {
            icon:"🧠",
            title:"Begrepp",
            text:"Psykologiska koncept",
            onClick: () => navigate(momentId ? base : `${base}/begrepp`)
        },

        {
            icon:"🔧",
            title:"Bilder",
            text:"Alla bilder i kursen",
            onClick: () => navigate(`${base}/bilder`)
        },

        {
            icon:"📚",
            title:"Föreläsningar",
            text:"Visa alla föreläsningar",
            onClick: () => navigate(`${base}/forelasningar`)
        },

        {
            icon:"📄",
            title:"Originalslides",
            text:"Slides bilderna skapades utifrån",
            onClick: () => navigate(`${base}/slides`)
        }

    ];

    return(

        <div className="section-grid">

            {

                sections.map(section=>(

                    <div
                        key={section.title}
                        className="section-card"
                        onClick={section.onClick}
                    >

                        <h1>{section.icon}</h1>

                        <h3>{section.title}</h3>

                        <p>{section.text}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default CourseSections;
