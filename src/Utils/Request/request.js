import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
if (localStorage.getItem("token"))
    request.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

request.interceptors.response.use(
    (response) => {
        // console.log(response)
        if (response.code === 401) {
            alert("You are not authorized");
        }
        return response;
    },
    (error) => {
        // if (error.response && error.response.data) {
        if (
            !localStorage.getItem("token") ||
            error?.response?.data?.code === 401
        ) {
            axios
                .post(`${process.env.REACT_APP_API_URL}/token/refresh`, {
                    refresh_token: localStorage.getItem("refresh_token"),
                })
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem(
                        "refresh_token",
                        res.data.refresh_token
                    );
                    window.location.replace("/");
                })
                .catch((err) => {
                    if (err.response.data.code === 401) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("refresh_token");
                        window.location.replace("/");
                    }
                });
        }

        return Promise.reject(error?.response?.data);
        // }
        // return Promise.reject(error.message);
    }
);

export default request;
