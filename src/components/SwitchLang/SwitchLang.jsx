import { CustomSelect } from "components";
import { useContext, useEffect, useState, useRef } from "react";
import { LangContext } from "contexts/LangContext";
import { request } from "utils";

function SwitchLang({ setUserLanguage }) {
    const { locale, setLocale } = useContext(LangContext);
    const [languages, setLanguages] = useState([]);
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            // Lorsque le composant est démonté, mettez la référence à false
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        const getLanguages = async () => {
            try {
                const response = await request.get("langs");
                if (isMountedRef.current) {
                    setLanguages(response.data["hydra:member"]);
                }
            } catch (error) {
                // Gérer les erreurs de requête ici
            }
        };
        getLanguages();
    }, []);

    function handleSwitch(selectedLang) {
        setLocale(selectedLang);
        if (setUserLanguage)
            setUserLanguage(
                languages.find((lang) => lang.locale === selectedLang)?.["@id"]
            );
    }

    return (
        <CustomSelect
            getValue="locale"
            display="name"
            defaultValue={locale}
            styleList={{ maxHeight: "10rem" }}
            items={languages}
            onChange={(value) => handleSwitch(value)}
        />
    );
}

export default SwitchLang;
