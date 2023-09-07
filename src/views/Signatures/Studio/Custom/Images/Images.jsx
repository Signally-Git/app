import { Input, UploadFile } from "components";
import { FormattedMessage, useIntl } from "react-intl";
import classes from "./images.module.css";
import GroupedStylesImagesRenderer from "./GroupedStylesImagesRenderer";

// Todo: bouton pour lock le ratio

const Images = ({ styles, setStyles, selectedTemplate }) => {
    if (!selectedTemplate?.signatureStyles)
        return <FormattedMessage id="message.warning.no_data" />;
    return (
        <div className={classes.imagesContainer}>
            <GroupedStylesImagesRenderer
                styles={styles}
                setStyles={setStyles}
                filter={["company", "organisation", "logo", "workplace"]}
                ignoreSubcategories={[
                    "company.address",
                    "organisation.name",
                    "organisation.phone",
                ]}
            />
        </div>
    );
};

export { Images };
