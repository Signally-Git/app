import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { getInstance, request, TokenService, useNotification } from "utils";
import classes from "./whiteLabel.module.css";
import { Button, Loading } from "components";
import BrandDetails from "./BrandDetails/BrandDetails";
import BrandStyles from "./BrandStyles/BrandStyles";

const WhiteLabel = () => {
    const [theme, setTheme] = useState({});
    const [instance, setInstance] = useState({});
    const [loading, setLoading] = useState(true);

    const notification = useNotification();

    useEffect(() => {
        const fetchThemeData = async () => {
            try {
                const fetchedInstance = await getInstance(
                    `?organisation=${TokenService.getOrganisation()["id"]}`
                );
                setInstance(fetchedInstance || {});
                setTheme(fetchedInstance.theme || {});
            } catch (error) {
                notification({
                    content: <FormattedMessage id="message.error.generic" />,
                    status: "invalid",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchThemeData();
    }, []);

    const handleSaveThemeStyles = async () => {
        for (let style of theme.styles) {
            console.log(style);

            try {
                const response = await request.patch(
                    `/theme_styles/${style["id"]}`,
                    style,
                    {
                        headers: {
                            "Content-Type": "application/merge-patch+json",
                        },
                    }
                );

                if (response.status >= 200 && response.status < 300) {
                    notification({
                        content: (
                            <>
                                <span className={classes.primaryColor}>
                                    {style.property}{" "}
                                </span>
                                <FormattedMessage id="message.success.edit" />
                            </>
                        ),
                        status: "valid",
                    });
                } else {
                    throw new Error(`Error updating style: ${style.property}`);
                }
            } catch (error) {
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.error.edit" />
                            <span className={classes.primaryColor}>
                                {" "}
                                {style.property}
                            </span>
                        </>
                    ),
                    status: "invalid",
                });
            }
        }
    };

    const handleSave = () => {
        console.log(theme);
        handleSaveThemeStyles();

        // Save instance data
        request
            .patch(
                instance["@id"],
                { name: instance.name },
                {
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                    },
                }
            )
            .then(() => {
                notification({
                    content: "Instance successfully saved!",
                    status: "valid",
                });
            })
            .catch(() =>
                notification({
                    content: "Error saving instance.",
                    status: "invalid",
                })
            );
    };

    const handleRangeChange = (property, value) => {
        handleUpdateStyle(property, `${value}%`);
    };

    const handleUpdateStyle = (property, newValue) => {
        setTheme((prevTheme) => {
            if (!prevTheme || !prevTheme.styles) return prevTheme;

            const updatedStyles = prevTheme.styles.map((style) =>
                style.property === property
                    ? { ...style, value: newValue }
                    : style
            );

            return { ...prevTheme, styles: updatedStyles };
        });
    };

    if (loading) return <Loading />;

    const categorizedStyles = theme.styles
        ? theme.styles.reduce((acc, style) => {
              const { type } = style;
              if (!acc[type]) acc[type] = [];
              acc[type].push(style);
              return acc;
          }, {})
        : {};

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <FormattedMessage id="white_label" tagName="h1" />
                <Button color="primaryFill" onClick={handleSave}>
                    <FormattedMessage id="buttons.placeholder.save" />
                </Button>
            </div>
            <div className={classes.fullContainer}>
                <BrandDetails instance={instance} setInstance={setInstance} />
                <BrandStyles
                    categorizedStyles={categorizedStyles}
                    handleRangeChange={handleRangeChange}
                    handleUpdateStyle={handleUpdateStyle}
                />
            </div>
        </div>
    );
};

export { WhiteLabel };
