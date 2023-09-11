import React, { useEffect, useState } from "react";
import { Button, Input, Loading, Modal } from "components";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { request, useNotification } from "utils";
import { Menu } from "./Menu/Menu";
import SignaturePreviewContainer from "./SignaturePreview/SignaturePreviewContainer";
import CustomTab from "./Custom/CustomTab";
import classes from "./studio.module.css";

const Studio = () => {
    const { signatureId } = useParams();
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedTab, setSelectedTab] = useState("Templates");
    const [loading, setLoading] = useState(true);
    const [styles, setStyles] = useState([null]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [signatureName, setSignatureName] = useState("");
    const [forceUpdate, setForceUpdate] = useState(0);
    console.log(selectedTemplate);
    const notification = useNotification();

    const history = useHistory();

    const fetchSignature = () => {
        request.get(`signatures/${signatureId}`).then(({ data }) => {
            setSelectedTemplate(data.signatureTemplate);
        });
    };

    const handleSave = async () => {
        if (signatureId) console.log("edit");
        else
            await request
                .post(`signatures`, {
                    signatureTemplate: selectedTemplate["@id"],
                    name: signatureName || selectedTemplate.name,
                    html: "selectedTab.html",
                    organisation: selectedTemplate.owner,
                })
                .then(({ data }) => {
                    const updatedStyles = styles.map((style) => ({
                        ...style,
                        signature: data.id,
                    }));
                    request
                        .post("signature_styles/batch", updatedStyles)
                        .then(() => {
                            notification({
                                content: (
                                    <>
                                        Votre signature{" "}
                                        <span className={classes.primaryColor}>
                                            {signatureName}
                                        </span>{" "}
                                        a été créée avec succès
                                    </>
                                ),
                                status: "valid",
                            });
                            if (window.location.hash === "#onboarding")
                                history.goBack();
                            else history.push("/signatures");
                        })
                        .catch(() => {
                            notification({
                                content: (
                                    <>
                                        Erreur lors de la création de{" "}
                                        <span className={classes.primaryColor}>
                                            {signatureName}
                                        </span>{" "}
                                    </>
                                ),
                                status: "invalid",
                            });
                        });
                });
    };

    useEffect(() => {
        if (signatureId) fetchSignature();
        setLoading(false);
    }, []);

    if (loading) return <Loading />;
    return (
        <>
            <FormattedMessage id="signature.studio" tagName="h1" />
            <div className={classes.menuContainer}>
                <Menu
                    isTemplateSelected={!!selectedTemplate}
                    onTabSelect={setSelectedTab}
                />
                <Button
                    onClick={() => {
                        if (selectedTemplate) {
                            setForceUpdate((prev) => prev + 1);
                            setSelectedTemplate({ ...selectedTemplate });
                            setStyles(selectedTemplate.signatureStyles);
                        }
                    }}
                    disabled={!selectedTemplate}
                    color="primary"
                >
                    Reset
                </Button>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    disabled={!selectedTemplate}
                    color={
                        styles === selectedTemplate?.signatureStyles &&
                        signatureId
                            ? "primary"
                            : "primaryFill"
                    }
                >
                    Save
                </Button>
            </div>
            <div className={classes.studioContainer}>
                {isModalOpen && (
                    <Modal
                        className={classes.modalContainer}
                        title="Nom de la signature"
                        content={
                            <Input
                                type="text"
                                value={signatureName}
                                onChange={(e) =>
                                    setSignatureName(e.target.value)
                                }
                                placeholder="Saisissez le nom de la signature"
                            />
                        }
                        cancel="Annuler"
                        validate="Save"
                        onCancel={() => setIsModalOpen(false)}
                        onConfirm={() => {
                            handleSave();
                            setIsModalOpen(false);
                        }}
                    />
                )}
                <div>
                    <CustomTab
                        key={forceUpdate}
                        tab={selectedTab}
                        template={selectedTemplate}
                        setTemplate={setSelectedTemplate}
                        styles={styles}
                        setStyles={setStyles}
                    />
                </div>
                <div>
                    <SignaturePreviewContainer
                        template={selectedTemplate}
                        styles={styles}
                    />
                </div>
            </div>
        </>
    );
};

export default Studio;
