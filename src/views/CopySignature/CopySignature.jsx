import { Button } from "components";
import classes from "./CopySignature.module.css";
import parse from "html-react-parser";
import React from "react";
import { useParams } from "react-router-dom";
import { request } from "utils";
import { FormattedMessage } from "react-intl";

export default function CopySignature() {
    const [btnText, setBtnText] = React.useState(
        <FormattedMessage id={"copy"} />
    );
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

    const handleCopy = (e) => {
        e.preventDefault();

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = signature;
        tempDiv.style.position = "absolute";
        tempDiv.style.left = "-9999px";
        tempDiv.style.backgroundColor = "transparent"; // Réinitialisation du fond
        document.body.appendChild(tempDiv);

        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(tempDiv);
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand("copy");
        document.body.removeChild(tempDiv);

        /* success */
        setBtnText(<FormattedMessage id={"signatureCopied"} />);
        setTimeout(() => {
            setBtnText(<FormattedMessage id={"copy"} />);
        }, 2000);
    };

    return (
        <>
            <div className={classes.container}>
                <FormattedMessage id={"copySignature"} tagName="h2" />
                <div className={classes.signature}>
                    {signature?.length > 0 && parse(signature)}
                </div>
                <Button
                    onClick={(e) => handleCopy(e)}
                    disabled={
                        btnText === <FormattedMessage id={"signatureCopied"} />
                    }
                    color={
                        btnText === <FormattedMessage id={"signatureCopied"} />
                            ? "primaryFill"
                            : "primary"
                    }
                >
                    {btnText}
                </Button>
            </div>
        </>
    );
}
