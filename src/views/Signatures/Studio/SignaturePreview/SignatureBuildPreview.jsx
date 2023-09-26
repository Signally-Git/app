import React, { useEffect, useRef, useState } from "react";
import { request } from "utils";
import parse from "html-react-parser";
import { Loading } from "components";

const SignatureBuildPreview = ({ id, styles }) => {
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const debounceTimeoutRef = useRef(null); // Référence pour stocker le timeout

    useEffect(() => {
        if (!id || !styles) {
            return;
        }

        const callPreviewAPI = async () => {
            try {
                setLoading(true);
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

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(callPreviewAPI, 300);

        return () => {
            clearTimeout(debounceTimeoutRef.current);
        };
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
