import classes from "./templateSelect.module.css";
import { useState, useEffect } from "react";
import { Button } from "components";
import Template from "../Preview/customizablePreview";
import { request } from "utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getStyles } from "../createSignature.utils";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

// Displaying the list of bought and free templates (Studio, Store) and allows to select one to create custom signature

export default function TemplateSelection({
    template,
    setTemplate,
    showFunction,
    signatureOption,
    signatureInfo,
    company,
    user,
}) {
    const [fetching, setFetching] = useState(true);
    const [templatesList, setTemplatesList] = useState([]);
    const [visibility, setVisibility] = useState("");
    const history = useHistory();

    const handleFilterChange = (e) => {
        setVisibility(e.target.id);
    };

    const handleFilterUntick = (e) => {
        if (e.target.id === visibility) setVisibility("");
    };
    const handleForm = (e) => {
        setTemplate(JSON.parse(e.target.value));
    };

    useEffect(() => {
        request.get("signature_templates").then(({ data }) => {
            setTemplatesList(data["hydra:member"]);
            setFetching(false);
        });
    }, []);

    if (fetching)
        return (
            <div className={classes.modal}>
                <AiOutlineLoading3Quarters className={classes.loading} />
            </div>
        );
    return (
        <div className={classes.modal}>
            <div className={classes.searchContainer}>
                <FormattedMessage
                    id="signature.template_select.title"
                    tagName="h1"
                />
                <form onChange={handleFilterChange} className={classes.filters}>
                    <div className={classes.filter}>
                        <input
                            hidden
                            checked={visibility === "PUBLIC"}
                            onClick={handleFilterUntick}
                            id="PUBLIC"
                            type="radio"
                            name="visibility"
                        />
                        <label htmlFor="PUBLIC">
                            <FormattedMessage id="signature.template_select.public" />
                        </label>
                    </div>
                    <div className={classes.filter}>
                        <input
                            hidden
                            checked={visibility === "PRIVATE"}
                            onClick={handleFilterUntick}
                            id="PRIVATE"
                            type="radio"
                            name="visibility"
                        />
                        <label htmlFor="PRIVATE">
                            <FormattedMessage id="signature.template_select.private" />
                        </label>
                    </div>
                </form>
            </div>
            {!templatesList || templatesList.length === 0 ? (
                <FormattedMessage
                    id="signature.template_select.no_template"
                    tagName="span"
                />
            ) : (
                <form onChange={handleForm}>
                    <ul className={classes.templatesContainer}>
                        {templatesList?.map((template) => {
                            if (
                                !visibility ||
                                visibility === template.visibility
                            )
                                return (
                                    <li key={template.id}>
                                        <p className={classes.templateName}>
                                            {template.name}
                                        </p>
                                        <input
                                            readOnly
                                            type="radio"
                                            name="template"
                                            value={JSON.stringify(template)}
                                        />
                                        <Template
                                            twig={template.html}
                                            styles={getStyles(
                                                signatureInfo,
                                                signatureOption,
                                                company,
                                                user
                                            )}
                                        />
                                    </li>
                                );
                            return <></>;
                        })}
                    </ul>
                    <div className={classes.btnContainer}>
                        <Button
                            color="primary"
                            width={"5rem"}
                            onClick={(e) => {
                                e.preventDefault();
                                template
                                    ? showFunction(false, "smooth")
                                    : history.goBack();
                            }}
                        >
                            <FormattedMessage id="buttons.placeholder.cancel" />
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
