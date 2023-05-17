import { routes } from "./routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { useContext } from "react";
import { LangContext } from "../contexts/LangContext";

export const AppRouter = () => {
    const { locale, messages } = useContext(LangContext);

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Router>
                <Switch>{routes}</Switch>
            </Router>
        </IntlProvider>
    );
};
