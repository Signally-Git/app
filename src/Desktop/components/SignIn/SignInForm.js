import classes from './SignInForm.module.css'
import axios from 'axios'
import { useState } from 'react'
import MagicLink from 'Assets/img/magic-link.png'
import { useHistory } from 'react-router'
import { API } from 'config'

function SignInForm() {
    const [mail, setMail] = useState("")
    const [code, setCode] = useState("")
    const [step, setStep] = useState(0)
    const history = useHistory()

    const handleSignIn = async (e) => {
        e.preventDefault()
        await axios.get(`${API}auth/magiclink/login?email=${mail}&code=${code}`).then((res) => {
            localStorage.setItem("token", res.data.authData.access_token)
            localStorage.setItem("user_id", res.data.authData.user_id)
            localStorage.setItem("organisation_id", res.data.authData.organisation_id)
        })
        history.push('/dashboard')
    }

    const handleMagicLink = async (e) => {
        e.preventDefault()
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(mail).toLowerCase())) {
            await axios.get(`${API}auth/magiclink/send?email=${mail}`).then((res) => {
                setCode(res.data.code)
            })
            setStep(1)
        }
    }

    if (step === 0){
        return (
            <div className={classes.container}>
                <img src={MagicLink} alt="MagicLink" />
                <p>Pour récupérer votre signature et pouvoir la modifier vous devez vous connecter à Signally</p>
                <form onSubmit={(e) => handleMagicLink(e)}>
                    <input autoFocus type="mail" value={mail} onChange={(mail) => setMail(mail.target.value)} placeholder={"Adresse email"} />
                    <button>Envoyez moi un Magic Link</button>
                </form>
            </div>
        )}
    else {
        return (
            <div className={classes.container}>
                <img src={MagicLink} alt="MagicLink" />
                <p>Un code vous à été envoyé à l’adresse : {mail}</p>
                <p>Vous n’avez pas reçu de mail ?</p>
                <span className={classes.verify} onClick={() => setStep(0)}>Vérifiez votre adresse</span>
                <form onSubmit={(e) => handleSignIn(e)}>
                    <input autoFocus type="tel" value={code} onChange={(code) => setCode(code.target.value)} placeholder={"Code"} />
                    <button>Me connecter</button>
                </form>
            </div>
        )
    }
}

export default SignInForm