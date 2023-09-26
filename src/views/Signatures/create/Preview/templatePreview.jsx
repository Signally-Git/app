import React, { useEffect, useState } from "react";
import { request } from "utils";
import parse from "html-react-parser";

export default function TemplatePreview({ id, styles }) {
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        const getPreview = async () => {
            if (id && styles)
                return await request
                    .post(`compile_for_template/${id}`, { styles })
                    .then((res) => {
                        return res.data;
                    })
                    .catch((err) => console.log(err));
        };
        getPreview().then((result) => result && setPreview(result));
    }, [id, styles]);
    if (preview) return parse(preview);
    return <></>;
}
