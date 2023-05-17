import request from "../../Utils/Request/request";

function renderTemplate(twig, styles) {
    console.log(twig);
    return request
        .post("signature_compile", { twig, styles })
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
}

export default renderTemplate;
