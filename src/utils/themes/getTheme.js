import axios from "axios";
export async function getTheme(url) {
    let result;
    await axios
        .get(`${process.env["REACT_APP_API_URL"]}/instances?url=${url}`)
        .then((res) => {
            const data = res.data["hydra:member"][0].theme;
            result = data;
        })
        .catch((error) =>
            console.error(
                "Erreur lors de la récupération des couleurs :",
                error
            )
        );
    return result;
}
