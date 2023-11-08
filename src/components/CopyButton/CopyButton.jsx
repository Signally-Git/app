import { FormattedMessage } from "react-intl";
import React, { useState } from "react";
import { Button } from "components/index";

const CopyButton = ({ signature }) => {
    const [btnText, setBtnText] = useState(<FormattedMessage id={"copy"} />);
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
        </>
    );
};

export default CopyButton;
