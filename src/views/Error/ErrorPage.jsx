import { Header, Button } from "components";
import classes from "./errorpage.module.css";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

// Page displaying front errors

function ErrorPage() {
    const history = useHistory();

    return (
        <div>
            <Header />
            <div className={classes.container}>
                <FormattedMessage id="message.error.404.title" tagName="h1" />
                <FormattedMessage
                    id="message.error.404.description"
                    tagName="p"
                />
                <br />
                <Button color={"primary"} onClick={() => history.goBack()}>
                    <FormattedMessage id="buttons.placeholder.go_back" />
                </Button>
            </div>
        </div>
    );
}

export default ErrorPage;
