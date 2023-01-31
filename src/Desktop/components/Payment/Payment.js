import Cross from "Assets/icons/cross.svg";
import Help from "Assets/icons/contactus.svg";
import classes from "./payment.module.css";
import { Link, useHistory } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from "./stripe";

function Payment() {
    const history = useHistory();

    const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div>
                    <img
                        src={Cross}
                        alt="Close"
                        onClick={() => history.goBack()}
                    />
                    <h2>Paiement sécurisé</h2>
                </div>

                <img src={Help} alt="contact" />
            </div>
            <div className={classes.cardContainer}>
                <input
                    type="text"
                    placeholder="Titulaire de la carte"
                    className={classes.cardHolder}
                />
                <Elements stripe={stripePromise}>
                    <CardForm />
                </Elements>
            </div>
            <span>
                En cliquant sur payer j’accepte les{" "}
                <Link to="">conditions d’utilisation</Link> de Signally &
                j’accepte la <Link to="">politique de confidentialité</Link>.
            </span>
        </div>
    );
}

export default Payment;
