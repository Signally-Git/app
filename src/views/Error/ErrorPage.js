import Header from "../../components/Header/Header";
import classes from "./errorpage.module.css";
import { FormattedMessage } from "react-intl";

// Page displaying front errors

function ErrorPage() {
    return (
        <div>
            <Header />
            <div className={classes.container}>
                <FormattedMessage id="message.error.404.title" tagName="h1" />
                <FormattedMessage
                    id="message.error.404.description"
                    tagName="p"
                />
            </div>
        </div>
    );
}

export default ErrorPage;
