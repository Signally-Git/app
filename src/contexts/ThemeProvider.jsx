import React, { createContext, useEffect, useState } from "react";
import { getTheme, camelToKebab } from "utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);
    const url = window.location.origin;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchThemeData = async () => {
            try {
                const fetchedTheme = await getTheme(url);
                setTheme(fetchedTheme.styles);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des couleurs :",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchThemeData();
    }, []);

    useEffect(() => {
        if (theme) {
            const root = document.documentElement;
            theme.forEach((style) => {
                const { property, value } = style;
                const formattedProperty = camelToKebab(property);
                root.style.setProperty(`--${formattedProperty}`, value);
            });
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme}>
            {loading ? (
                <AiOutlineLoading3Quarters className="loading" />
            ) : (
                children
            )}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
