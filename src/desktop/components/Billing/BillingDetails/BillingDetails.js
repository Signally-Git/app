import classes from './BillingDetails.module.css'
import Rocket from 'Assets/img/rocket.png'

export default function BillingDetails() {
    return (<div className={classes.container}>
        <h4>Votre abonnement</h4>
        <div>
            <h3>480 utilisateurs</h3>
            <span>0,5 € / mois / utilisateur</span>
        </div>
        <div>
            <h3>5 bannières actives</h3>
            <span>0,10 € / mois / utilisateur</span>
        </div>
        <div className={classes.totalPrice}>
            <h3>288 €</h3>
            <span>/ mois</span>
        </div>
        <img src={Rocket} />
    </div>)
}