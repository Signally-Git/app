import { MainLayout } from "containers";
import { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { TokenService, NotificationProvider } from "utils";

// Checks if user is logged in by search at localStorage for a user token.
// If none, redirects to Sign in page else to the requested page.

function PrivateRouteHelper({ component: Component, ...rest }) {
    const [notification, setNotification] = useState();
    return (
        <Route
            {...rest}
            exact={rest.exact}
            render={(props) =>
                TokenService.getLocalToken() ? (
                    <MainLayout path={rest.path}>
                        <NotificationProvider msg={notification}>
                            <Component
                                {...props}
                                page={rest.page}
                                setNotification={setNotification}
                            />
                        </NotificationProvider>
                    </MainLayout>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/sign-in",
                            state: {
                                from: props.location,
                                error: "You must be logged in to see this page",
                            },
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRouteHelper;
