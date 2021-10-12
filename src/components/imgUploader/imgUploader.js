import { useState } from 'react'
import classes from './imgUpload.module.css'
import { IoMdClose } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import axios from 'axios';
import { API } from '../../config';
import Logo from '../Logo/logo';

function ImgUploader() {
    const [imgName, setImgName] = useState("")
    const [path, setPath] = useState("Cliquez ici pour copier le lien de l'image")
    const [message, setMessage] = useState("")

    const uploadImg = async (uploadedMedia) => {
        const img = new FormData()
        img.append('file', uploadedMedia)
        await axios.post(`${API}media`, img).then(async (res) => {
            if (res.data.path) {
                setPath(res.data.path)
                copyToClipboard(res.data.path)
            }
            else
                setMessage(res.data)
        }).catch((err) => { setMessage(err) })
    }

    const copyToClipboard = (givenpath) => {
        navigator.clipboard.writeText(path !== "Cliquez ici pour copier le lien de l'image" && path ? path : givenpath)
        setMessage("Copied successfully!")
        setTimeout(() => { setMessage() }, 5000)
    }

    return (
        <div className={classes.container}>
            <div className={classes.inputsContainer}>
                <h1>Importer une image</h1>
                {message && <span className={classes.message}>{message}</span>}
                <input type="text" readOnly value={path} onClick={() => copyToClipboard()} disabled={path !== "Cliquez ici pour copier le lien de l'image" ? false : true} />
                <div className={classes.inputContainer}>
                    {path !== "Cliquez ici pour copier le lien de l'image" ? <img className={classes.imgPreview} src={path} /> : ""}
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