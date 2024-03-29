import React, { useMemo, useState } from "react";
import { VisibilityToggle, Input, Button, CustomCheckbox } from "components";
import classes from "../Images/GroupedStylesImagesRenderer.module.css";
import { FormattedMessage } from "react-intl";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";

const SocialsRenderer = ({ styles, setStyles, typesToShow }) => {
    const stylesByType = useMemo(() => {
        if (!typesToShow) return;
        return styles.reduce((acc, style) => {
            if (typesToShow?.includes(style.type)) {
                acc[style.type] = {
                    ...(acc[style.type] || {}),
                    [style.property]: style,
                };
            }
            return acc;
        }, {});
    }, [styles, typesToShow]);

    const [lockedRatios, setLockedRatios] = useState(
        Object.fromEntries(typesToShow?.map((type) => [type, true]) || [])
    );
    const [lastNumericValues, setLastNumericValues] = useState({});

    const updateImageProperty = (styleUpdate) => {
        setStyles((prevStyles) => {
            if (!prevStyles) return;
            return prevStyles.map((style) =>
                style.id === styleUpdate.id
                    ? { ...style, value: styleUpdate.value }
                    : style
            );
        });
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
        if (!isLockable(type)) return;
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
    const isLockable = (type) => {
        const widthStyle = findStyleByTypeAndProperty(type, "width");
        const heightStyle = findStyleByTypeAndProperty(type, "height");
        return (
            widthStyle &&
            heightStyle &&
            !isNaN(widthStyle.value) &&
            !isNaN(heightStyle.value)
        );
    };

    const toggleLockRatio = (type) => {
        if (isLockable(type)) {
            setLockedRatios((prev) => ({
                ...prev,
                [type]: !prev[type],
            }));
        }
    };

    const handleDimensionChange = (type, updatedProperty, value) => {
        if (!isNaN(value)) {
            setLastNumericValues((prev) => ({
                ...prev,
                [`${type}-${updatedProperty}`]: value,
            }));
        }
        updateImageProperty({
            id: findStyleByTypeAndProperty(type, updatedProperty).id,
            value: value,
        });

        if (value && lockedRatios[type]) {
            updateOtherDimension(type, updatedProperty, value);
        }
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
                    <div className={classes.dimensionContainer}>
                        <FormattedMessage
                            id="buttons.placeholder.width"
                            tagName="label"
                        />
                        <div className={classes.dimensionInputContainer}>
                            <div className={classes.auto}>
                                <CustomCheckbox
                                    checked={widthStyle.value === "auto"}
                                    onChange={(e) => {
                                        const lastValue =
                                            lastNumericValues[
                                                `${type}-width`
                                            ] || "1";
                                        updateImageProperty({
                                            id: widthStyle.id,
                                            value: e.target.checked
                                                ? "auto"
                                                : lastValue,
                                        });
                                    }}
                                />
                                <FormattedMessage
                                    id="buttons.placeholder.auto"
                                    tagName="label"
                                />
                            </div>
                            <Input
                                type="number"
                                min={1}
                                disabled={widthStyle.value === "auto"}
                                value={
                                    widthStyle.value !== "auto"
                                        ? widthStyle.value
                                        : ""
                                }
                                placeholder={
                                    widthStyle.value === "auto"
                                        ? lastNumericValues[`${type}-width`]
                                        : widthStyle.value
                                }
                                onChange={(e) =>
                                    handleDimensionChange(
                                        type,
                                        "width",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                )}

                {heightStyle && (
                    <div className={classes.dimensionContainer}>
                        <FormattedMessage
                            id="buttons.placeholder.height"
                            tagName="label"
                        />
                        <div className={classes.dimensionInputContainer}>
                            <div className={classes.auto}>
                                <CustomCheckbox
                                    checked={heightStyle.value === "auto"}
                                    onChange={(e) => {
                                        const lastValue =
                                            lastNumericValues[
                                                `${type}-height`
                                            ] || "1";
                                        updateImageProperty({
                                            id: heightStyle.id,
                                            value: e.target.checked
                                                ? "auto"
                                                : lastValue,
                                        });
                                    }}
                                />
                                <FormattedMessage
                                    id="buttons.placeholder.auto"
                                    tagName="label"
                                />
                            </div>
                            <Input
                                type="number"
                                min={1}
                                disabled={heightStyle.value === "auto"}
                                value={
                                    heightStyle.value !== "auto"
                                        ? heightStyle.value
                                        : ""
                                }
                                placeholder={
                                    heightStyle.value === "auto"
                                        ? lastNumericValues[`${type}-height`]
                                        : heightStyle.value
                                }
                                onChange={(e) =>
                                    handleDimensionChange(
                                        type,
                                        "height",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                )}
                <div className={classes.lock}>
                    <Button
                        color="primaryLink"
                        onClick={() => toggleLockRatio(type)}
                        disabled={!isLockable(type)}
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
        if (!typesToShow) return [];
        return typesToShow
            .filter((type) => stylesByType[type])
            .map((type) => renderImagePropertyEditor(type));
    };

    const hasDisplayableContent = () => {
        if (!typesToShow) return [];
        return typesToShow.some((type) => stylesByType[type]);
    };

    if (!hasDisplayableContent()) {
        return <FormattedMessage id="message.warning.no_data" />;
    }

    return (
        <div className={classes.main}>
            <div className={classes.child}>{renderGroupByType()}</div>
        </div>
    );
};

export default SocialsRenderer;
