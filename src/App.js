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

        <Route exact path="/dashboard">
          <Dashboard page="home" />
        </Route>

        <Route path="/signatures">
          <Dashboard page="signatures" />
        </Route>

        <Route exact path="/teams">
          <Dashboard page="teams" />
        </Route>

        <Route path="/team/:teamName">
          <Team />
        </Route>

        <Route path="/create-team">
          <CreateTeam />
        </Route>

        <Route exact path="/events">
          <Dashboard page="events" />
        </Route>

        <Route exact path="/create-event">
          <Dashboard page="create-event" />
        </Route>

        <Route exact path="/past-events">
          <Dashboard page="past-events" />
        </Route>

        <Route exact path="/payment">
          <Payment />
        </Route>

        <Route path="/synchronize">
          <SyncPage />
        </Route>

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
