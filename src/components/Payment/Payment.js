import { useState } from 'react';
import Cross from '../../assets/icons/cross.svg'
import Help from '../../assets/icons/contactus.svg'
import classes from './payment.module.css'
import CreditCard from '../../assets/icons/credit-card-icon.svg'
import { Link, useHistory } from 'react-router-dom'

function Payment() {
    const [number, setNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [CVC, setCVC] = useState("")
    const history = useHistory()

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div>
                    <img src={Cross} alt="Close" onClick={() => history.goBack()} />
                    <h2>Paiement sécurisé</h2>
                </div>

                <img src={Help} alt="contact" />
            </div>
            <form>
                <input type="text" placeholder="Titulaire de la carte" className={classes.cardHolder} />
                <div className={classes.cardInfos}>
                    <div className={classes.cardNumberContainer}>
                        <img src={CreditCard} alt="credit card" />
                        <input className={classes.number} value={number} type="tel" pattern="[0-9*]" placeholder="5169 1234 1234 1234" onChange={(e) => setNumber(e.target.value.replace(/\D/, ''))} maxLength={19} />
                    </div>
                    <input className={classes.expiry} value={expiry} type="text" placeholder="MM/YY" onChange={(e) => setExpiry(e.target.value.replace(/\D/, ''))} maxLength={5} />
                    <input className={classes.cvc} value={CVC} type="tel" pattern="[0-9*]" placeholder="CVC" onChange={(e) => setCVC(e.target.value.replace(/\D/, ''))} maxLength={3} />
                </div>
                <div className={classes.saveCard}>
                    <input id="saveCard" type="checkbox" />
                    <span className={classes.checkmark}></span>
                    <label htmlFor="saveCard">Enregistrer cette carte pour faciliter l’ajout d’utilisateurs supplémentaires.</label>
                </div>
                <Link to="/dashboard">
                    <button className={`${CVC?.length > 0 && expiry?.length > 0 && number.length > 0 ? classes.activated : classes.deactivated}`}>Payer 60e</button>
                </Link>
            </form>
            <span>En cliquant sur payer j’accepte les <Link to="">conditions d’utilisation</Link> de Signally & j’accepte la <Link to="">politique de confidentialité</Link>.</span>
        </div>
    )
}

export default Payment