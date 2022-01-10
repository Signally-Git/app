import Header from 'Desktop/components/Header/Header';
import React, { useState } from 'react';
import Button from 'Utils/Button/btn';
import Input from 'Utils/Input/input';
import request from 'Utils/Request/request';
import Noting from 'Assets/img/noting.png'

import classes from '../landing.module.css'
import { AiFillEyeInvisible } from 'react-icons/ai';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNotification } from 'Utils/Notifications/notifications';
import axios from 'axios';
import { API } from 'config';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [position, setPosition] = useState('')
  const [society, setSociety] = useState('')
  const [siret, setSiret] = useState('')
  const [societyName, setSocietyName] = useState('')
  const [password, setPassword] = useState('')
  const [nbPerson, setNbPerson] = useState("")
  const [showPass, setShowPass] = useState(false)
  // const notification = useNotification()
  
  const handleSignUp = async (e) => {
    e.preventDefault()
    const req = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      position: position,
      organisationName: societyName,
      employeeNumber: nbPerson,
      siret: siret
    }
    const signup = await axios.post(API+'register', req)
    console.log(signup)
    if (signup.data) {
    }
  }

  return (
    <div style={{ background: "#FFF", overflow: 'hidden', height: "100vh" }}>
      <Header landing={true} />
      <div className={classes.container}>
        <div className={classes.registerContainer}>
          <div className={classes.formContainer}>
            <form onSubmit={(e) => handleSignUp(e)}>
              <div className={classes.inputs}>
                <div className={classes.inputContainer}>
                  <label className={classes.inputTitle}>Prénom</label>
                  <div style={{ position: 'relative', display: 'flex' }}>
                    <Input placeholder='Jean' onChange={(e) => setFirstname(e.target.value)} value={firstname} type='text' />
                  </div>
                </div>
                <div className={classes.inputContainer}>
                  <label className={classes.inputTitle}>Nom</label>
                  <div style={{ position: 'relative', display: 'flex' }}>
                    <Input placeholder='Dupont' onChange={(e) => setLastname(e.target.value)} value={lastname} type='text' />
                  </div>
                </div>
              </div>
              <div className={classes.inputContainer}>
                <label className={classes.inputTitle}>Position</label>
                <div style={{ position: 'relative', display: 'flex' }}>
                  <Input placeholder='CEO' onChange={(e) => setPosition(e.target.value)} value={position} type="text" />
                </div>
              </div>
              <div className={classes.inputContainer}>
                <label className={classes.inputTitle}>Adresse e-mail</label>
                <div style={{ position: 'relative', display: 'flex' }}>
                  <Input placeholder='dupont-pro@gmail.com' onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="email" type="email" />
                </div>
              </div>
              <div className={classes.inputContainer}>
                <label className={classes.inputTitle}>Password</label>
                <div style={{ position: 'relative', display: 'flex' }}>
                  <Input placeholder='*****' onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="new-password" type={showPass ? "text" : "password"} />
                  <div className={classes.showPassword} onClick={() => setShowPass(!showPass)}>
                    {showPass ?
                      <FiEyeOff />
                      :
                      <FiEye />
                    }
                  </div>
                </div>
              </div>
              <div className={classes.inputs}>

                <div className={classes.inputContainer}>
                  <label className={classes.inputTitle}>Société</label>
                  <Input placeholder='Signally' onChange={(e) => setSocietyName(e.target.value)} value={societyName} type="text" />
                  <div style={{ position: 'relative', display: 'flex', marginTop: 15, marginBottom: 15 }}>
                    <form onChange={(e) => setNbPerson(e.target.value)}>
                      <select>
                        <option value="1 à 5">1 à 5</option>
                        <option value="5 à 20">5 à 20</option>
                        <option value="20 à 50">20 à 50</option>
                        <option value="50 à 100">50 à 100</option>
                        <option value="100+">100+</option>
                      </select>
                    </form>
                    
                  </div>
                </div>
                <div className={classes.inputContainer}>
                  <label className={classes.inputTitle}>SIRET</label>
                  <div style={{ position: 'relative', display: 'flex' }}>
                    <Input placeholder='44306184100047' onChange={(e) => setSiret(e.target.value)} value={siret} type="text" />
                  </div>
                </div>
              </div>
              <Button style={{ width: '40%' }} color="orangeFill" type="submit">S'inscrire</Button>
            </form>
          </div>
          <div className={classes.textIllustration}>
            <img src={Noting} />
            <div>
              <h1>Bienvenue sur la Beta privée Signally !</h1>
              <p>Nous sommes très heureux de vous compter parmi les tous premiers utilisateurs.</p>
              <p>Avec vous, nous souhaitons faire de Signally, l’application la plus intuitive et la plus innovante du marché tout en répondant au mieux à vos objectifs de communication et de marketing.</p>
              <p>Comme nous sommes en version Beta, tout n’est pas encore parfait ! </p>
              <p>Néanmoins, grâce à vous, nous allons pouvoir faire de Signally la plateforme la plus performante et la plus facile à utiliser pour créer et gérer l’ensemble de vos signatures de mails.</p>

              <p>Un grand merci pour votre aide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default Signup;
