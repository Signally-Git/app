import request from "../../../Utils/Request/request";

function getStatisticsFromEntity(type, id) {
    return request.get(`statistics?${type}=${id}`).then((res) => {
        return res.data["hydra:member"];
    });
}

async function getEntities() {
    const entities = [JSON.parse(localStorage.getItem("organisation"))];
    await request.get(`workplaces`).then((r) => {
        r.data["hydra:member"].map((wp) => entities.push(wp));
    });
    await request.get(`teams`).then((r) => {
        r.data["hydra:member"].map((tm) => {
            entities.push(tm);
            console.log(tm);
        });
    });
    await request.get(`users`).then((r) => {
        r.data["hydra:member"].map((usr) => {
            entities.push({ ...usr, name: `${usr.firstName} ${usr.lastName}` });
        });
    });

    return entities;
}

export { getStatisticsFromEntity, getEntities };
