import React, { useEffect, useMemo, useRef, useState } from 'react';
import classes from '../landing.module.css';

import Takeoff from 'Assets/img/takeoff.png'
import PluginsOutlook from 'Assets/img/Plugins-Outlook.png'
import PluginsSoon from 'Assets/img/Plugins-GA.png'
import Button from 'Utils/Button/btn';
import Input from 'Utils/Input/input';
import { Link, useHistory, useLocation } from 'react-router-dom';
import request from 'Utils/Request/request';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNotification } from 'Utils/Notifications/notifications';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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
    const notification = useNotification()
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)

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
        }, 300)
    }

    const handleSubmit = (e) => {
        handleScroll(e, 2000)
        setTimeout(() => {
            setLogging(true)
            toFocus.current.focus()
        }, 400)
    }

    const handleLogIn = async (e) => {
        e.preventDefault()
        setLoading(true)
        const req = {
            username: email.toLowerCase(),
            password: code
        }

        const token = await request.post(`token/auth`, req).catch(() => {
            notification({ content: <>Email ou mot de passe incorrect</>, status: "invalid" })
            setLoading(false)
        });

        if (token) {
            localStorage.setItem('token', token.data.token)
            localStorage.setItem('refresh_token', token.data.refresh_token)
            history.go(0)
        }
    }

    return (<div style={{ background: "#FFF", overflow: 'hidden', height: "100vh" }}>
        {modal ?
            <div className={classes.modal}>
                <h3>Réinitialiser mon mot de passe</h3>
                <Input defaultValue={email} type="mail" style={{ width: '100%' }} autoComplete="email" placeholder="Email" />
                <div className={classes.btnsContainer}>
                    <Button color={"orangeFill"} width={'40%'} onClick={() => setModal(false)}>Envoyer</Button>
                    <Button color={"orange"} width={'40%'} onClick={() => setModal(false)}>Annuler</Button>
                </div>
            </div> : ""}
        <div className={classes.container}>
            <div className={classes.logInContainer}>
                <div className={classes.textIllustration}>
                    <img className={classes.takeoff} src={Takeoff} />
                    <div className={classes.descriptionBeta}>
                        <h1>Bienvenue sur la Beta privée Signally !</h1>
                        <p>Nous sommes très heureux de vous compter parmi les tous premiers utilisateurs.</p>
                        <p>Avec vous, nous souhaitons faire de Signally, l’application la plus intuitive et la plus innovante du marché tout en répondant au mieux à vos
                            objectifs de communication et de marketing.</p>
                        <p>Comme nous sommes en version Beta, tout n’est pas encore parfait !</p>
                        <p>Néanmoins, grâce à vous, nous pourrons rendre la plateforme de plus en plus performante et encore plus simple à utiliser.</p>
                        <p>Un grand merci pour votre aide.</p><br />
                        <div>
                            <img className={classes.plugins} src={PluginsOutlook} />
                            <img className={classes.plugins} src={PluginsSoon} />
                        </div>
                    </div>
                </div>
                <div className={classes.slider} ref={slider}>
                    <div className={classes.formContainer}>
                        <h2>Connectez-vous à votre espace <span>Signally</span></h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className={classes.inputContainer}>
                                <div style={{ position: 'relative', display: 'flex' }}>
                                    <Input autoComplete="email" style={{ width: "100%" }} placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} type="text" />
                                </div>
                            </div>
                            <Button width={"30%"} color="orangeFill" type="submit" arrow>Connexion</Button>
                        </form>
                    </div>
                    <div className={classes.formContainer}>
                        <h2>Entrez votre mot de passe</h2>
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
                                            <Input autoComplete="current-password" defaultValue={code} ref={toFocus} placeholder="Mot de passe" type={showPassword ? "text" : "password"} onChange={(e) => setCode(e.target.value)} />
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
                            <span onClick={() => setModal(true)} className={classes.forgot}>Mot de passe oublié</span>
                            <div className={classes.btnsContainer}>
                                <Button width={"30%"} color="orangeFill" type="submit">{loading ? <AiOutlineLoading3Quarters stroke-width="1" stroke='2px' fontWeight={'bolder'} className={classes.loading} /> : "Connexion"}</Button>
                                <Button width={"30%"} color="orange" onClick={(e) => { handleScroll(e, 0) }}>Annuler</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Login;