const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refresh_token;
};

const getLocalToken = () => {
    if (localStorage.getItem("user") === "undefined") return;
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
};

const updateLocalToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.token = token;
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
    return JSON.parse(localStorage.getItem("organisation"));
};

const setOrganisation = (organisation) => {
    organisation &&
        localStorage.setItem("organisation", JSON.stringify(organisation));
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
    updateLocalToken,
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
