import axios from "axios";
import { TokenService } from "utils";

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

request.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

request.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalConfig = err.config;

        if (err.response?.status === 401) {
            if (originalConfig.url === "/token/refresh") {
                TokenService.clearLocalStorage();
                window.location.href = "/sign-in";
                return Promise.reject(err);
            }

            if (!originalConfig._retry) {
                originalConfig._retry = true;

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then((token) => {
                        originalConfig.headers["Authorization"] =
                            "Bearer " + token;
                        return request(originalConfig);
                    });
                }

                isRefreshing = true;

                return request
                    .post("/token/refresh", {
                        refresh_token: TokenService.getLocalRefreshToken(),
                    })
                    .then((res) => {
                        const { token, refresh_token } = res.data;
                        TokenService.updateToken(token, refresh_token);
                        request.defaults.headers["Authorization"] =
                            "Bearer " + token;
                        originalConfig.headers["Authorization"] =
                            "Bearer " + token;
                        processQueue(null, token);
                        isRefreshing = false;
                        return request(originalConfig);
                    })
                    .catch((error) => {
                        processQueue(error, null);
                        isRefreshing = false;
                        TokenService.clearLocalStorage();
                        window.location.href = "/sign-in";
                        return Promise.reject(error);
                    });
            }
        }
        return Promise.reject(err);
    }
);

export default request;
