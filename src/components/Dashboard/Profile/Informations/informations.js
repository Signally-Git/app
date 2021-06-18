import { useState } from 'react'
import classes from './informations.module.css'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import {
    FaLink,
    FaInstagram,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
  } from "react-icons/fa";

function Informations() {
    const [tab, setTab] = useState(true)
    const [social, setSocial] = useState([""])
    const [icon, setIcon] = useState([<FaLink />])

    const handleSocial = (string, index) => {
        social[index] = string;
        setSocial([...social]);
    
        switch (string) {
          case "Twitter":
            icon[index] = <FaTwitter />
            setIcon([...icon])
            break;
    
          case "Facebook":
            icon[index] = <FaFacebookF />
            setIcon([...icon])
            break;
    
          case "Instagram":
            icon[index] = <FaInstagram />
            setIcon([...icon])
            break;
    
          case "Linkedin":
            icon[index] = <FaLinkedinIn />
            setIcon([...icon])
            break;
    
          default:
            icon[index] = <FaLink />
            setIcon([...icon])
            break;
        }
      }
    return (
        <div className={classes.container}>
            <label className={classes.switch}>
                <div className={classes.tabTitles}>
                    <span>Société</span>
                    <span>Personnelles</span>
                </div>
                <input type="checkbox" onChange={() => setTab(!tab)} />
                <div className={classes.slider}></div>
            </label>
            {tab ? <>
                <div className={classes.inputsContainer}>
                    <div className={classes.inputContainer}>
                        <label>Nom société</label>
                        <input type="text" />
                    </div>
                    <div className={classes.inputContainer}>
                        <label>Adresse</label>
                        <input type="text" />
                    </div>
                    <div className={classes.inputContainer}>
                        <label>Site web</label>
                        <input type="text" />
                    </div>
                    <div className={classes.iconsContainer}>
                        <label htmlFor="socials">Réseaux sociaux</label>
                        <AiOutlinePlusCircle onClick={() => { setSocial(social.concat("")); setIcon(icon.concat(<FaLink />)) }} />
                    </div>
                    {
                        social.map((rs, index) => {
                            return (
                                <div className={classes.iconInput} key={index}>
                                    {icon[index]}
                                    <input type="text" placeholder="URL" value={rs} onChange={(e) => handleSocial(e.target.value, index)} />
                                </div>)
                        })
                    }
                </div>
                <button className={classes.btn}>Sauvegarder</button>
            </> : <>
                <div className={classes.inputsContainer}>
                    <div>
                        <div className={classes.inputContainer}>
                            <label>Prénom</label>
                            <input type="text" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Nom</label>
                            <input type="text" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Poste / Fonction</label>
                            <input type="text" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Email</label>
                            <input type="mail" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Téléphone mobile</label>
                            <input type="tel" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Téléphone fixe</label>
                            <input type="tel" />
                        </div>
                    </div>
                </div>
                <button className={classes.btn}>Sauvegarder</button>
            </>
            }
        </div>
    )
}

export default Informations