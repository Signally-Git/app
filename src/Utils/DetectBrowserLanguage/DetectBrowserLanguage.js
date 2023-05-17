export const detectBrowserLanguage = () => {
    const browserLanguage =
        navigator.language ||
        navigator.userLanguage ||
        navigator.browserLanguage ||
        navigator.systemLanguage ||
        undefined;

    if (browserLanguage) {
        // en-GB transforms in en
        const languageCode = browserLanguage.split("-")[0];
        return languageCode;
    }

    return undefined;
};
