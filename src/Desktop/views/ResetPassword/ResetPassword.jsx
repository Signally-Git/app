import Header from "Desktop/components/Header/Header";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import classes from './ResetPassword.module.css'
import React from "react";
import axios from "axios";
import { API } from "config";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ResetPassword() {
    const token = useQuery()
    const [showPass, setShowPass] = React.useState(false)
    const [newPass, setNewPass] = React.useState(" ")
    const [confirm, setConfirm] = React.useState("")
    const [done, setDone] = React.useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const req = {
            password: confirm
        }
        axios.post(`${API}reset/${token.toString().replace('token=', '')}`, req).then(() => {
            setDone(true)
            setTimeout(() => {
                history.push('/sign-in')
            }, 2500);
        }).catch((err) => console.log(err))
        setDone(true)
        setTimeout(() => {
            history.push('/sign-in')
        }, 2500);
    }

    return (<>
        <Header landing />
        {!done ?
            <form onSubmit={(e) => handleSubmit(e)} style={{ display: 'flex', height: '80vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1>Réinitialisez votre mot de passe</h1>
                <div className={classes.passwordContainer}>
                    <Input onChange={(e) => setNewPass(e.target.value)} style={{ width: '20rem' }} type={!showPass ? "password" : "text"} placeholder="Nouveau mot de passe" />
                    <div onClick={() => setShowPass(!showPass)}>
                        {showPass ? <FiEyeOff /> : <FiEye />}
                    </div>
                </div>

                <Input onChange={(e) => setConfirm(e.target.value)} style={{ width: '20rem' }} type={!showPass ? "password" : "text"} placeholder="Confirmer mot de passe" />
                <br />
                <Button color={newPass === confirm && newPass.length > 1 ? "orangeFill" : "orange"} disabled={newPass !== confirm ? true : false || newPass.length > 1 ? false : true}>Réinitialiser</Button>
            </form> :
            <div className={classes.success}>
                <h2>Merci. </h2>
                <p>Votre mot de passe a bien été réinitialisé.</p>
                <p>Redirection vers la page de connexion...</p>
            </div>}
    </>)
}