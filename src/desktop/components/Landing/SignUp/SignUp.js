import React, { useState } from 'react';
import Button from 'Utils/Button/btn';
import Input from 'Utils/Input/input';

import classes from '../landing.module.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [society, setSociety] = useState('')
  const [nbPerson, setNbPerson] = useState({
    min: 0,
    max: 20
  })


  return (<div className={classes.container}>
    <div className={classes.formContainer}>
      <form>
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
        <div className={classes.inputContainer}>
          <label className={classes.inputTitle}>Société</label>
          <div style={{ position: 'relative', display: 'flex' }}>
            <Input placeholder='JeanMass' onChange={(e) => setSociety(e.target.value)} value={society} type="email" />
          </div>
        </div>
        <div className={classes.inputContainer}>
          <label className={classes.inputTitle}>Nombre d'employés</label>
          <div style={{ position: 'relative', display: 'flex', marginTop: 15, marginBottom: 15 }}>
          
          </div>
        </div>
        <div className={classes.inputContainer}>
          <label className={classes.inputTitle}>Adresse e-mail</label>
          <div style={{ position: 'relative', display: 'flex' }}>
            <Input placeholder='dupont-pro@gmail.com' onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
          </div>
        </div>
        <Button color="orangeFill" type="submit">S'inscrire</Button>
      </form>
    </div>
    <div className={classes.textIllustration}>
      <div>
          <h1>Pourquoi s'inscrire ?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. <span>Tempore</span> molestias animi, illum iusto, cumque, laudantium a consectetur fugiat ex nisi ipsa. Consequuntur dolorum obcaecati magni perspiciatis ipsam necessitatibus, sequi quasi?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore molestias animi, illum iusto, cumque, <span>laudantium</span> a consectetur fugiat ex nisi ipsa. Consequuntur dolorum obcaecati magni <span>perspiciatis</span> ipsam necessitatibus, sequi quasi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. porro quas repudiandae laborum! Quidem, incidunt blanditiis.
          </p>
      </div>
      <div className={classes.signaturePrice}>
        {/* <img className={classes.glossy} src={Glossy} alt="" /> */}
        <div>
          <h2>Votre abonnement</h2>
          <h3>Une signature</h3>
          <p>
            {Number.parseFloat(0.5 * ((nbPerson.max - nbPerson.min) / 100)).toPrecision(2)} € / mois / utlisateur
          </p>
        </div>
        <div className={classes.ammount}>
          <h4 className={classes.price}>
            {Number.parseFloat(0.5 * ((nbPerson.max - nbPerson.min) / 100)).toPrecision(2)} €
            <span>/ mois</span>
          </h4>
        </div>
      </div>
      <div>
      </div>
    </div>
  </div>)
}

export default Signup;
