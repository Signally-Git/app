import { request } from "utils";
import { useEffect, useState } from "react";
import { Template } from "./Template";
import classes from "./templates.module.css";

const fetchTemplates = async () => {
    try {
        const { data } = await request.get(`signature_templates`);
        return data?.["hydra:member"] || [];
    } catch (error) {
        console.error("Failed to fetch templates:", error);
        return [];
    }
};

const Templates = () => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const loadTemplates = async () => {
            const fetchedTemplates = await fetchTemplates();
            setTemplates(fetchedTemplates);
        };

        loadTemplates();
    }, []);

    return (
        <ul className={classes.templatesList}>
            {templates.map((template) => {
                console.log(template);
                return (
                    <li key={template.id}>
                        <Template
                            id={template.id}
                            template={template}
                            styles={template.signatureStyles}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export { Templates };
