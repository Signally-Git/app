import React, { useEffect, useState } from "react";
import { request } from "utils";
import parse from "html-react-parser";
import { Loading } from "components";

const SignatureBuildPreview = ({ id, styles }) => {
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPreview = async () => {
            if (!id || !styles) {
                return;
            }

            try {
                const response = await request.post(
                    "compile_for_create_signature/" + id,
                    { styles }
                );
                setPreview(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getPreview();
    }, [id, styles]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (preview) {
        return parse(preview);
    }

    return <></>;
};

export { SignatureBuildPreview };
