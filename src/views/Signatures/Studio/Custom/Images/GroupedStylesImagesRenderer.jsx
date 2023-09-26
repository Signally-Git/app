import React, { useState } from "react";
import { VisibilityToggle, Input, Button } from "components";
import classes from "./GroupedStylesImagesRenderer.module.css";
import { FormattedMessage } from "react-intl";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";

const GroupedStylesImagesRenderer = ({ styles, setStyles }) => {
    const initializeLockedRatios = () => {
        const types = [...new Set(styles.map((s) => s.type))];
        const initialLocks = {};
        types.forEach((type) => {
            initialLocks[type] = true;
        });
        return initialLocks;
    };

    const [lockedRatios, setLockedRatios] = useState(initializeLockedRatios);

    const updateImageProperty = (styleUpdate) => {
        setStyles((prevStyles) =>
            prevStyles.map((style) =>
                style.id === styleUpdate.id
                    ? { ...style, value: styleUpdate.value }
                    : style
            )
        );
    };

    const findStyleByTypeAndProperty = (type, property) => {
        return styles.find(
            (style) => style.type === type && style.property === property
        );
    };

    const calculateRatio = (width, height) => {
        return width / height;
    };

    const updateOtherDimension = (type, updatedProperty, newValue) => {
        if (!newValue || isNaN(newValue) || Number(newValue) === 0) {
            const oppositeProperty =
                updatedProperty === "width" ? "height" : "width";
            const oppositeStyle = findStyleByTypeAndProperty(
                type,
                oppositeProperty
            );

            if (!oppositeStyle.value || Number(oppositeStyle.value) === 0) {
                updateImageProperty({
                    id: oppositeStyle.id,
                    value: "1",
                });
            }
            return;
        }

        const widthStyle = findStyleByTypeAndProperty(type, "width");
        const heightStyle = findStyleByTypeAndProperty(type, "height");

        // Utilisez les anciennes valeurs pour calculer le ratio
        const oldWidth = Number(widthStyle.value);
        const oldHeight = Number(heightStyle.value);
        const ratio = calculateRatio(oldWidth, oldHeight);

        if (lockedRatios[type]) {
            if (updatedProperty === "width") {
                const newWidth = Number(newValue);
                const newHeight = Math.round(newWidth / ratio);
                updateImageProperty({
                    id: heightStyle.id,
                    value: `${newHeight}`,
                });
            } else {
                const newHeight = Number(newValue);
                const newWidth = Math.round(newHeight * ratio);
                updateImageProperty({
                    id: widthStyle.id,
                    value: `${newWidth}`,
                });
            }
        }
    };

    const toggleLockRatio = (type) => {
        setLockedRatios((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleDimensionChange = (type, updatedProperty, value) => {
        updateImageProperty({
            id: findStyleByTypeAndProperty(type, updatedProperty).id,
            value: value,
        });

        // Si la valeur n'est pas vide et que le ratio est verrouillé, mettez à jour l'autre dimension
        if (value && lockedRatios[type]) {
            updateOtherDimension(type, updatedProperty, value);
        }
    };

    const subTypeToUrlMap = {
        Company: "/account/company",
        Organisation: "/account/company",
        User: "/account/user",
        Event: "events",
        Workplace: "/teams/workplaces",
    };

    const renderImagePropertyEditor = (type) => {
        const enabledStyle = findStyleByTypeAndProperty(type, "enabled");
        const widthStyle = findStyleByTypeAndProperty(type, "width");
        const heightStyle = findStyleByTypeAndProperty(type, "height");

        return (
            <div key={type}>
                {enabledStyle && (
                    <VisibilityToggle
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
                        min={1}
                        value={widthStyle.value || ""}
                        placeholder="Width"
                        onChange={(e) =>
                            handleDimensionChange(type, "width", e.target.value)
                        }
                    />
                )}
                {heightStyle && (
                    <Input
                        type="number"
                        min={1}
                        value={heightStyle.value || ""}
                        placeholder="Height"
                        onChange={(e) =>
                            handleDimensionChange(
                                type,
                                "height",
                                e.target.value
                            )
                        }
                    />
                )}
                <div className={classes.lock}>
                    <Button
                        color="primaryLink"
                        onClick={() => toggleLockRatio(type)}
                    >
                        {lockedRatios[type] ? (
                            <>
                                <HiOutlineLockClosed />
                                <FormattedMessage id="signature.ratio.unlock" />
                            </>
                        ) : (
                            <>
                                <HiOutlineLockOpen />
                                <FormattedMessage id="signature.ratio.lock" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        );
    };

    const renderGroupByType = () => {
        const types = [...new Set(styles.map((s) => s.type))];

        return types
            .map((type) => {
                const typeParts = type.split(".");
                const mainType = typeParts[0];
                const subType = typeParts[1];

                const enabledStyle = findStyleByTypeAndProperty(
                    type,
                    "enabled"
                );
                const widthStyle = findStyleByTypeAndProperty(type, "width");
                const heightStyle = findStyleByTypeAndProperty(type, "height");

                if (!enabledStyle || !widthStyle || !heightStyle) {
                    return null;
                }

                return (
                    <div className={classes.main} key={mainType}>
                        <h3>
                            {mainType.charAt(0).toUpperCase() +
                                mainType.slice(1)}
                        </h3>
                        <div className={classes.child}>
                            {subType ? (
                                <>
                                    <h4>
                                        {subType.charAt(0).toUpperCase() +
                                            subType.slice(1)}
                                    </h4>
                                    {subTypeToUrlMap[
                                        mainType.charAt(0).toUpperCase() +
                                            mainType.slice(1)
                                    ] ? (
                                        <FormattedMessage
                                            tagName="span"
                                            values={{
                                                value: `${subType} ${mainType}`,
                                                link: (
                                                    <>
                                                        <a
                                                            href={
                                                                subTypeToUrlMap[
                                                                    mainType
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                        mainType.slice(
                                                                            1
                                                                        )
                                                                ]
                                                            }
                                                        >
                                                            <FormattedMessage id="signature.infos.here" />
                                                        </a>
                                                    </>
                                                ),
                                            }}
                                            id={`signature.infos.${subType}`}
                                        />
                                    ) : null}
                                </>
                            ) : subTypeToUrlMap[
                                  mainType.charAt(0).toUpperCase() +
                                      mainType.slice(1)
                              ] ? (
                                <FormattedMessage
                                    tagName="span"
                                    values={{
                                        value: mainType,
                                        link: (
                                            <>
                                                <a
                                                    href={
                                                        subTypeToUrlMap[
                                                            mainType
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                mainType.slice(
                                                                    1
                                                                )
                                                        ]
                                                    }
                                                >
                                                    ici
                                                </a>
                                            </>
                                        ),
                                    }}
                                    id={`signature.infos.logo`}
                                />
                            ) : null}

                            {renderImagePropertyEditor(type)}
                        </div>
                    </div>
                );
            })
            .filter(Boolean);
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
