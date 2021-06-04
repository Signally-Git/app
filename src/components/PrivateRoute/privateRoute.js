import { Redirect, Route } from "react-router"

function PrivateRoute({ component: Component, ...rest }) {
    return (
    <Route {...rest} exact={rest.exact}
        render={props => localStorage.getItem("token") ? (
            <Component {...props} page={rest.page} />
        ) : (
            <Redirect to={{ pathname: "/sign-in", state: { from: props.location, error: "You must be logged in to see this page" } }} />
    )}
    />)
}

export default PrivateRoute