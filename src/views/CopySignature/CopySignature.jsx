import classes from "./CopySignature.module.css";
import parse from "html-react-parser";
import React from "react";
import { useParams } from "react-router-dom";
import { request } from "utils";
import { FormattedMessage } from "react-intl";
import { CopyButton, SwitchLang } from "components";

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
                <div>
                    <FormattedMessage id={"copySignature"} tagName="h2" />
                    <CopyButton signature={signature} />
                </div>
                <div className={classes.signature}>
                    {signature?.length > 0 && parse(signature)}
                </div>
                <iframe width="360" height="202" src="https://www.youtube.com/embed/vHsJ-4CabrM?si=VgHaIflp9Vqb5RFJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <div className={classes.langContainer}>
                    
                <SwitchLang />
                </div>
            </div>
        </>
    );
}
