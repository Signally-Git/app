import React, { useEffect, useState } from "react";
import { request } from "utils";
import parse from "html-react-parser";

export default function Preview({ id, styles }) {
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        const getPreview = async () => {
            if (id && styles)
                return await request
                    .post("compile_for_create_signature/" + id, { styles })
                    .then((res) => {
                        return res.data;
                    })
                    .catch();
        };
        getPreview().then((result) => result && setPreview(result));
    }, [id, styles]);
    if (preview) return parse(preview);
    return <></>;
}
