import { Route } from "react-router-dom";
import { GuestLayout } from "containers";

function PublicRouteHelper({ component: Component, header, ...rest }) {
    return (
        <Route
            {...rest}
            exact={rest.exact}
            render={(props) => (
                <GuestLayout {...rest}>
                    <Component {...props} />
                </GuestLayout>
            )}
        />
    );
}

export default PublicRouteHelper;
