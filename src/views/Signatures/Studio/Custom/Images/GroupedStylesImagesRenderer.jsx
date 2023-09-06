import React from "react";
import { CustomCheckbox, Input } from "components";
import classes from "./GroupedStylesImagesRenderer.module.css";
import { FormattedMessage } from "react-intl";

const GroupedStylesImagesRenderer = ({ styles, setStyles }) => {
    const updateImageProperty = (styleUpdate) => {
        const updatedStyles = styles.map((style) =>
            style.id === styleUpdate.id
                ? { ...style, value: styleUpdate.value }
                : style
        );
        setStyles(updatedStyles);
    };

    const findStyleByTypeAndProperty = (type, property) => {
        return styles.find(
            (style) => style.type === type && style.property === property
        );
    };

    const renderImagePropertyEditor = (type) => {
        const enabledStyle = findStyleByTypeAndProperty(type, "enabled");
        const widthStyle = findStyleByTypeAndProperty(type, "width");
        const heightStyle = findStyleByTypeAndProperty(type, "height");

        return (
            <div key={type}>
                {enabledStyle && (
                    <CustomCheckbox
                        checked={enabledStyle.value === "true"}
                        onChange={(e) => {
                            updateImageProperty({
                                id: enabledStyle.id,
                                value: e.target.checked.toString(),
                            });
                        }}
                    />
                )}
                {widthStyle && (
                    <Input
                        type="number"
                        min={0}
                        value={widthStyle.value}
                        placeholder="Width"
                        onChange={(e) => {
                            updateImageProperty({
                                id: widthStyle.id,
                                value: e.target.value,
                            });
                        }}
                    />
                )}
                {heightStyle && (
                    <Input
                        type="number"
                        min={0}
                        value={heightStyle.value}
                        placeholder="Height"
                        onChange={(e) => {
                            updateImageProperty({
                                id: heightStyle.id,
                                value: e.target.value,
                            });
                        }}
                    />
                )}
            </div>
        );
    };

    const renderGroupByType = () => {
        const types = [...new Set(styles.map((s) => s.type))];

        return types
            .map((type) => {
                const typeParts = type.split(".");
                const mainType = typeParts[0]; // "company"
                const subType = typeParts[1]; // "logo"

                const enabledStyle = findStyleByTypeAndProperty(
                    type,
                    "enabled"
                );
                const widthStyle = findStyleByTypeAndProperty(type, "width");
                const heightStyle = findStyleByTypeAndProperty(type, "height");

                // Vérification de la présence des trois propriétés
                if (!enabledStyle || !widthStyle || !heightStyle) {
                    return null; // Ne rend rien si une des propriétés est manquante
                }

                return (
                    <div className={classes.main} key={mainType}>
                        <h3>
                            {mainType.charAt(0).toUpperCase() +
                                mainType.slice(1)}
                        </h3>
                        <div className={classes.child}>
                            {subType ? (
                                <h4>
                                    {subType.charAt(0).toUpperCase() +
                                        subType.slice(1)}
                                </h4>
                            ) : null}
                            {renderImagePropertyEditor(type)}
                        </div>
                    </div>
                );
            })
            .filter(Boolean); // Filtre les éléments null pour ne pas les rendre
    };
    const hasDisplayableContent = () => {
        const types = [...new Set(styles.map((s) => s.type))];
        return types.some((type) => {
            const enabledStyle = findStyleByTypeAndProperty(type, "enabled");
            const widthStyle = findStyleByTypeAndProperty(type, "width");
            const heightStyle = findStyleByTypeAndProperty(type, "height");
            return enabledStyle && widthStyle && heightStyle;
        });
    };

    if (!hasDisplayableContent()) {
        return <FormattedMessage id="message.warning.no_data" />;
    }
    return <div>{renderGroupByType()}</div>;
};

export default GroupedStylesImagesRenderer;
