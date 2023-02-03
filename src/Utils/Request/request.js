import axios from "axios";
import { TokenService } from "Utils/index";

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

request.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
            config.headers["Access-Control-Allow-Origin"] = "*";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let _retry = undefined;

request.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/token/auth" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !_retry) {
                _retry = true;

                try {
                    const rs = await request.post("/token/refresh", {
                        refresh_token: TokenService.getLocalRefreshToken(),
                    });

                    const { token } = rs.data;
                    TokenService.updateLocalToken(token);

                    return request(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            } else if (err.response.status === 401) {
                TokenService.clearLocalStorage();
                window.location.replace("/sign-in");
            }
        }

        return Promise.reject(err);
    }
);

export default request;
