import PrivateRoute from "../Utils/PrivateRoute/privateRoute";
import Dashboard from "../containers/Dashboard";

export const dashboardRoutes = [
    <PrivateRoute exact path="/dashboard" page="home" component={Dashboard} />,

    <PrivateRoute path="/signatures" page="signatures" component={Dashboard} />,

    <PrivateRoute
        exact
        path="/statistics"
        page="statistics"
        component={Dashboard}
    />,
    <PrivateRoute
        exact
        path="/teams/:type"
        page="teams"
        component={Dashboard}
    />,

    <PrivateRoute path="/profile" page="profile" component={Dashboard} />,

    <PrivateRoute exact path="/events" page="events" component={Dashboard} />,

    <PrivateRoute
        exact
        path="/create-event"
        page="create-event"
        component={Dashboard}
    />,

    <PrivateRoute
        exact
        path="/past-events"
        page="past-events"
        component={Dashboard}
    />,
];
