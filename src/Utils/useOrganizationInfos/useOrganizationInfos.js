import axios from "axios";
import { API } from "config";

export function UseOrganizationInfos(organisation_id) {
    return axios.get(`${API}organisation/${organisation_id}?access_token=${localStorage.getItem("token")}`).then((res) => {
        return res.data
    })
}