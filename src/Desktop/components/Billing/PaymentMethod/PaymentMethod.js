import classes from "./PaymentMethod.module.css"

export default function PaymentMethod() {
    return (<div className={classes.container}>
         <h4>Méthode de paiement</h4>
        <button>Ajouter une méthode de paiement</button>
    </div>)
}