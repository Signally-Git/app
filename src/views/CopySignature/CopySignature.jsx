import classes from "./CopySignature.module.css";
import parse from "html-react-parser";
import React from "react";
import { useParams } from "react-router-dom";
import { request } from "utils";
import { FormattedMessage } from "react-intl";
import { CopyButton } from "components";

export default function CopySignature() {
    const [signature, setSignature] = React.useState(null);
    const { token } = useParams();

    React.useEffect(() => {
        async function getSignature() {
            await request
                .get(`/connect/token/check?token=${token}`)
                .then((res) => setSignature(res.data.compiledSignature));
        }

        getSignature();
    }, []);

    return (
        <>
            <div className={classes.container}>
                <FormattedMessage id={"copySignature"} tagName="h2" />
                <div className={classes.signature}>
                    {signature?.length > 0 && parse(signature)}
                </div>
                <CopyButton signature={signature} />
            </div>
        </>
    );
}
