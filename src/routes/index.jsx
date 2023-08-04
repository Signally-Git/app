import { routes } from "./routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { useContext } from "react";
import { LangContext } from "contexts/LangContext";
import { ThemeProvider } from "contexts/ThemeProvider";
export const AppRouter = () => {
    const { locale, messages } = useContext(LangContext);

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Router>
                <ThemeProvider>
                    <Switch>{routes}</Switch>
                </ThemeProvider>
            </Router>
        </IntlProvider>
    );
};
