import classes from './SignInForm.module.css'

function SignInForm() {
    return (
        <div className={classes.container}>
            <p>Veuillez entrer votre email pour accéder à votre signature.
            Vous pourrez ainsi la mettre à jour quand vous voulez.</p>
            <input type="mail" />
            <button>Envoyez moi un Magic Link</button>
        </div>
    )
}

export default SignInForm