import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import SignIn from './containers/SignIn'
import Error from './containers/Error'
import Dashboard from './containers/Dashboard'
import Payment from './components/Payment/Payment'
// import SyncPage from './components/Sync/sync'
import Import from './containers/Import'
import PrivateRoute from 'Utils/PrivateRoute/privateRoute'
import CreateSignature from './containers/CreateSignature'
import Users from './components/Dashboard/Users/users'
import ImgUploader from './components/imgUploader/imgUploader'
import Studio from './containers/Studio'
import Store from './containers/Store'
import Billing from './containers/Billing'
import Report from './containers/Feedback'
import Signup from './components/Landing/SignUp/SignUp'
import { NotificationProvider } from 'Utils/Notifications/notifications'
import ResetPassword from './containers/ResetPassword/ResetPassword.jsx'
import CopySignature from './views/CopySignature/CopySignature'

// Routing for desktop view

export default function DesktopRoutes() {
    return (
        <Switch>
            <Route exact path="/">
            <NotificationProvider login>
                <Home />
            </NotificationProvider>
            </Route>

            <Route exact path="/sign-in">
            <NotificationProvider login>
                <Home />
            </NotificationProvider>
            </Route>

            <Route exact path="/sign-up">
            <NotificationProvider signup>
                <Signup />
            </NotificationProvider>
            </Route>

            <Route path="/reset-password">
                <ResetPassword />
            </Route>

            <PrivateRoute exact path="/dashboard" page="home" component={Dashboard} />

            <PrivateRoute path="/signatures" page="signatures" component={Dashboard} />

            <PrivateRoute path="/create-signature" component={CreateSignature} />

            <PrivateRoute path="/user/:userId" component={Users} />

            <PrivateRoute exact path="/teams/:type" page="teams" component={Dashboard} />

            <PrivateRoute path="/profile" page="profile" component={Dashboard} />

            <PrivateRoute exact path="/events" page="events" component={Dashboard} />

            <PrivateRoute exact path="/create-event" page="create-event" component={Dashboard} />

            <PrivateRoute exact path="/past-events" page="past-events" component={Dashboard} />

            <PrivateRoute path="/billing" page="billing" component={Billing} />

            <PrivateRoute exact path="/payment" page="payment" component={Payment} />

            {/* <PrivateRoute path="/synchronize" component={SyncPage} /> */}

            <PrivateRoute path="/import" component={Import} />

            <PrivateRoute path="/upload-img" component={ImgUploader} />

            <PrivateRoute exact path="/studio" component={Studio} />

            <PrivateRoute exact path="/store" component={Store} />

            <PrivateRoute exact path="/report" component={Report} />

            <Route path="/">
                <Error />
            </Route>
        </Switch>
    )
}