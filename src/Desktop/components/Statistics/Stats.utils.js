import request from "../../../Utils/Request/request";

function getStatisticsFromEntity(type, id) {
    return request.get(`statistics?${type}=${id}`).then((res) => {
        return res.data["hydra:member"];
    });
}

function mergeArrays(arr1 = [], arr2 = []) {
    let res = [];
    res = arr1.map((obj) => {
        const index = arr2.findIndex(
            (el) => el["day_created_date"] == obj["day_created_date"]
        );
        const { totalItems } = index !== -1 ? arr2[index] : {};
        return {
            ...obj,
            displayed: totalItems,
        };
    });
    return res;
}

async function getEntities() {
    const entities = [JSON.parse(localStorage.getItem("organisation"))];
    await request.get(`workplaces`).then((r) => {
        r.data["hydra:member"].map((wp) => entities.push(wp));
    });
    await request.get(`teams`).then((r) => {
        r.data["hydra:member"].map((tm) => {
            entities.push(tm);
            // console.log(tm);
        });
    });
    await request.get(`users`).then((r) => {
        r.data["hydra:member"].map((usr) => {
            entities.push({ ...usr, name: `${usr.firstName} ${usr.lastName}` });
        });
    });

    return entities;
}

export { getStatisticsFromEntity, getEntities, mergeArrays };
