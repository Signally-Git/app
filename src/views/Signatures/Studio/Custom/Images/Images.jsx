import { Input, UploadFile } from "components";
import { FormattedMessage, useIntl } from "react-intl";
import classes from "./images.module.css";

const Images = () => {
    const intl = useIntl();
    return (
        <div className={classes.imagesContainer}>
            <FormattedMessage id="logo" tagName="h3" />
            <Input min={0} type="number" placeholder="Width" />
            <UploadFile
                placeholder={intl.formatMessage({
                    id: "buttons.placeholder.import.logo",
                })}
            />
            <br />
            <FormattedMessage
                id="buttons.placeholder.import.profile_picture"
                tagName="h3"
            />
            <UploadFile
                placeholder={intl.formatMessage({
                    id: "buttons.placeholder.import.profile_picture",
                })}
            />
            <br />
            <FormattedMessage id="event" tagName="h3" />
            <p>
                Custom your campaign event. <br /> You can create a campaign on
                the events page.
            </p>
            <UploadFile
                placeholder={intl.formatMessage({
                    id: "buttons.placeholder.import.banner",
                })}
            />
        </div>
    );
};

export { Images };