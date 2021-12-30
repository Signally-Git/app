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

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}


const Login = () => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [logging, setLogging] = useState(false)
    const slider = useRef(null)
    const toFocus = useRef(null)

    const history = useHistory()
    const query = useQuery()

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
        handleScroll(e, 1000)
        setTimeout(() => {
            setLogging(true)

            toFocus.current.focus()
        }, 300)
    }

    const handleLogIn = async (e) => {
        e.preventDefault()
        const req = {
            username: email,
            password: code
        }
        const token = await request.post(`token/auth`, req);
        localStorage.setItem('token', token.data.token)
        history.push('/dashboard')
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
                <h2>Entrez le code reçu par mail.</h2>
                <form onSubmit={(e) => handleLogIn(e)}>
                    <div className={classes.codeContainer}>
                        {
                            logging ?
                                // <AuthCode
                                //     autoFocus={false}
                                //     characters={9}
                                //     onChange={setCode}
                                // /> 
                                <Input defaultValue={code} ref={toFocus} placeholder="Passwordd" type="password" onChange={(e) => setCode(e.target.value)} />
                                : <>
                                    <Input defaultValue={code} placeholder="Password" type="password" onChange={(e) => setCode(e.target.value)} />
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
            </div>
        </div>
        <div className={classes.textIllustration}>
            <div className={classes.Illustration} style={{ flexDirection: 'row', display: 'flex' }}>
                <img src={Illustration} alt="" />
                <div>
                    <h1>À propos de la bêta</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. <span>Tempore</span> molestias animi, illum iusto, cumque, laudantium a consectetur fugiat ex nisi ipsa. Consequuntur dolorum obcaecati magni perspiciatis ipsam necessitatibus, sequi quasi?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore molestias animi, illum iusto, cumque, <span>laudantium</span> a consectetur fugiat ex nisi ipsa. Consequuntur dolorum obcaecati magni <span>perspiciatis</span> ipsam necessitatibus, sequi quasi?
                    </p>
                    <br />
                    <p>*Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                </div>
            </div>
        </div>
    </div>)
}

export default Login;