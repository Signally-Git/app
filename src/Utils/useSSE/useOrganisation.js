import { useEffect, useState } from "react";
import { TokenService } from "../token.service";
import request from "../Request/request";

const eventSources = {};

function useOrganisation(user) {
    const organisationKey = `organisation_${user["organisation"]}`;
    const [organisation, setOrganisation] = useState(
        TokenService.getOrganisation()
    );

    if (!organisation)
        request.get(user["organisation"]).then(({ data }) => {
            setOrganisation(data);
            TokenService.setOrganisation(data);
        });

    useEffect(() => {
        if (!eventSources[organisationKey]) {
            eventSources[organisationKey] = new EventSource(
                `${process.env.REACT_APP_HUB_URL}${user["organisation"]}`
            );
        }
        const sse = eventSources[organisationKey];

        function getRealtimeData(data) {
            setOrganisation(data);
        }
        sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));

        return () => {
            sse.close();
            delete eventSources[organisationKey];
        };
    }, [user]);

    return organisation;
}

export { useOrganisation };
