import Header from '../Header/Header'
import classes from './errorpage.module.css'

// Page displaying front errors

function ErrorPage(){
    return (
        <div>
            <Header />
            <div  className={classes.container}>

            <h1>404 - Page non trouvée</h1>
            <p>Il semblerait que cette page soit indisponible.</p>
            </div>
        </div>
    )
}

export default ErrorPage