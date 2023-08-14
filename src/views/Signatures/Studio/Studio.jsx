import { useEffect, useState } from "react";
import { Loading } from "components";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { request } from "utils";
import { Menu } from "./Menu/Menu";
import SignaturePreview from "./SignaturePreview/SignaturePreview";
import Custom from "./Custom/Custom";

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
            <div>
                <div>
                    <Menu onTabSelect={setSelectedTab} />
                    <Custom tab={selectedTab} />
                </div>
                <div>
                    <SignaturePreview />
                </div>
            </div>
        </>
    );
};

export default Studio;
