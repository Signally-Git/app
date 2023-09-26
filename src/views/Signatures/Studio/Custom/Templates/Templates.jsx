import { request } from "utils";
import { useEffect, useState } from "react";
import { Template } from "./Template";
import classes from "./templates.module.css";
import { Tags } from "./Tags";

const fetchTemplates = async ({ tag }) => {
    try {
        const { data } = await request.get(
            tag ? `signature_templates?tags.name=${tag}` : `signature_templates`
        );
        return data?.["hydra:member"] || [];
    } catch (error) {
        return [];
    }
};

const Templates = ({ selectedTemplate, setSelectedTemplate, setStyles }) => {
    const [templates, setTemplates] = useState([]);
    const [tag, setTag] = useState(null);
    const [visibility, setVisibility] = useState(null);

    useEffect(() => {
        const loadTemplates = async () => {
            const fetchedTemplates = await fetchTemplates({ tag });
            setTemplates(fetchedTemplates);
        };

        loadTemplates();
    }, [tag]);

    return (
        <>
            <Tags
                selectedVisibility={visibility}
                setVisibility={setVisibility}
                selectedTag={tag}
                setTag={setTag}
            />
            <ul className={classes.templatesList}>
                {templates.length > 0
                    ? templates.map((template) => {
                          if (
                              !visibility ||
                              visibility === template.visibility ||
                              selectedTemplate?.id === template?.id
                          )
                              return (
                                  <li key={template.id}>
                                      <Template
                                          id={template.id}
                                          template={template}
                                          selectedTemplate={selectedTemplate}
                                          setSelectedTemplate={
                                              setSelectedTemplate
                                          }
                                          styles={template.signatureStyles}
                                          setDefaultStyles={setStyles}
                                      />
                                  </li>
                              );
                          return null;
                      })
                    : "Aucun template"}
            </ul>
        </>
    );
};

export { Templates };
