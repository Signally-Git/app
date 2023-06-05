import Button from "Utils/Button/btn";
import classes from "./CopySignature.module.css";
import parse from "html-react-parser";
import React from "react";
import { useParams } from "react-router-dom";
import request from "Utils/Request/request";
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
