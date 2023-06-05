import { useState } from "react";
import classes from "./imgUpload.module.css";
import { IoMdClose } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import axios from "axios";
import Button from "Utils/Button/btn";
import { CustomCheckbox, TokenService } from "Utils";

// Custom functions
// First one converts SVG HTML code to PNG image
// Second one takes an image, stores it on the servers and saves URL to the clipboard

function ImgUploader() {
    const [imgName, setImgName] = useState("");
    const [path, setPath] = useState({
        path: "Cliquez ici pour copier le lien de l'image",
    });
    const [isForProduction, setIsForProduction] = useState(false);
    const [message, setMessage] = useState("");
    const [width, setWidth] = useState(108);
    const [height, setHeight] = useState(108);
    const token = TokenService.getLocalToken();

    // SVG TO PNG
    const [svgData, setSvgData] = useState();
    const convertSvg = async (svg) => {
        await axios({
            url: `https://svgtopng.signally.io/convert?height=${height}&width=${width}`,
            method: "POST",
            data: svg,
            responseType: "blob", // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "file.png");
            document.body.appendChild(link);
            link.click();
        });
    };

    // Uploading image to signally servers
    const uploadImg = async (uploadedMedia) => {
        const img = new FormData();
        img.append("file", uploadedMedia);
        const api = isForProduction
            ? "https://api.signally.io"
            : process.env.REACT_APP_API_URL;
        await axios
            .post(`${api}/import/file`, img, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(async (res) => {
                console.log(res);
                if (res.data.url) {
                    setPath(res.data);
                    copyToClipboard(res.data.url);
                }
                //
                // else
                //     setMessage(res.data)
            })
            .catch((err) => {
                setMessage(err.message);
            });
        return null;
    };

    // Copies image URL to clipboard and displays a success message
    const copyToClipboard = (givenpath) => {
        navigator.clipboard.writeText(
            path.path !== "Cliquez ici pour copier le lien de l'image" &&
                path.id
                ? path.id
                : givenpath
        );
        setMessage("Copied successfully!");
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

    return (
        <div className={classes.container}>
            <div className={classes.inputsContainer}>
                <h1>Convertir SVG en PNG</h1>
                <div className={classes.dimensions}>
                    <div>
                        <label>Width</label>
                        <input
                            defaultValue={width}
                            onChange={(e) => setWidth(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Height</label>
                        <input
                            defaultValue={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                </div>
                <textarea
                    onChange={(e) => setSvgData(e.target.value)}
                    style={{ height: "10rem" }}
                    placeholder="<svg fill='color'></svg>"
                />
                <Button
                    style={{ width: "30%" }}
                    color="primaryFill"
                    onClick={() => convertSvg(svgData)}
                    className={classes.btn}
                >
                    Convertir
                </Button>
                <h1>Importer une image</h1>
                {message && <span className={classes.message}>{message}</span>}
                <input
                    type="text"
                    readOnly
                    value={path.path}
                    onClick={() => copyToClipboard()}
                    disabled={
                        path.path ===
                        "Cliquez ici pour copier le lien de l'image"
                    }
                />
                <div className={classes.checkboxContainer}>
                    <label htmlFor="isProduction">Production</label>
                    <CustomCheckbox
                        onChange={(e) => setIsForProduction(e.target.checked)}
                        name="isProduction"
                        id="isProduction"
                        type="checkbox"
                        value={isForProduction}
                    />
                </div>
                <div className={classes.inputContainer}>
                    {path.url ? (
                        <img
                            alt={"preview"}
                            className={classes.imgPreview}
                            src={`${path.url}`}
                        />
                    ) : (
                        ""
                    )}
                    <div className={classes.fileUpload}>
                        {imgName.length > 0 ? (
                            <div
                                className={classes.uploadedFile}
                                onClick={() => {
                                    setImgName("");
                                    setPath({
                                        path: "Cliquez ici pour copier le lien de l'image",
                                    });
                                }}
                            >
                                <span>{imgName}</span> <IoMdClose />
                            </div>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setImgName(e.target.files[0].name);
                                        void uploadImg(e.target.files[0]);
                                    }}
                                />
                                <span>
                                    <BsUpload />
                                    Importer une image
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImgUploader;
