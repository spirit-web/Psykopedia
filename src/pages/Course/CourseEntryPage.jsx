import { useParams } from "react-router-dom";

import useMoments from "../../hooks/useMoments";
import MomentPickerPage from "./MomentPickerPage";
import CourseThemesPage from "./CourseThemesPage";

function CourseEntryPage() {

    const { id } = useParams();

    const { moments, loading } = useMoments(id);

    if (loading) {

        return <h2>Laddar kurs...</h2>;

    }

    if (moments.length > 0) {

        return <MomentPickerPage />;

    }

    return <CourseThemesPage />;

}

export default CourseEntryPage;
