import React, { useEffect, useMemo, useRef, useState } from 'react';
import classes from '../landing.module.css';

import Illustration from 'Assets/img/takeoff.png'
import Logo from "Assets/img/logo-full.svg";
import Button from 'Utils/Button/btn';
import Input from 'Utils/Input/input';
import AuthCode from 'react-auth-code-input';
import { API } from 'config';
import { useHistory, useLocation } from 'react-router-dom';
import request from 'Utils/Request/request';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}


const Login = () => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [logging, setLogging] = useState(false)
    const [showPassword, setShowPass] = useState(false)
    const slider = useRef(null)
    const toFocus = useRef(null)

    const [error, setError] = useState('')

    const history = useHistory()
    const query = useQuery()

    useEffect(() => {
        if (localStorage.getItem('token'))
            history.push('/dashboard')
    })

    useEffect(async () => {
        console.log(query.get('user'), decodeURI(encodeURI(query.get('user'))))
        if (query.get('user')) {
            setEmail(query.get('user'))
            const magicLink = await request.get(`login_check?user=${query.get("user")}&expires=${query.get('expires')}&hash=${query.get('hash')}`)
            localStorage.setItem('token', magicLink.data.token)
            history.push('/dashboard')
        }
    }, [])

    const handleScroll = (e, scroll) => {
        e.preventDefault()
        slider.current.scroll({
            top: 0,
            left: scroll,
            behavior: 'smooth'
        });
        setTimeout(() => {
            setLogging(false)
            setError('')
        }, 300)
    }

    const handleSubmit = (e) => {
        handleScroll(e, 1000)
        setTimeout(() => {
            setLogging(true)
            setError('')
            toFocus.current.focus()
        }, 300)
    }

    const handleLogIn = async (e) => {
        setError('')
        e.preventDefault()
        const req = {
            username: email.toLowerCase(),
            password: code
        }

        const token = await request.post(`token/auth`, req).catch(() => {
            setError(<p>Impossible de se connecter.<br />Veuillez vérifier vos identifiants.</p>)
        });

        if (token) {
            localStorage.setItem('token', token.data.token)
            localStorage.setItem('refresh_token', token.data.refresh_token)
            history.go(0)
        }

    }

    return (<div className={classes.container}>
        <div className={classes.slider} ref={slider}>
            <div className={classes.formContainer}>
                <h2>Se connecter sur <span>Signally</span> pour accéder à l'espace bêta.</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={classes.inputContainer}>
                        <label className={classes.inputTitle}>Adresse e-mail</label>
                        <div style={{ position: 'relative', display: 'flex' }}>
                            <Input style={{ width: "100%" }} placeholder='xyrn@gmail.com' onChange={(e) => setEmail(e.target.value)} value={email} type="text" />
                        </div>
                    </div>
                    <Button width={"50%"} color="orangeFill" type="submit">Connexion</Button>
                </form>
            </div>
            <div className={classes.formContainer}>
                <h2>Entrez votre mot de passe.</h2>
                <form onSubmit={(e) => handleLogIn(e)}>
                    <div className={classes.codeContainer}>
                        {
                            logging ?
                                // <AuthCode
                                //     autoFocus={false}
                                //     characters={9}
                                //     onChange={setCode}
                                // /> 
                                <> <div style={{ position: 'relative', display: 'flex' }}>
                                    <Input defaultValue={code} ref={toFocus} placeholder="Mot de passe" type={showPassword ? "text" : "password"} onChange={(e) => setCode(e.target.value)} />
                                    <div className={classes.showPassword} onClick={() => setShowPass(!showPassword)}>
                                        {showPassword ?
                                            <FiEyeOff />
                                            :
                                            <FiEye />
                                        }
                                    </div>
                                </div>
                                </>
                                : <>
                                    <Input defaultValue={code} placeholder="Mot de passe" type="password" onChange={(e) => setCode(e.target.value)} />
                                    {/* <div>
                                        <input />
                                        <input />
                                        <input />
                                        <input />
                                        <input />
                                        <input />
                                        <input />
                                        <input />
                                        <input />
                                    </div> */}
                                </>}
                    </div>
                    <div className={classes.btnsContainer}>
                        <Button width={"40%"} color="orangeFill" type="submit">Connexion</Button>
                        <Button width={"40%"} color="orange" onClick={(e) => { handleScroll(e, 0) }}>Annuler</Button>
                    </div>
                </form>
                <span className={classes.error}>
                    {error}
                </span>
            </div>
        </div>
        <div className={classes.textIllustration}>
            <div className={classes.Illustration} style={{ flexDirection: 'row', display: 'flex' }}>
                <img src={Illustration} alt="" />
                <div>
                    <h1>Bienvenue sur la Beta privée Signally !</h1>
                    <p>Nous sommes très heureux de vous compter parmi les tous premiers utilisateurs.</p>
                    <p>Avec vous, nous souhaitons faire de Signally, l’application la plus intuitive et la plus innovante du marché tout en répondant au mieux à vos
                        objectifs de communication et de marketing.</p>
                    <p>Comme nous sommes en version Beta, tout n’est pas encore parfait !</p>
                    <p>Néanmoins, grâce à vous, nous pourrons rendre la plateforme de plus en plus performante et encore plus simple à utiliser.</p>
                    <p>Un grand merci pour votre aide.</p><br />
                </div>
            </div>
        </div>
    </div>)
}

export default Login;