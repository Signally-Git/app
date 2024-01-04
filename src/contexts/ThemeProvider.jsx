import React, { createContext, useEffect, useState } from "react";
import { getTheme, camelToKebab, getInstance } from "utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logo, setLogo] = useState("");
    const [name, setName] = useState("");
    const url = `?url=${window.location.origin}`;

    useEffect(() => {
        const fetchThemeData = async () => {
            try {
                const fetchedTheme = await getTheme(url);
                const fetchInstance = await getInstance(url);
                setTheme(fetchedTheme.styles);
                setName(fetchInstance.name);
                setLogo(fetchInstance.organisation?.logoDistributor.url);
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
        <ThemeContext.Provider value={{ theme, logo, name }}>
            {loading ? (
                <AiOutlineLoading3Quarters className="loading" />
            ) : (
                children
            )}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
