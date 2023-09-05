import React, { useEffect, useState } from "react";
import { request } from "utils";
import parse from "html-react-parser";
import { Loading } from "components";
import classes from "./templates.module.css";

const Template = ({
    id,
    styles,
    template,
    selectedTemplate,
    setSelectedTemplate,
    setDefaultStyles,
}) => {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOnChange = () => {
        setSelectedTemplate(template);
        setDefaultStyles(template.signatureStyles);
    };

    useEffect(() => {
        const getPreview = async () => {
            if (!id || !styles) return;
            setLoading(true);
            try {
                const response = await request.post(
                    `compile_for_template/${id}`,
                    { styles }
                );
                setPreview(response.data);
            } catch ({ response }) {
                setError(response.data.detail);
            } finally {
                setLoading(false);
            }
        };

        getPreview();
    }, [id, styles]);

    if (loading) return <Loading />;
    if (preview)
        return (
            <>
                <span className={classes.templateName}>{template.name}</span>
                <div className={classes.template}>
                    <input
                        checked={
                            selectedTemplate &&
                            selectedTemplate["@id"] === template["@id"]
                        }
                        onChange={handleOnChange}
                        id={template.id}
                        type="radio"
                        name="template"
                    />
                    <div className={classes.selectedTemplate}></div>
                    {preview && parse(preview)}
                </div>
            </>
        );
    return null;
};

export { Template };
