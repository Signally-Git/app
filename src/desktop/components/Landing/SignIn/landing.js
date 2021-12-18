import React, { useEffect, useRef, useState } from 'react';
import classes from '../landing.module.css';

import Illustration from 'Assets/img/takeoff.png'
import Logo from "Assets/img/logo-full.svg";
import Button from 'Utils/Button/btn';
import Input from 'Utils/Input/input';
import AuthCode from 'react-auth-code-input';
import axios from 'axios';
import { API } from 'config';
import { useHistory } from 'react-router-dom';
import request from 'Utils/Request/request';

const Login = () => {
    const [email, setEmail] = useState('diegos@M365x606019.onmicrosoft.com')
    const [code, setCode] = useState('ChangeMe!')
    const [logging, setLogging] = useState(false)
    const slider = useRef(null)
    const history = useHistory()

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
        }, 300)
    }

    const handleLogIn = async (e) => {
        e.preventDefault()
        const req = {
            email: email,
            password: code
        }
        const token = await axios.post(`${API}token/auth`, req);
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
                            <Input style={{ width: "100%" }} placeholder='xyrn@gmail.com' onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
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
                                <Input defaultValue={code} placeholder="Password" type="password" onChange={(e) => setCode(e.target.value)} />
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
                        <Button width={"40%"} color="orange" onClick={(e) => { handleScroll(e, 0) }}>Annuler</Button>
                        <Button width={"40%"} color="orangeFill" type="submit">Connexion</Button>
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