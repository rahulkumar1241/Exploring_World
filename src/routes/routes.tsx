import React, { Suspense, lazy, useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { PATH } from "../paths/path";
import Loading from "../components/loader/loader";
import Topbar from "../common/topbar/topbar";

const Homepage = lazy(() => import('../containers/homepage'));
const CountryInfo = lazy(() => import('../containers/countryinfo'))

const ProjectRoutes: React.FC = (): JSX.Element => {
    return (

        <Suspense fallback={<Loading loading={true} />}>
            <Topbar/>
            <React.Fragment>
                <Routes>
                    <Route
                        path={PATH.PUBLIC.HOME_PAGE}
                        element={
                            <Homepage
                            />} />
                    <Route
                        path={PATH.PUBLIC.SPECIFIC_COUNTRY_INFO+"/:country_name"}
                        element={
                            <CountryInfo
                            />} />
                </Routes>
            </React.Fragment >
        </Suspense >
    )
}


export default ProjectRoutes;