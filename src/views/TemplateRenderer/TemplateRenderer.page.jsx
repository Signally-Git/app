import { Input, Button } from "components";
import classes from "./TemplateRenderer.module.scss";
import renderTemplate from "./TemplateRenderer.utils";
import parse from "html-react-parser";
import { defaultStyles } from "./TemplateRenderer.const";
import { useState } from "react";
import { request } from "utils";

function TemplateRenderer() {
    const [twig, setTwig] = useState();
    const [styles, setStyles] = useState(defaultStyles);
    const [preview, setPreview] = useState("");
    const [stylesInput, setStylesInput] = useState(defaultStyles);

    const handlePreview = async () => {
        if (twig?.length > 0) {
            setStyles(stylesInput);
            const preview = await renderTemplate(twig, styles);
            setPreview(preview);
        }
    };

    const handlePublish = async () => {
        if (twig?.length > 0) {
            request.post("signature_templates", {
                name: "Médiation & résolution",
                reference: "mediationresolution",
                html: twig,
            });
        }
    };

    const handleAddInput = () => {
        let newArray = stylesInput;
        newArray.push({ property: "", value: "", type: "" });
        setStylesInput([...newArray]);
    };

    const handleRemoveInput = (index) => {
        let newArray = stylesInput;
        newArray.splice(index, 1);
        setStylesInput([...newArray]);
    };

    const handleStyles = () => {
        return stylesInput.map((input, index) => {
            let copyInput = input;
            return (
                <li key={index}>
                    <Input
                        onChange={(e) => {
                            setStylesInput([
                                ...stylesInput,
                                (stylesInput[index] = [
                                    ...copyInput,
                                    (copyInput["property"] = e.target.value),
                                ]),
                            ]);
                        }}
                        placeholder="Propriété"
                        value={input["property"]}
                        title="enabled, color, fontSize, fontFamily..."
                        type="text"
                    />
                    <Input
                        onChange={(e) => {
                            copyInput["value"] = e.target.value;
                        }}
                        placeholder="Valeur"
                        value={input["value"]}
                        title="true|false, #FFF000, '12px', 'Arial'..."
                        type="text"
                    />
                    <Input
                        onChange={(e) => {
                            copyInput["type"] = e.target.value;
                        }}
                        placeholder="Type"
                        value={input["type"]}
                        title="event, generalFontColor, generalFontSize, generalFontFamily..."
                        type="text"
                    />
                    <button
                        disabled={stylesInput.length === 1}
                        onClick={() => handleRemoveInput(index)}
                    >
                        -
                    </button>
                    {index === stylesInput.length - 1 && (
                        <button onClick={() => handleAddInput()}>+</button>
                    )}
                </li>
            );
        });
    };

    return (
        <div className={classes.container}>
            <div className={classes.previewContainer}>{parse(preview)}</div>
            <div className={classes.editContainer}>
                <h1>Création de template</h1>
                <div>
                    <Input
                        placeholder={`<div>\n\t<p>Nom</p>\n\t<p>Prénom</p>\n</div`}
                        onChange={(e) => setTwig(e.target.value)}
                        type="textarea"
                    />
                    <Button onClick={() => handlePreview()}>Preview</Button>
                    <Button onClick={() => handlePublish()}>Publish</Button>
                </div>
                <ul>{handleStyles()}</ul>
            </div>
        </div>
    );
}

export default TemplateRenderer;
