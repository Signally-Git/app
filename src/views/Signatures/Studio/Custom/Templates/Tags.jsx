import { request } from "utils";
import { useEffect, useState } from "react";
import classes from "./templates.module.css";
import { Button } from "components";

const fetchTags = async () => {
    try {
        const { data } = await request.get(`tags`);
        return data?.["hydra:member"] || [];
    } catch (error) {
        return [];
    }
};

const Tags = ({ selectedVisibility, setVisibility, selectedTag, setTag }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const loadTemplates = async () => {
            const fetchedTags = await fetchTags();
            setTags(fetchedTags);
        };

        loadTemplates();
    }, []);

    return (
        <>
            <ul className={classes.visibilityList}>
                <li>
                    <Button
                        onClick={() => setVisibility("PRIVATE")}
                        color={`${
                            selectedVisibility === "PRIVATE"
                                ? "primaryFill"
                                : "primary"
                        }`}
                    >
                        Private
                    </Button>
                </li>
                <li>
                    <Button
                        onClick={() => setVisibility("PUBLIC")}
                        color={`${
                            selectedVisibility === "PUBLIC"
                                ? "primaryFill"
                                : "primary"
                        }`}
                    >
                        Public
                    </Button>
                </li>
                <li>
                    <Button
                        onClick={() => setVisibility(null)}
                        color="primaryLink"
                    >
                        Reset
                    </Button>
                </li>
            </ul>
            {tags.length > 0 && (
                <ul className={classes.tagsList}>
                    {tags.map((tag) => (
                        <li key={tag.id}>
                            <Button
                                onClick={() => setTag(tag.name)}
                                color={`${
                                    selectedTag === tag.name
                                        ? "primaryFill"
                                        : "primary"
                                }`}
                            >
                                {tag.name}
                            </Button>
                        </li>
                    ))}
                    <li>
                        <Button
                            onClick={() => setTag(null)}
                            color="primaryLink"
                        >
                            Reset
                        </Button>
                    </li>
                </ul>
            )}
        </>
    );
};

export { Tags };
