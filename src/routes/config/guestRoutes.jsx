import PublicRouteHelper from "routes/PublicRoute.helper";
import Home from "containers/Home";
import ResetPassword from "views/ResetPassword/ResetPassword";
import TemplateRendererPage from "views/TemplateRenderer/TemplateRenderer.page";
import CopySignature from "views/CopySignature/CopySignature.jsx";
import ErrorPage from "views/Error/ErrorPage";
import { Route } from "react-router-dom";

export const guestRoutes = [
    <PublicRouteHelper
        exact
        path={["/", "/sign-in"]}
        landing
        component={Home}
    />,

    <PublicRouteHelper exact path={["/sign-up"]} landing component={Home} />,

    <PublicRouteHelper path="/reset-password">
        <ResetPassword />
    </PublicRouteHelper>,

    <Route
        path="/users/:token"
        component={CopySignature}
    />,

    <PublicRouteHelper
        path="/render-template"
        component={TemplateRendererPage}
    />,

    <PublicRouteHelper path="/">
        <ErrorPage />
    </PublicRouteHelper>,
];
