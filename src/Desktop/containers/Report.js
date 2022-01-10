import { useState } from "react";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import UploadFile from "Utils/Upload/uploadFile";
import classes from "Desktop/components/Report/report.module.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Noting from 'Assets/img/noting.png'

export default function Report() {
    const [file, setFile] = useState()
    const [subject, setSubject] = useState()
    const [bug, setBug] = useState()
    const history = useHistory()
    const [select, setSelect] = useState("Description du problème")

    return (<>
        <div className={classes.row}>
        <div className={classes.container}>
            <div className={classes.tagLine}>
                <h3>Bienvenue sur la Beta privée Signally !</h3>
                <p>Nous sommes très heureux de vous compter parmi les tous premiers utilisateurs.
                    <br /><br />
                    Avec vous, nous souhaitons faire de Signally, l’application la plus intuitive et la plus innovante du marché tout en répondant au mieux à vos
                    objectifs de communication et de marketing.
                    <br /><br />
                    Comme nous sommes en version Beta, tout n’est pas encore parfait !
                    <br /><br />
                    Néanmoins, grâce à vous, nous allons pouvoir faire de Signally la plateforme la plus performante et la plus facile à utiliser pour créer et gérer l’ensemble de vos signatures de mails.
                    Le formulaire ci-dessous est à votre disposition pour tout problème rencontré ou bien tout simplement pour nous faire part de vos commentaires ou suggestions.
                    <br /><br />
                    Un grand merci pour votre aide.</p><br />
            </div>
            <form method="POST" action="https://docs.google.com/forms/d/16TZdG15_oepgDbQjzCape8qmf49_PmbvoLxVBl1pT0Y/formResponse">
                <h4>Type du problème, commentaire, suggestion</h4>
                <form onChange={(e) => setSelect(e.target.value)}>
                    <select name="entry.231705632_sentinel">
                        <option value="Description du problème">Application signally.io</option>
                        <option value="Description du problème">Problème d'affichage de la signature dans Outlook</option>
                        <option value="Commentaire">Commentaire</option>
                        <option value="Suggestion">Suggestion</option>
                    </select>
                </form>
                <br />
                <h4>{select}</h4>
                <Input jsname="YPqjbf" placeholder="Bonjour, comme vous pouvez le voir sur cette image en PJ, le logo de l'entreprise ne s'affiche pas sur Outlook." style={{ height: "6rem", resize: "none", width: '100%' }} onChange={setBug} type="textarea" />
                <br />
                <h4>Pièce jointe (capture d'écran, fichier d'import corrompu...)</h4>
                <UploadFile
                    jsname="kTlJSc"
                    file={file}
                    setFile={setFile}
                    placeholder="Importer un fichier" />
                <div className={classes.actionsContainer}>
                    <Button onClick={() => history.goBack()} width={"45%"} color="orangeFill">Annuler</Button>
                    <Button type="submit" width={"45%"} color="orange">Envoyer</Button>
                </div>
            </form>
        </div>
        <img src={Noting} />
        </div>
    </>
    )
}