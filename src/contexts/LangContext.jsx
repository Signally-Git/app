import React, { useState } from "react";
import { detectBrowserLanguage, TokenService } from "Utils";

export const LangContext = React.createContext();

function flattenMessages(nestedMessages, prefix = "") {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "string") {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}
export const LangProvider = ({ children }) => {
    const [locale, setLocale] = useState(
        TokenService.getUser()?.lang?.isoCode || detectBrowserLanguage() || "fr"
    );

    function getMessages(locale) {
        switch (locale) {
            case "fr":
                return require("locales/fr.json");
            case "en":
                return require("locales/en.json");
            default:
                return require("locales/en.json");
        }
    }

    const messages = flattenMessages(getMessages(locale));

    return (
        <LangContext.Provider value={{ locale, setLocale, messages }}>
            {children}
        </LangContext.Provider>
    );
};
