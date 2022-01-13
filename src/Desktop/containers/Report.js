import { useEffect, useState } from "react";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import UploadFile from "Utils/Upload/uploadFile";
import classes from "Desktop/components/Report/report.module.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Noting from 'Assets/img/noting.png'
import request from "Utils/Request/request";
import { useNotification } from "Utils/Notifications/notifications";

export default function Report() {
    const [file, setFile] = useState()
    const [bug, setBug] = useState("")
    const history = useHistory()
    const [select, setSelect] = useState("SIGNALLY_APP")
    const table = [
        { key: "SIGNALLY_APP", name: "Application signally.io" },
        { key: "OUTLOOK_DISPLAY", name: "Problème d'affichage de la signature dans Outlook" },
        { key: "COMMENTS", name: "Commentaire" },
        { key: "RECOMMENDATIONS", name: "Suggestion" },
    ]
    const notification = useNotification()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const req = {
            subject: select,
            description: bug
        }
        const feedback = await request.post('feedback', req).catch(() => notification({ content: <>Une erreur s'est produite lors de l'envoi du formulaire.</>, status: "invalid" }))
        if (feedback?.data) {
            notification({ content: <>Votre formulaire a bien été envoyé !</>, status: "valid" })
            history.push('/dashboard')
        }

    }

    useEffect(() => {
        console.log(table.filter((entry) => entry.key === select))
    }, [select])

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
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h4>Type du problème, commentaire, suggestion</h4>
                    <form onChange={(e) => setSelect(e.target.value)}>
                        <select>
                            <option value="SIGNALLY_APP">Application signally.io</option>
                            <option value="OUTLOOK_DISPLAY">Problème d'affichage de la signature dans Outlook</option>
                            <option value="COMMENTS">Commentaire</option>
                            <option value="RECOMMENDATIONS">Suggestion</option>
                        </select>
                    </form>
                    <br />
                    <h4>{table.filter((entry) => entry.key === select)[0].name}</h4>
                    <Input placeholder="Bonjour, comme vous pouvez le voir sur cette image en PJ, le logo de l'entreprise ne s'affiche pas sur Outlook."
                        style={{ height: "6rem", resize: "none", width: '100%' }}
                        onChange={(e) => setBug(e.target.value)} type="textarea" />
                    <br />
                    <h4>Pièce jointe (capture d'écran, fichier d'import corrompu...)</h4>
                    <UploadFile
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