import classes from './billing.module.css'
import Rocket from 'Assets/img/rocket.png'
import Checkbox from 'Assets/icons/checkbox.svg'
import Menu from '../../Menu/Menu'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { API } from 'config';

const bannerActivesAPI = 0

function Billing(props) {
    const [users, setUsers] = useState([])

    useEffect(async () => {
        props.handleHeader("Votre abonnement")
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users?access_token=${localStorage.getItem("token")}`).then((res) => {
            setUsers(res.data.data)
        })
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.greyContainer}>
                <div className={classes.whiteContainer}>
                    <div className={classes.textContainer}>
                        <h3>Votre abonnement</h3>
                        {users.length > 1 ? <><h4>{users?.length + " utilisateurs"}</h4> <p>0,5 € / mois / utilisateur</p></>
                         : <><h4>{users?.length + " utilisateur"}</h4> <p>Gratuit</p></>} 
                        <h4>{bannerActivesAPI} bannières actives</h4>
                        <p>10 € / mois / bannière</p>
                    </div>
                    <img src={Rocket} alt="rocket" />
                    <div className={classes.priceContainer}>
                        {users.length === 1 && bannerActivesAPI === 0 ?
                            <><span className={classes.bigTxt}> </span><span className={classes.free}>Gratuit</span></> :
                            <>
                                <span className={classes.price}>{(users?.length > 1 && (users?.length * 0.5)) + bannerActivesAPI * 10} €</span>
                                <span className={classes.perMonth}>/ mois</span>
                            </>}
                    </div>
                </div>
                <ul className={classes.listAdvantages}>
                    <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                    <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                    <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                    <li><img src={Checkbox} alt="checkbox" className={classes.listStyle} />Adipiscing sed diam nisi.</li>
                </ul>
            </div>
            <Menu page={"profile"} />
        </div>
    )
}

export default Billing