import classes from './SignInForm.module.css'
import axios from 'axios'
import { useState } from 'react'

function SignInForm() {
    const [mail, setMail] = useState("")
    const handleSignIn = (e) => {
        e.preventDefault()
        axios.get("https://api.signally.io/auth/magiclink/send?email=" + mail).then((res) => {
            console.log(res)
        })
    }
    return (
        <div className={classes.container}>
            <p>Veuillez entrer votre email pour accéder à votre signature.
            Vous pourrez ainsi la mettre à jour quand vous voulez.</p>
            <form onSubmit={(e) => handleSignIn(e)}>
                <input type="mail" value={mail} onChange={(mail) => setMail(mail.target.value)} />
                <button>Envoyez moi un Magic Link</button>
            </form>
        </div>
    )
}

export default SignInForm