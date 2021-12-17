import { useState } from "react";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import UploadFile from "Utils/Upload/uploadFile";
import classes from "Desktop/components/Report/report.module.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Report() {
    const [file, setFile] = useState()
    const [subject, setSubject] = useState()
    const [bug, setBug] = useState()
    const history = useHistory()

    return (<>
        <div className={classes.container}>
            <div className={classes.tagLine}>
                <h3>Vous avez un problème ?</h3>
                <p>Contactez-nous et nous vous répondrons au plus vite.</p>
            </div>
            <h4>Type du problème</h4>
            <select>
                <option>Application Signally.io</option>
                <option>Outlook</option>
            </select>
            <br />
            <h4>Description du problème</h4>
            <Input placeholder="Bonjour, comme vous pouvez le voir sur cette image en PJ, le logo de l'entreprise ne s'affiche pas sur Outlook." style={{ height: "10rem", resize: "none" }} onChange={setBug} type="textarea" />
            <br />
            <h4>Pièce jointe (capture d'écran, fichier d'import corrompu...)</h4>
            <UploadFile
                file={file}
                setFile={setFile}
                placeholder="Importer un fichier" />
            <div className={classes.actionsContainer}>
                <Button onClick={() => history.goBack()} width={"45%"} color="orangeFill">Annuler</Button>
                <Button width={"45%"} color="orange">Envoyer</Button>
            </div>
        </div>
    </>
    )
}