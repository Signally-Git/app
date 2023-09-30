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

    const handleSave = () => {
        request
            .patch(theme["@id"], theme, {
                headers: {
                    "Content-Type": "application/merge-patch+json",
                },
            })
            .then(() => {
                notification({
                    content: (
                        <>
                            <span className={classes.primaryColor}>
                                {theme.name}{" "}
                            </span>
                            <FormattedMessage id="message.success.edit" />
                        </>
                    ),
                    status: "valid",
                });
            })
            .catch(() =>
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.error.edit" />
                            <span className={classes.primaryColor}>
                                {" "}
                                {theme.name}
                            </span>
                        </>
                    ),
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
