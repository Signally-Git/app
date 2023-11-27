import PrivateRouteHelper from "../PrivateRoute.helper";
import Dashboard from "../../views/Dashboard/Dashboard";

export const dashboardRoutes = [
    <PrivateRouteHelper
        exact
        path="/dashboard"
        page="home"
        component={Dashboard}
    />,

    <PrivateRouteHelper
        path="/signatures"
        page="signatures"
        component={Dashboard}
    />,

    <PrivateRouteHelper
        exact
        path="/white-label"
        page="whiteLabel"
        component={Dashboard}
    />,

    <PrivateRouteHelper
        exact
        path="/statistics"
        page="statistics"
        component={Dashboard}
    />,
    <PrivateRouteHelper
        exact
        path="/teams/:type"
        page="teams"
        component={Dashboard}
    />,
    <PrivateRouteHelper
        exact
        path="/deploy"
        page="deploy"
        component={Dashboard}
    />,

    <PrivateRouteHelper
        path="/account/:tab"
        page="account"
        component={Dashboard}
    />,

    <PrivateRouteHelper
        exact
        path="/events"
        page="events"
        component={Dashboard}
    />,

    <PrivateRouteHelper
        path="/create-signature"
        page="create-signature"
        component={Dashboard}
    />,

    <PrivateRouteHelper
        exact
        path="/create-event"
        page="create-event"
        component={Dashboard}
    />,

    <PrivateRouteHelper
        exact
        path="/past-events"
        page="past-events"
        component={Dashboard}
    />,
];
