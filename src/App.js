import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollTop/resetTop'
import Home from '../src/containers/Home'
import SignIn from './containers/SignIn'
import Error from './containers/Error'
import Dashboard from './containers/Dashboard'

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

        <Route exact path="/signatures">
          <Dashboard page="signatures" />
        </Route>

        <Route exact path="/teams">
          <Dashboard page="teams" />
        </Route>

        <Route exact path="/events">
          <Dashboard page="events" />
        </Route>

        
        <Route exact path="/create-event">
          <Dashboard page="create-event" />
        </Route>

        <Route exact path="/profile">
          <Dashboard page="profile" />
        </Route>

        <Route path="/">
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  )

}

export default App;
