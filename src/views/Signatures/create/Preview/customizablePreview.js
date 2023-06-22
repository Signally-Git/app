import React, { useEffect, useState } from "react";
import { request } from "utils";
import parse from "html-react-parser";

export default function Preview({ twig, styles }) {
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        const getPreview = async () => {
            if (twig && styles)
                return await request
                    .post("signature_compile", { twig, styles })
                    .then((res) => {
                        return res.data;
                    })
                    .catch();
        };
        getPreview().then((result) => result && setPreview(result));
    }, [twig, styles]);
    if (preview) return parse(preview);
    return <></>;
}
