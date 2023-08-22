import { useEffect, useState } from "react";
import { Loading } from "components";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { request } from "utils";
import { Menu } from "./Menu/Menu";
import SignaturePreviewContainer from "./SignaturePreview/SignaturePreviewContainer";
import CustomTab from "./Custom/CustomTab";
import classes from "./studio.module.css";

const Studio = () => {
    const { signatureId } = useParams();
    const [selectedTab, setSelectedTab] = useState("Templates");
    const [loading, setLoading] = useState(true);

    const fetchSignature = () => {
        request.get(`signatures/${signatureId}`).then(({ data }) => {});
    };

    useEffect(() => {
        if (signatureId) fetchSignature();
        setLoading(false);
    }, []);

    if (loading) return <Loading />;
    return (
        <>
            <FormattedMessage id="signature.studio" tagName="h1" />
            <Menu onTabSelect={setSelectedTab} />
            <div className={classes.studioContainer}>
                <div>
                    <CustomTab tab={selectedTab} />
                </div>
                <div>
                    <SignaturePreviewContainer />
                </div>
            </div>
        </>
    );
};

export default Studio;
