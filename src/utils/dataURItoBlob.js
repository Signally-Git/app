// Fonction utilitaire pour convertir les données base64 en objet Blob
export function dataURItoBlob(dataURI) {
    console.log(dataURI);
    if (!dataURI || typeof dataURI !== "string") {
        throw new Error("Invalid dataURI provided.");
    }

    const parts = dataURI.split(",");

    if (parts.length < 2) {
        throw new Error("Invalid dataURI format.");
    }

    const byteString = atob(parts[1]);

    const mimeParts = parts[0].split(":");
    if (mimeParts.length < 2) {
        throw new Error("Invalid mime type in dataURI.");
    }

    const mimeString = mimeParts[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
