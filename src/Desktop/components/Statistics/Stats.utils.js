import request from "../../../Utils/Request/request";

function getStatisticsFromOrganisation(id) {
    return request.get(`statistics?organisation=${id}`).then((res) => {
        return res.data["hydra:member"];
    });
}

function getStatisticsFromEvent(id) {
    return request.get(`statistics?event=${id}`).then((res) => {
        return res.data["hydra:member"];
    });
}

export { getStatisticsFromOrganisation, getStatisticsFromEvent };
