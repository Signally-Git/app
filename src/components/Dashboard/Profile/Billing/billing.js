import classes from './billing.module.css'
import Rocket from '../../../../assets/img/rocket.png'
import Checkbox from '../../../../assets/icons/checkbox.svg'
import { Link } from 'react-router-dom'
import Menu from '../../Menu/Menu'
import { useEffect } from 'react'


const userCountAPI = 120
const bannerActivesAPI = 2


function Billing (props) {

    useEffect(() => {
        props.handleHeader("Votre abonnement")
    }, [])

    return (
        <div className={classes.container}>
        <div className={classes.greyContainer}>
            <div className={classes.whiteContainer}>
                <div className={classes.textContainer}>
                    <h3>Votre abonnement</h3>
                    <h4>{userCountAPI} utilisateurs</h4>
                    <span>0,5 € / mois / utilisateur</span>
                    <h4>{bannerActivesAPI} bannières actives</h4>
                    <span>10 € / mois / bannière</span>
                </div>
                <img src={Rocket} alt="rocket" />
                <div className={classes.priceContainer}>
                    <span className={classes.price}>{userCountAPI * 0.5 + bannerActivesAPI * 10} €</span>
                    <span className={classes.perMonth}>/ mois</span>
                </div>
            </div>
            <ul className={classes.listAdvantages}>
                <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
            </ul>
        </div>
        <Menu />
    </div>
    )
}

export default Billing