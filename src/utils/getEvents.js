import { request } from "utils";

export async function getEvents(organisation_id, type) {
    const events = await request.get(`events`);

    const activeEvents = events.data["hydra:member"].filter(
        (item) =>
            new Date(item.startAt) < new Date() &&
            new Date(item.endAt) > new Date()
    );
    if (type === "active") return activeEvents;
    else return events.data["hydra:member"];
}
