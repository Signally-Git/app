import { Button } from "components";
import classes from "./CopySignature.module.css";
import parse from "html-react-parser";
import React from "react";
import { useParams } from "react-router-dom";
<<<<<<<< HEAD:src/components/CopySignature/CopySignature.js
import request from "Utils/Request/request";
========
import { request } from "utils";
>>>>>>>> staging:src/views/CopySignature/CopySignature.jsx
import { FormattedMessage } from "react-intl";
const { ClipboardItem } = window;

export default function CopySignature() {
    const [btnText, setBtnText] = React.useState(
        <FormattedMessage id={"copy"} />
    );
    const [signature, setSignature] = React.useState(``);
    const { token } = useParams();

    React.useEffect(() => {
        async function getSignature() {
            await request
                .get(`/connect/token/check?token=${token}`)
                .then((res) => setSignature(res.data.compiledSignature));
        }
        getSignature();
    }, []);

    const handleCopy = async (e) => {
        e.preventDefault();
        var type = "text/html";
        var blob = new Blob([signature], { type });
        var data = [new ClipboardItem({ [type]: blob })];

        navigator.clipboard.write(data).then(
            function () {
                /* success */
                setBtnText(<FormattedMessage id={"signatureCopied"} />);
                setTimeout(() => {
                    setBtnText(<FormattedMessage id={"copy"} />);
                }, 2000);
            },
            function () {
                /* failure */
            }
        );
    };

    return (
        <>
            <div className={classes.container}>
<<<<<<<< HEAD:src/components/CopySignature/CopySignature.js
========
                <FormattedMessage id={"copySignature"} tagName="h2" />
>>>>>>>> staging:src/views/CopySignature/CopySignature.jsx
                <div contentEditable={true}>
                    {signature?.length > 0 && parse(signature)}
                </div>
                <Button
                    onClick={(e) => handleCopy(e)}
                    disabled={
                        btnText === <FormattedMessage id={"signatureCopied"} />
                    }
                    color={
                        btnText === <FormattedMessage id={"signatureCopied"} />
<<<<<<<< HEAD:src/components/CopySignature/CopySignature.js
                            ? "orangeFill"
                            : "orange"
========
                            ? "primaryFill"
                            : "primary"
>>>>>>>> staging:src/views/CopySignature/CopySignature.jsx
                    }
                >
                    {btnText}
                </Button>
            </div>
        </>
    );
}
