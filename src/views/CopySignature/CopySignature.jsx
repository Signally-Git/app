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
    const [signature, setSignature] =
        React.useState(`<table width="380" cellpadding="0" cellspacing="0" border="0" style="padding: 0px; margin: 0px;"><tbody><tr><td colspan="1" rowspan="1" style="padding: 0px; margin: 0px;">
            <table cellpadding="0" cellspacing="0" border="0" style="padding: 0px; margin: 0px;"><tbody><tr><td valign="top" colspan="1" rowspan="1" style="padding: 0px; margin: 0px;">
                        <a target="_blank" rel="noopener" title="Signally" href="https://www.signally.io">
                            <img width="80" alt="Signally" src="https://s3.eu-west-3.amazonaws.com/files.signally.io/1ed3a7f3-a7e6-6822-9584-6b778f04e7bb/SIGNALLY-DEF-LOGO-SIGNATURE-64ad508bb48386.25587155.png" style="width: 80px;">
                        </a>
                    </td><td width="8" colspan="1" rowspan="1" style="padding: 0px; margin: 0px;"></td><td colspan="1" rowspan="1" style="padding: 0px; margin: 0px;">
                        <table cellpadding="0" cellspacing="0" border="0" style="padding: 0px; margin: 0px; width: 100%;"><tbody><tr><td colspan="1" rowspan="1" style="padding: 0px; margin: 0px;">
                                    <table cellpadding="0" cellspacing="0" border="0" style="padding: 0px; margin: 0px; width: 100%;"><tbody><tr><td valign="middle" colspan="1" rowspan="1" style="padding: 0px; margin: 0px;">
                                                    <b style="color: rgb(0, 0, 0); text-decoration: none; font-style: normal; font-weight: bold; font-family: Arial; font-size: calc(15px);">
                                                        CHARLES-ANTOINE
                                                    </b>
                                                    <b style="color: rgb(0, 0, 0); text-decoration: none; font-style: normal; font-weight: bold; font-family: Arial; font-size: calc(15px);">
                                                        ALBA
                                                    </b>
                                                                                                            <br>
                                                        <b style="color: rgb(0, 0, 0); text-decoration: none; font-style: normal; font-weight: normal; font-family: Arial; font-size: 10px;">
                                                            Développeur Front-End
                                                        </b>
                                                                                                    </td><td width="20" valign="middle" colspan="1" rowspan="1" style="padding: 0px; margin: 0px;"></td><td width="28" valign="top" colspan="1" rowspan="1" style="padding: 0px; margin: 0px;">
                                                        <a target="_blank" rel="noopener" href="https://api.signally.io/user/token/96de661b7346dd5e92b07c07a764702c9ba36e385eecd1e5011407ebc74e14a3/vcard">
                                                            <img height="28" alt="Charles-Antoine Alba" src="https://files.signally.io/vcard/V-Card.png">
                                                        </a>
                                                    </td></tr></tbody></table>
                                </td></tr><tr><td valign="middle" colspan="1" rowspan="1" style="padding: 0px; margin: 0px;">
                                        <span style="color: rgb(0, 0, 0); text-decoration: none; font-style: normal; font-weight: normal; font-family: Arial; font-size: 10px;">
                                                                                            1 rue de la pompe,
                                                <br>
                                                                                                                                        Paris
                                                                                                                                        75116
                                                                                                                                        France
                                                                                    </span>
                                    </td></tr><tr><td valign="middle" colspan="1" rowspan="1" style="padding: 0px; margin: 0px;">
                                        <a href="mailto:poro@signally.io" style="color: rgb(0, 0, 0); text-decoration: none; font-style: normal; font-weight: normal; font-family: Arial; font-size: 10px;">
                                            poro@signally.io
                                        
                                    </a></td></tr><tr><td valign="middle" colspan="1" rowspan="1" style="padding: 0px; margin: 0px;">
                                        <a href="tel:+33 6 07 16 70 36" style="color: rgb(0, 0, 0); text-decoration: none; font-style: normal; font-weight: normal; font-size: 10px;">
                                            +33 6 07 16 70 36
                                        
                                    </a></td></tr><tr><td valign="middle" colspan="1" rowspan="1" style="padding: 0px; margin: 0px;">
                                        <a target="_blank" rel="noopener" title="Signally" href="https://www.signally.io" style="color: rgb(0, 0, 0); font-family: Arial; font-size: 10px;">
                                            www.signally.io
                                        </a>
                                    </td></tr></tbody></table>
                    </td></tr></tbody></table>
        </td></tr><tr><td height="34" valign="middle" colspan="1" rowspan="1" style="padding: 0px; margin: 0px;"></td></tr><tr><td colspan="1" rowspan="1" style="border: medium;">
                    <a target="_blank" href="https://api.signally.io/event/token/96de661b7346dd5e92b07c07a764702c9ba36e385eecd1e5011407ebc74e14a3/link">
                        <img width="380" src="https://api.signally.io/event/token/96de661b7346dd5e92b07c07a764702c9ba36e385eecd1e5011407ebc74e14a3/image?version=307890" alt="Signally Jun 23" style="width: 380px;">
                    </a>
                </td></tr></tbody></table>`);
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
