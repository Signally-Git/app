import request from "Utils/Request/request";

export async function UseOrganizationInfos(organisation_id) {
    const organisation = await request.get(`${organisation_id}`);
    return organisation.data["hydra:member"];
}
