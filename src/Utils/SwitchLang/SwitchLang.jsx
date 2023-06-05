import CustomSelect from "Utils/CustomSelect/customselect";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "contexts/LangContext";
import request from "Utils/Request/request";

export function SwitchLang({ setUserLanguage }) {
    const { locale, setLocale } = useContext(LangContext);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const getLanguages = async () => {
            request.get("langs").then(({ data }) => {
                setLanguages(data["hydra:member"]);
            });
        };
        getLanguages();
    }, []);

    function handleSwitch(selectedLang) {
        setLocale(selectedLang);
        if (setUserLanguage)
            setUserLanguage(
                languages.find((lang) => lang.isoCode === selectedLang)?.["@id"]
            );
    }

    return (
        <CustomSelect
            getValue="isoCode"
            display="name"
            defaultValue={locale}
            styleList={{ maxHeight: "10rem" }}
            items={languages}
            onChange={(value) => handleSwitch(value)}
        />
    );
}
