import Header from 'Desktop/components/Header/Header';
import React, { useEffect, useState } from 'react';
import Button from 'Utils/Button/btn';
import Input from 'Utils/Input/input';
import CustomSelect from 'Utils/CustomSelect/customselect'
import PluginsOutlook from 'Assets/img/Plugins-Outlook.png'
import PluginsSoon from 'Assets/img/Plugins-GA.png'
import request from 'Utils/Request/request';
import Takeoff from 'Assets/img/takeoff.png'

import classes from '../landing.module.css'
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
  const [siren, setSiren] = useState('')
  const [societyName, setSocietyName] = useState('')
  const [password, setPassword] = useState('')
  const [nbPerson, setNbPerson] = useState("1 à 5")
  const [showPass, setShowPass] = useState(false)
  const notification = useNotification()
  const [valid, setValid] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const nbs = [
    { name: "1 à 5" },
    { name: "5 à 20" },
    { name: "20 à 50" },
    { name: "50 à 100" },
    { name: "100+" }
  ]

  function validateSiren(siren) {
    var isValid = true;
    siren = siren.replace(/[^\d.-]/g, '')
    if ((siren.length != 9) || (isNaN(siren)))
      isValid = false;
    return isValid;
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // const validateForm = (e) => {
  //   e.preventDefault()
  //   if (firstname.length > 1 && lastname.length > 1 && position.length > 1 && password.length > 1 && societyName.length > 1) {
  //     console.log('true vite fait')
  //     console.log(email, validateEmail(email))
  //     console.log(siren, validateSiren(siren))
  //     if (validateEmail(email) && validateSiren(siren)) {
  //       console.log('true')
  //       setValid(true)
  //     }
  //     else {
  //       setValid(false)
  //     }
  //   }
  //   else 
  //    setValid(false)
  // }

  useEffect(() => {
    if (firstname.length > 0 && lastname.length > 0 && position.length > 0 && password.length > 0 && societyName.length > 0) {
      if (validateEmail(email) && validateSiren(siren)) {
        setValid(true)
      }
      else {
        setValid(false)
      }
    }
    else
      setValid(false)
  }, [firstname, lastname, position, password, societyName, siren, email])

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      notification({ content: <>Veuillez vérifier votre adresse mail</>, status: "invalid" })
    }
    if (!validateSiren(siren)) {
      notification({ content: <>Veuillez vérifier votre SIREN</>, status: "invalid" })
    }
    const req = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      position: position,
      organisationName: societyName,
      employeeNumber: nbPerson,
      siren: siren
    }
    if (valid) {
      setLoading(true)
      await axios.post(API + 'register', req).then(() => {
        setSent(true)
      }).catch((err) => {
        if (err.response.data.title === 'App\\Exception\\Organisation\\OrganisationWithSameSirenAlreadyExistsDomainException')
          notification({ content: <>Cette société est déjà enregistrée sur Signally</>, status: "invalid" })
        if (err.response.data.title === 'App\\Exception\\User\\UserWithSameEmailAlreadyExistsDomainException')
          notification({ content: <>Cet utilisateur est déjà enregistré sur Signally</>, status: "invalid" })
        setLoading(false);
        return;
      })
    }
  }

  return (
    <div style={{ background: "#FFF", overflow: 'hidden', height: "100vh" }}>
      <Header landing={true} />
      <div className={classes.container}>
        <div className={classes.registerContainer}>
          <div className={classes.textIllustration}>
            <img className={classes.takeoff} src={Takeoff} />
            <div className={classes.descriptionBeta}>
              <h1>Bienvenue sur la Beta privée Signally !</h1>
              <p>Nous sommes très heureux de vous compter parmi nos premiers utilisateurs.</p>
              <p>Avec vous, nous souhaitons faire de Signally, l’application la plus intuitive et la plus innovante du marché tout en répondant au mieux à vos
                objectifs de communication et de marketing.</p>
              <p>Comme nous sommes en version Beta, tout n’est pas encore parfait !</p>
              <p>Néanmoins, grâce à vous, nous pourrons rendre la plateforme de plus en plus performante et encore plus simple à utiliser.</p>
              <p>Un grand merci pour votre aide.</p>
              <p>-- L'équipe Signally</p>
              <br />
              <div>
                <img className={classes.plugins} src={PluginsOutlook} />
                <img className={classes.plugins} src={PluginsSoon} />
              </div>
            </div>
          </div>
          {
            sent ? <><div className={classes.congrats}>
              <h2>Félicitations {firstname}.</h2>
              <p>Votre compte a bien été créé.</p>
              <p>Veuillez maintenant consulter votre boite mail et cliquer sur le lien de connexion.</p>
            </div></> :
              <div className={`${classes.formContainer} ${loading ? classes.disappear : ""}`}>
                <form onSubmit={(e) => handleSignUp(e)}>
                  <div className={classes.inputs}>
                    <div className={classes.inputContainer}>
                      <label className={classes.inputTitle}>Prénom</label>
                      <div style={{ position: 'relative', display: 'flex' }}>
                        <Input required autoComplete="given-name" placeholder='Jean' onChange={(e) => setFirstname(e.target.value)} value={firstname} type='text' />
                      </div>
                    </div>
                    <div className={classes.inputContainer}>
                      <label className={classes.inputTitle}>Nom</label>
                      <div style={{ position: 'relative', display: 'flex' }}>
                        <Input required autoComplete="family-name" placeholder='Dupont' onChange={(e) => setLastname(e.target.value)} value={lastname} type='text' />
                      </div>
                    </div>
                  </div>

                  <div className={classes.inputs}>
                    <div className={classes.inputContainer} style={{width: "35%", maxWidth: "35%"}}>
                      <label className={classes.inputTitle}>Position</label>
                      <div style={{ position: 'relative', display: 'flex' }}>
                        <Input required autoComplete="organization-title" placeholder='CEO' onChange={(e) => setPosition(e.target.value)} value={position} type="text" />
                      </div>
                    </div>
                    <div className={classes.inputContainer} style={{width: "61%", maxWidth: "61%"}}>
                      <label className={classes.inputTitle}>Adresse e-mail professionnelle</label>
                      <div style={{ position: 'relative', display: 'flex' }}>
                        <Input required placeholder='jean.dupont@signally.io' onChange={(e) => { setEmail(e.target.value) }} value={email} autoComplete="email" type="email" />
                      </div>
                    </div>
                  </div>
                  <div className={classes.inputContainer}>
                    <label className={classes.inputTitle}>Mot de passe</label>
                    <div style={{ position: 'relative', display: 'flex' }}>
                      <Input required placeholder={showPass ? "Mot de passe" : "********"} onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="new-password" type={showPass ? "text" : "password"} />
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
                      <Input required autoComplete="organization" placeholder='Signally' onChange={(e) => setSocietyName(e.target.value)} value={societyName} type="text" />
                      <div className={classes.spacing}></div>
                      <label className={classes.inputTitle}>SIREN</label>
                      <div style={{ position: 'relative', display: 'flex', marginBottom: 15 }}>
                        <Input required placeholder='443061841' onClick={() => setSiren('443061841')} onChange={(e) => setSiren(e.target.value)} value={siren} type="text" />
                      </div>
                    </div>
                    <div className={classes.inputContainer}>
                      <label className={classes.inputTitle}>Nombre de collaborateurs</label>
                      <div style={{ position: 'relative', display: 'flex' }}>
                        <CustomSelect styleList={{ height: '10.5rem' }} onChange={(e) => setNbPerson(e)} items={nbs} getValue={'name'} display={'name'} />
                      </div>
                    </div>
                  </div>
                  <Button style={{ width: '40%', marginTop: '1rem' }} defaultBgColor={'transparent'} color={valid ? "orangeFill" : "orange"} type="submit">S'inscrire</Button>
                </form>
              </div>}
        </div>
      </div>
    </div>)
}

export default Signup;
