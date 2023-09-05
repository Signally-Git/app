import { Input, UploadFile } from "components";
import { FormattedMessage, useIntl } from "react-intl";
import classes from "./images.module.css";
import GroupedStylesImagesRenderer from "./GroupedStylesImagesRenderer";

const Images = ({ styles, setStyles, selectedTemplate }) => {
    const intl = useIntl();
    if (!selectedTemplate?.signatureStyles) return null;
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
