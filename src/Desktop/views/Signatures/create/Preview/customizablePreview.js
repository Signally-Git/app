import React, { useEffect, useState } from "react";
import request from "Utils/Request/request";
import parse from "html-react-parser";

export default function Preview({
    twig,
    styles,
}) {
    const [preview, setPreview] = useState(null)
    useEffect(() => {
        const getPreview = async () => {
            return await request
                .post("signature_compile", { twig, styles })
                .then((res) => {
                    return res.data;
                })
                .catch((err) => console.log(err));
        }
        getPreview().then(result => setPreview(result))
    }, [twig, styles])
    if (preview)
    return parse(preview)
    return <></>
}
