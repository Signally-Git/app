import { useState } from 'react'
import classes from './imgUpload.module.css'
import { IoMdClose } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import axios from 'axios';
import Logo from 'Utils/Logo/logo';
import Button from 'Utils/Button/btn';
import request from 'Utils/Request/request';

// Custom functions
// First one converts SVG HTML code to PNG image
// Second one takes an image, stores it on the servers and saves URL to the clipboard

function ImgUploader() {
    const [imgName, setImgName] = useState("")
    const [path, setPath] = useState("Cliquez ici pour copier le lien de l'image")
    const [message, setMessage] = useState("")
    const [width, setWidth] = useState(108)
    const [height, setHeight] = useState(108)

    // SVG TO PNG
    const [svgData, setSvgData] = useState();
    const convertSvg = async (svg) => {
        await axios({
            url: `https://svgtopng.signally.io/convert?height=${height}&width=${width}`, //your url
            method: 'POST',
            data: svg,
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.png'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }

    // Uploading image to signally servers
    const uploadImg = async (uploadedMedia) => {
        const img = new FormData()
        img.append('file', uploadedMedia)
        await request.post(`import/file`, img).then(async (res) => {

            console.log(res)
            if (res.data.path) {
                setPath(res.data)
                copyToClipboard(res.data.path)
            }
            // 
            // else
            //     setMessage(res.data)
        }).catch((err) => { setMessage(err) })
    }

    // Copies image URL to clipboard and displays a success message
    const copyToClipboard = (givenpath) => {
        navigator.clipboard.writeText(path.path !== "Cliquez ici pour copier le lien de l'image" && path.id ? path.id : givenpath)
        setMessage("Copied successfully!")
        setTimeout(() => { setMessage() }, 5000)
    }

    return (
        <div className={classes.container}>
            <div className={classes.inputsContainer}>
                <h1>Convertir SVG en PNG</h1>
                <div className={classes.dimensions}>
                    <div>
                        <label>Width</label>
                        <input defaultValue={width} onChange={(e) => setWidth(e.target.value)} />
                    </div>
                    <div>
                        <label>Height</label>
                        <input defaultValue={height} onChange={(e) => setHeight(e.target.value)} />
                    </div>
                </div>
                <textarea onChange={(e) => setSvgData(e.target.value)} style={{ height: "10rem" }} placeholder="<svg fill='color'></svg>" />
                <Button style={{ width: "30%" }} color="orangeFill" onClick={() => convertSvg(svgData)} className={classes.btn}>Convertir</Button>
                <h1>Importer une image</h1>
                {message && <span className={classes.message}>{message}</span>}
                <input type="text" readOnly value={path.id} onClick={() => copyToClipboard()} disabled={path.path !== "Cliquez ici pour copier le lien de l'image" ? false : true} />
                <div className={classes.inputContainer}>
                    {path.path !== "Cliquez ici pour copier le lien de l'image" ? <img className={classes.imgPreview} src={`${process.env.REACT_APP_API_URL}/${path.path}`} /> : ""}
                    <div className={classes.fileUpload}>
                        {imgName.length > 0 ? (
                            <div className={classes.uploadedFile} onClick={() => {
                                setImgName("");
                                setPath("Cliquez ici pour copier le lien de l'image")
                            }}>
                                <span>{imgName}</span>{" "}
                                <IoMdClose />
                            </div>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setImgName(e.target.files[0].name);
                                        uploadImg(e.target.files[0]);
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
            <div className={classes.logo}>
                <Logo />
            </div>
        </div>
    )
}

export default ImgUploader