import axios from "axios";
import { API } from "config";

export function UseEvents(organisation_id, type) {
    return axios.get(`${API}organisation/${organisation_id}/campaigns?access_token=${localStorage.getItem("token")}`).then((res) => {
        const activeEvents = res.data.data.filter(item => item.active === true)
        if (type === "active")
            return (activeEvents)
        else return res.data.data
    })
}