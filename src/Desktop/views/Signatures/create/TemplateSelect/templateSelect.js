import classes from "./templateSelect.module.css";
import { useState, useEffect } from "react";
import Button from "Utils/Button/btn";
import Template from "../Preview/customizablePreview";
import request from "Utils/Request/request";
import { TokenService } from "Utils/index";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Displaying the list of bought and free templates (Studio, Store) and allows to select one to create custom signature

export default function TemplateSelection(props) {
    // const [orientation, setOrientation] = useState("Horizontal");
    const [fetching, setFetching] = useState(true);
    // const [tag, setTag] = useState(true);
    const [templatesList, setTemplatesList] = useState([]);

    const handleForm = (e) => {
        props.setTemplate(JSON.parse(e.target.value));
    };

    // const handleAlignment = (e) => {
    //     setOrientation(e.target.id);
    // };
    // const handleStudio = (e) => {
    //     setTag(e.target.checked);
    // };

    useEffect(() => {
        request.get('signature_templates').then(({data}) => {
            setTemplatesList(data['hydra:member']);
            console.log(templatesList)
            setFetching(false);
        });
        // request.get('signature_templates').then(({ data }) => console.log(data))
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
                {/*<div className={classes.tagsContainer}>*/}
                {/*	<form onChange={handleStudio}>*/}
                {/*		<ul className={classes.studioStore}>*/}
                {/*			<li*/}
                {/*				className={`${classes.studio} ${tag ? classes.activeStudio : ""*/}
                {/*					}`}*/}
                {/*			>*/}
                {/*				<input*/}
                {/*					type="checkbox"*/}
                {/*					defaultChecked={tag}*/}
                {/*					id="studio"*/}
                {/*				/>*/}
                {/*				My Studio*/}
                {/*			</li>*/}
                {/*			<li className={classes.store}>My Store</li>*/}
                {/*		</ul>*/}
                {/*	</form>*/}
                {/*	<div className={classes.otherTagsContainer}>*/}
                {/*		<ul className={classes.otherTags}>*/}
                {/*			<li>Classique</li>*/}
                {/*			<li>Élegant</li>*/}
                {/*			<li>Créatif</li>*/}
                {/*		</ul>*/}
                {/*	</div>*/}
                {/*</div>*/}
                {/*<div className={classes.orientationContainer}>*/}
                {/*	<form onChange={handleAlignment}>*/}
                {/*		<label*/}
                {/*			className={classes.radioCtr}*/}
                {/*			htmlFor="horizontal"*/}
                {/*		>*/}
                {/*			Horizontal*/}
                {/*			<input*/}
                {/*				type="radio"*/}
                {/*				defaultChecked={true}*/}
                {/*				id="horizontal"*/}
                {/*				name="orientation"*/}
                {/*			/>*/}
                {/*			<span className={classes.checkmark}></span>*/}
                {/*		</label>*/}
                {/*		<label*/}
                {/*			className={classes.radioCtr}*/}
                {/*			htmlFor="panoramique"*/}
                {/*		>*/}
                {/*			Panoramique*/}
                {/*			<input*/}
                {/*				type="radio"*/}
                {/*				id="panoramique"*/}
                {/*				name="orientation"*/}
                {/*			/>*/}
                {/*			<span className={classes.checkmark}></span>*/}
                {/*		</label>*/}
                {/*		<label className={classes.radioCtr} htmlFor="vertical">*/}
                {/*			Vertical*/}
                {/*			<input*/}
                {/*				type="radio"*/}
                {/*				id="vertical"*/}
                {/*				name="orientation"*/}
                {/*			/>*/}
                {/*			<span className={classes.checkmark}></span>*/}
                {/*		</label>*/}
                {/*	</form>*/}
                {/*</div>*/}
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
                                        options={{
                                            event: { enabled: true },
                                        }}
                                        template={template.html}
                                        socials={props.icons}
                                        organisation={TokenService.getOrganisation()}
                                        user={JSON.parse(
                                            localStorage.getItem("user")
                                        )}
                                    />
                                </li>
                            );
                        })}
                        {/*{!tag ? (*/}
                        {/*    <li*/}
                        {/*        style={{ width: "412px", height: "220px" }}*/}
                        {/*    ></li>*/}
                        {/*) : (*/}
                        {/*    ""*/}
                        {/*)}*/}
                    </ul>
                    <div className={classes.btnContainer}>
                        <Button
                            color="orange"
                            width={"5rem"}
                            onClick={(e) => {
                                e.preventDefault();
                                props.showFunction(false, "smooth");
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
