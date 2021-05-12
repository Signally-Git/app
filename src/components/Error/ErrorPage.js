import Header from '../Header/header'
import classes from './errorpage.module.css'

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