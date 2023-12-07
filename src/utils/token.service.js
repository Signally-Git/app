const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refresh_token;
};

const getLocalToken = () => {
    if (localStorage.getItem("user") === "undefined") return;
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
};

const updateToken = (token, refresh_token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.token = token;
    user.refresh_token = refresh_token;
    localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
    if (localStorage.getItem("user") === "undefined") return;
    return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
    user && localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
    localStorage.removeItem("user");
};

const getOrganisation = () => {
    if (localStorage.getItem("organisation") === "undefined") return;
    return JSON.parse(localStorage.getItem("organisation"));
};

const setOrganisation = (organisation) => {
    const fieldsToKeep = [
        "@id",
        "id",
        "@type",
        "address",
        "configurations",
        "digitalAdress",
        "distributor",
        "employeeNumber",
        "hasOnBoarding",
        "events",
        "google",
        "office365",
        "enableAzureSync",
        "logo",
        "logoDistributor",
        "name",
        "siren",
        "tenantId",
        "websiteUrl",
    ];

    const filterObject = (obj, fields) => {
        return fields.reduce((filteredObj, field) => {
            if (obj[field]) {
                filteredObj[field] = obj[field];
            }
            return filteredObj;
        }, {});
    };

    const filteredOrganisation = filterObject(organisation, fieldsToKeep);

    filteredOrganisation &&
        localStorage.setItem(
            "organisation",
            JSON.stringify(filteredOrganisation)
        );
};

const removeOrganisation = () => {
    localStorage.removeItem("organisation");
};

const getConfig = () => {
    return JSON.parse(localStorage.getItem("configuration"));
};

const setConfig = (configuration) => {
    configuration &&
        localStorage.setItem("configuration", JSON.stringify(configuration));
};

const removeConfig = () => {
    localStorage.removeItem("configuration");
};

const clearLocalStorage = () => {
    removeUser();
    removeOrganisation();
    removeConfig();
};

const TokenService = {
    getLocalRefreshToken,
    getLocalToken,
    updateToken,
    getUser,
    setUser,
    removeUser,
    getOrganisation,
    setOrganisation,
    removeOrganisation,
    getConfig,
    setConfig,
    removeConfig,
    clearLocalStorage,
};

export { TokenService };
