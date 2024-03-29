import { FormattedMessage } from "react-intl";
import classes from "./images.module.css";
import GroupedStylesImagesRenderer from "./GroupedStylesImagesRenderer";

const Images = ({ styles, setStyles, selectedTemplate }) => {
    if (!selectedTemplate?.signatureStyles)
        return <FormattedMessage id="message.warning.no_data" />;
    return (
        <div className={classes.imagesContainer}>
            <GroupedStylesImagesRenderer
                styles={styles}
                setStyles={setStyles}
                filter={["company", "organisation", "logo", "workplace"]}
                ignore={["socialMedias", "socialIcons"]}
            />
        </div>
    );
};

export { Images };
