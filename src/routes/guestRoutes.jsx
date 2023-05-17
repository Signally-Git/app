import { Route } from "react-router-dom";
import { NotificationProvider } from "Utils/Notifications/notifications";
import Home from "../containers/Home";
import Signup from "../components/Landing/SignUp/SignUp";
import ResetPassword from "../views/ResetPassword/ResetPassword";
import TemplateRendererPage from "../views/TemplateRenderer/TemplateRenderer.page";
import Error from "../containers/Error";
import CopySignature from "../views/CopySignature/CopySignature";

export const guestRoutes = [
    <Route exact path="/">
        <NotificationProvider login>
            <Home />
        </NotificationProvider>
    </Route>,

    <Route exact path="/sign-in">
        <NotificationProvider login>
            <Home />
        </NotificationProvider>
    </Route>,

    <Route exact path="/sign-up">
        <NotificationProvider signup>
            <Signup />
        </NotificationProvider>
    </Route>,

    <Route path="/reset-password">
        <ResetPassword />
    </Route>,

    <Route path="/users/:token">
        <CopySignature />
    </Route>,

    <Route path="/render-template" component={TemplateRendererPage} />,

    <Route path="/">
        <Error />
    </Route>,
];
