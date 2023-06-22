export const detectBrowserLanguage = () => {
    const browserLanguage =
        navigator.language ||
        navigator.userLanguage ||
        navigator.browserLanguage ||
        navigator.systemLanguage ||
        undefined;

    if (browserLanguage) {
        return browserLanguage;
    }

    return undefined;
};
