import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

function StatsPage() {
    const data = [
        {
            "@context": "/contexts/Statistic",
            "@id": "/statistics",
            "@type": "hydra:Collection",
            "hydra:member": [
                {
                    "@id": "/statistics/1ed4fb1d-4480-6890-a99f-c348c5700985",
                    "@type": "Statistic",
                    id: "1ed4fb1d-4480-6890-a99f-c348c5700985",
                    type: "EVENT_IMAGE_DISPLAYED",
                    event: "/events/1ed4fae8-3277-65f2-bf0b-775de2548b46",
                    organisation:
                        "/organisations/1ed497be-0ceb-61e0-bb6f-77b79f9fa1fc",
                    user: "/users/1ed497be-0d1e-6144-972e-77b79f9fa1fc",
                    signature:
                        "/signatures/1ed4faf8-eba9-6e70-9eb7-e790cd3685b9",
                    signatureTemplate:
                        "/signature_templates/1ed4a387-b2c5-63fc-a684-05b7dd484e85",
                },
                {
                    "@id": "/statistics/1ed4fb25-1883-6794-a4c0-5570f32842e3",
                    "@type": "Statistic",
                    id: "1ed4fb25-1883-6794-a4c0-5570f32842e3",
                    type: "EVENT_IMAGE_DISPLAYED",
                    event: "/events/1ed4fae8-3277-65f2-bf0b-775de2548b46",
                    organisation:
                        "/organisations/1ed497be-0ceb-61e0-bb6f-77b79f9fa1fc",
                    user: "/users/1ed497be-0d1e-6144-972e-77b79f9fa1fc",
                    signature:
                        "/signatures/1ed4faf8-eba9-6e70-9eb7-e790cd3685b9",
                    signatureTemplate:
                        "/signature_templates/1ed4a387-b2c5-63fc-a684-05b7dd484e85",
                },
                {
                    "@id": "/statistics/1ed4fb27-aa6f-6b92-832c-d76919ea2fd9",
                    "@type": "Statistic",
                    id: "1ed4fb27-aa6f-6b92-832c-d76919ea2fd9",
                    type: "EVENT_IMAGE_DISPLAYED",
                    event: "/events/1ed4fae8-3277-65f2-bf0b-775de2548b46",
                    organisation:
                        "/organisations/1ed497be-0ceb-61e0-bb6f-77b79f9fa1fc",
                    user: "/users/1ed497be-0d1e-6144-972e-77b79f9fa1fc",
                    signature:
                        "/signatures/1ed4faf8-eba9-6e70-9eb7-e790cd3685b9",
                    signatureTemplate:
                        "/signature_templates/1ed4a387-b2c5-63fc-a684-05b7dd484e85",
                },
            ],
            "hydra:totalItems": 3,
            "hydra:view": {
                "@id": "/statistics?organisation=1ed497be-0ceb-61e0-bb6f-77b79f9fa1fc&type=EVENT_IMAGE_DISPLAYED",
                "@type": "hydra:PartialCollectionView",
            },
            "hydra:search": {
                "@type": "hydra:IriTemplate",
                "hydra:template":
                    "/statistics{?id,id[],organisation,organisation[],user,user[],event,event[],type,type[]}",
                "hydra:variableRepresentation": "BasicRepresentation",
                "hydra:mapping": [
                    {
                        "@type": "IriTemplateMapping",
                        variable: "id",
                        property: "id",
                        required: false,
                    },
                    {
                        "@type": "IriTemplateMapping",
                        variable: "id[]",
                        property: "id",
                        required: false,
                    },
                    {
                        "@type": "IriTemplateMapping",
                        variable: "organisation",
                        property: "organisation",
                        required: false,
                    },
                    {
                        "@type": "IriTemplateMapping",
                        variable: "organisation[]",
                        property: "organisation",
                        required: false,
                    },
                    {
                        "@type": "IriTemplateMapping",
                        variable: "user",
                        property: "user",
                        required: false,
                    },
                    {
                        "@type": "IriTemplateMapping",
                        variable: "user[]",
                        property: "user",
                        required: false,
                    },
                    {
                        "@type": "IriTemplateMapping",
                        variable: "event",
                        property: "event",
                        required: false,
                    },
                    {
                        "@type": "IriTemplateMapping",
                        variable: "event[]",
                        property: "event",
                        required: false,
                    },
                    {
                        "@type": "IriTemplateMapping",
                        variable: "type",
                        property: "type",
                        required: false,
                    },
                    {
                        "@type": "IriTemplateMapping",
                        variable: "type[]",
                        property: "type",
                        required: false,
                    },
                ],
            },
        },
    ];
    return (
        <>
            <h1>Statistiques</h1>
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </>
    );
}

export default StatsPage;
