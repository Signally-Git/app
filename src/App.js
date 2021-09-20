import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollTop/resetTop'
import Home from '../src/containers/Home'
import SignIn from './containers/SignIn'
import Error from './containers/Error'
import Dashboard from './containers/Dashboard'
import Team from './components/Dashboard/Teams/Team/team'
import CreateTeam from './components/Dashboard/Teams/CreateTeam/createTeam'
import Payment from './components/Payment/Payment'
import SyncPage from './components/Sync/sync'
import Import from './containers/Import'
import PrivateRoute from './components/PrivateRoute/privateRoute'
import CreateSignature from './containers/CreateSignature'
import Users from './components/Dashboard/Users/users'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/sign-in">
          <SignIn />
        </Route>

        <PrivateRoute exact path="/dashboard" page="home" component={Dashboard} />

        <PrivateRoute path="/signatures" page="signatures" component={Dashboard} />

        <PrivateRoute path="/create-signature" component={CreateSignature} />

        <PrivateRoute path="/team/:teamId" component={Team} />

        <PrivateRoute path="/user/:userId" component={Users} />

        <PrivateRoute exact path="/teams" page="teams" component={Dashboard} />
       
        <PrivateRoute exact path="/events" page="events" component={Dashboard} />

        <PrivateRoute exact path="/create-team" component={CreateTeam} />
       
        <PrivateRoute exact path="/create-event" page="create-event" component={Dashboard} />

        <PrivateRoute exact path="/past-events" page="past-events" component={Dashboard} />

        <PrivateRoute path="/profile" page="profile" component={Dashboard} />

        <PrivateRoute exact path="/payment" component={Payment} />

        <PrivateRoute path="/synchronize" component={SyncPage} />

        <PrivateRoute path="/import" component={Import} />

        <Route path="/">
          <Error />
        </Route>
      
      {/* <Route exact path="/profile">
        <Dashboard page="profile" />
      </Route> */}

      </Switch>
    </BrowserRouter>
  )
  
}

export default App;
