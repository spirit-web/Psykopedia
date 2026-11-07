import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/Home/HomePage";
import CourseEntryPage from "./pages/Course/CourseEntryPage";
import CourseLecturesPage from "./pages/Course/CourseLecturesPage";
import CourseImagesPage from "./pages/Course/CourseImagesPage";
import CourseSlidesPage from "./pages/Course/CourseSlidesPage";
import CourseThemesPage from "./pages/Course/CourseThemesPage";
import LecturePage from "./pages/Lecture/LecturePage";
import AdminPage from "./pages/Admin/AdminPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import HippocampusPage from "./pages/Hippocampus/HippocampusPage";
import CasesPage from "./pages/Cases/CasesPage";
import AccountPage from "./pages/Account/AccountPage";
import RequireAuth from "./components/Admin/RequireAuth";

function App(){

    return(

        <>

        <Navbar/>

        <Routes>

            <Route
                path="/"
                element={<HomePage/>}
            />

            <Route
                path="/course/:id"
                element={<CourseEntryPage/>}
            />

            <Route
                path="/course/:id/forelasningar"
                element={<CourseLecturesPage/>}
            />

            <Route
                path="/course/:id/bilder"
                element={<CourseImagesPage/>}
            />

            <Route
                path="/course/:id/slides"
                element={<CourseSlidesPage/>}
            />

            <Route
                path="/course/:id/begrepp"
                element={<CourseThemesPage/>}
            />

            <Route
                path="/course/:id/moment/:momentId"
                element={<CourseThemesPage/>}
            />

            <Route
                path="/course/:id/moment/:momentId/forelasningar"
                element={<CourseLecturesPage/>}
            />

            <Route
                path="/course/:id/moment/:momentId/bilder"
                element={<CourseImagesPage/>}
            />

            <Route
                path="/course/:id/moment/:momentId/slides"
                element={<CourseSlidesPage/>}
            />

            <Route
                path="/lecture/:id"
                element={<LecturePage/>}
            />

            <Route
                path="/favoriter"
                element={<FavoritesPage/>}
            />

            <Route
                path="/hippocampus"
                element={<HippocampusPage/>}
            />

            <Route
                path="/fall"
                element={<CasesPage/>}
            />

            <Route
                path="/konto"
                element={<AccountPage/>}
            />

            <Route
                path="/admin"
                element={<RequireAuth><AdminPage/></RequireAuth>}

            />

        </Routes>

        </>

    )

}

export default App;