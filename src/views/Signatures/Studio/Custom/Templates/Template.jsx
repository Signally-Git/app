import React, { useEffect, useState } from "react";
import { request } from "utils";
import parse from "html-react-parser";
import { Loading } from "components";

const Template = ({ id, styles }) => {
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPreview = async () => {
            if (!id || !styles) return;
            setLoading(true);
            try {
                const response = await request.post(
                    `compile_for_template/${id}`,
                    { styles }
                );
                setPreview(response.data);
            } catch (err) {
                console.error("Error fetching preview:", err);
            } finally {
                setLoading(false);
            }
        };

        getPreview();
    }, [id, styles]);

    if (loading) return <Loading />;
    if (preview) return parse(preview);
    return null;
};

export { Template };
