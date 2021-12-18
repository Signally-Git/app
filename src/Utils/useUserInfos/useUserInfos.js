import request from "Utils/Request/request";

export async function UseUserInfos(userId) {
    const user = await request.get(`user/${userId}`)
    return user.data["hydra:member"]
}