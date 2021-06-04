import { useEffect, useState } from 'react'
import classes from './addmanual.module.css'
import Rocket from '../../../../assets/img/rocket.png'
import Checkbox from '../../../../assets/icons/checkbox.svg'
import { Link } from 'react-router-dom'
import Menu from '../../Menu/Menu'
import axios from 'axios'
import { API } from '../../../../config'

function AddManual() {
    const [users, setUsers] = useState([])
    const [newUsers, setNewUsers] = useState([])
    const [step, setStep] = useState(0)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [poste, setPoste] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const req = {
            email: mail,
            phone_number: phone,
            first_name: firstName,
            last_name: lastName,
            position: poste
        }
        console.log("req:", req)
        // await axios.post(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users?access_token=${localStorage.getItem("token")}`, req)
        //     .then(async (res) => {
        //         console.log(res)
                setNewUsers(users.push(req))
                console.log(newUsers)
                // await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/users?access_token=${localStorage.getItem("token")}`).then((res) => {
                //     setUsers(res.data.data)
                    setStep(1)
                // })
            // }
            // )
    }

    if (step === 0)
        return (<div className={classes.container}>
            <h2>Nouvel utilisateur</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="text" placeholder="Poste / function" value={poste} onChange={(e) => setPoste(e.target.value)} />
                <input type="mail" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
                <input type="tel" placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <button type="submit" className={`${classes.btn} ${classes.orangeBtn}`}>Continuer</button>
            </form>
            <Menu />
        </div>)
    else if (step === 1) {
        console.log(newUsers.length)
        return (<div className={classes.container}>
            <h2>Utilisateurs</h2>
            <span>{!newUsers.length > 1 ? <>
                {newUsers.length} nouvel utilisateur
            </>
                : <>
                    {newUsers.length} nouveaux utilisateurs </>}</span>
            <ul className={classes.userList}>
                {newUsers.map((user, index) => {
                    return (
                        <li key={index} className={classes.user}>{user.first_name + " " + user.last_name}<button className={classes.edit}>...</button></li>
                    )
                })}
            </ul>
            <div className={classes.btnsContainer}>
                <button onClick={() => setStep(0)} className={`${classes.btn} ${classes.blackBtn}`}>Ajouter un autre utilisateur</button>
                <button onClick={() => setStep(2)} className={`${classes.btn} ${classes.orangeBtn}`}>Valider</button>
            </div>
            <Menu />
        </div>)
    }
    else
        return (<div className={classes.container}>
            <h2>Signally Pro</h2>
            <div className={classes.greyContainer}>
                <div className={classes.whiteContainer}>
                    <div className={classes.textContainer}>
                        <h3>Votre abonnement</h3>
                        <h4>{!newUsers.length > 1 ? <>
                            {newUsers.length} nouvel utilisateur
            </>
                            : <>
                                {newUsers.length} nouveaux utilisateurs </>}</h4>
                        <span>Pour un total de <span>{!users.length > 1 ? <>
                            {users.length} utilisateur
            </>
                            : <>
                                {users.length} utilisateurs </>}</span></span>
                        <br />
                        <span>0,5 € / mois / utilisateur</span>
                    </div>
                    <img src={Rocket} alt="rocket" />
                    <div className={classes.priceContainer}>
                        <span className={classes.price}>{0.5 * users.length} €</span>
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
            <Link to="/payment">
                <button className={`${classes.btn} ${classes.orangeBtn}`} onClick={() => setStep(4)}>Mettre à jour l’abonnement</button>
            </Link>
            <Menu />
        </div>)
}

export default AddManual