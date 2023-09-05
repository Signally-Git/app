import React, { useEffect, useState } from "react";
import { Button, Loading } from "components";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { request } from "utils";
import { Menu } from "./Menu/Menu";
import SignaturePreviewContainer from "./SignaturePreview/SignaturePreviewContainer";
import CustomTab from "./Custom/CustomTab";
import classes from "./studio.module.css";
import CustomConsole from "dev/CustomConsole";

const Studio = () => {
    const { signatureId } = useParams();
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedTab, setSelectedTab] = useState("Templates");
    const [loading, setLoading] = useState(true);
    const [styles, setStyles] = useState([null]);
    const [forceUpdate, setForceUpdate] = useState(0);

    const fetchSignature = () => {
        request.get(`signatures/${signatureId}`).then(({ data }) => {
            setSelectedTemplate(data.signatureTemplate);
        });
    };

    // const handleSave = async () => {
    //     if (signatureId) console.log("edit");
    //     else
    //         await request
    //             .post(`signatures`, { styles })
    //             .then(({ data }) => console.log(data));
    // };

    useEffect(() => {
        if (signatureId) fetchSignature();
        setLoading(false);
    }, []);
    // console.log(selectedTemplate?.signatureStyles);
    if (loading) return <Loading />;
    return (
        <>
            <FormattedMessage id="signature.studio" tagName="h1" />
            <div className={classes.menuContainer}>
                <Menu onTabSelect={setSelectedTab} />
                <Button
                    onClick={() => {
                        if (selectedTemplate) {
                            setForceUpdate((prev) => prev + 1);
                            setSelectedTemplate({ ...selectedTemplate });
                            setStyles(selectedTemplate.signatureStyles);
                        }
                    }}
                    color="primary"
                >
                    Reset
                </Button>
                <Button
                    onClick={() => console.log(styles)}
                    color={`${
                        (styles === selectedTemplate?.signatureStyles ||
                            !selectedTemplate) &&
                        signatureId
                            ? "primary"
                            : "primaryFill"
                    }`}
                >
                    Save
                </Button>
            </div>
            <div className={classes.studioContainer}>
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
                    <CustomConsole />
                </div>
            </div>
        </>
    );
};

export default Studio;
