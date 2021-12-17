import axios from "axios";
import { API } from "config";

export function UseUserInfos(userId) {
    return axios.get(`${API}user/${userId}?access_token=${localStorage.getItem("token")}`).then((res) => {
        return res.data
    })
}