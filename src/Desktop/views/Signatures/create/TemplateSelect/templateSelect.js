import classes from "./templateSelect.module.css";
import { useState, useEffect } from "react";
import Button from "Utils/Button/btn";
import Template from "../Preview/customizablePreview";
import request from "Utils/Request/request";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getStyles } from "../createSignature.utils";

// Displaying the list of bought and free templates (Studio, Store) and allows to select one to create custom signature

export default function TemplateSelection({ setTemplate, showFunction, signatureOption, signatureInfo, company, user }) {
    const [fetching, setFetching] = useState(true);
    const [templatesList, setTemplatesList] = useState([]);
    const [visibility, setVisibility] = useState("");

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
                <h1>Choisissez votre modèle de signature</h1>
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
                        <label htmlFor="PUBLIC">Public</label>
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
                        <label htmlFor="PRIVATE">Privé</label>
                    </div>
                </form>
            </div>
            {!templatesList || templatesList.length === 0 ? (
                <span>
                    Aucun modèle disponible. Veuillez contacter votre
                    administrateur Signally.
                </span>
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
                                            styles={getStyles(signatureInfo, signatureOption, company, user)}
                                        />
                                    </li>
                                );
                            return <></>;
                        })}
                    </ul>
                    <div className={classes.btnContainer}>
                        <Button
                            color="orange"
                            width={"5rem"}
                            onClick={(e) => {
                                e.preventDefault();
                                showFunction(false, "smooth");
                            }}
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
