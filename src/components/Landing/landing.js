import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Link } from 'react-router-dom'

import classes from './landing.module.css'
import LightBulb from '../../assets/icons/lightbulb.svg'
import Integration from '../../assets/img/integrations.png'
import LinkedIn from '../../assets/img/linked_in.png'
import Facebook from '../../assets/img/facebook.png'
import Twitter from '../../assets/img/twitter.png'
import Vimeo from '../../assets/img/vimeo.png'
import Instagram from '../../assets/img/instagram.png'
import Personnalisation from '../../assets/img/personnalisation.svg'
import Installation from '../../assets/img/installation.svg'
import Outlook from '../../assets/icons/outlook.svg'
import Gmail from '../../assets/icons/gmail.svg'
import Administration from '../../assets/img/administration.svg'
import FirstScreen from '../../assets/img/first-screen.png'
import SecondScreen from '../../assets/img/second-screen.png'
import Logo from '../Logo/logo'

const breakpoint = 768

function useWindowPosition() {
    const [scrollPosition, setPosition] = useState(0)

    useLayoutEffect(() => {
      function updatePosition() {
        setPosition(window.pageYOffset)
      }

      window.addEventListener('scroll', updatePosition)

      updatePosition()

      return () => window.removeEventListener('scroll', updatePosition)
    }, [])

    return scrollPosition
}

function FadeInSection(props) {
    const [isVisible, setVisible] = useState(false)
    const domRef = React.useRef()
    const { width } = useViewport()

    const isDesktop = width > breakpoint

    useEffect(() => {
        if (!props.hasReach && isDesktop) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    setTimeout(() => {
                        setVisible(entry.isIntersecting)
                    }, props.delay)
                })
            })
              
            observer.observe(domRef.current)
        } else if (!isDesktop) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => setVisible(entry.isIntersecting))
            })
              
            observer.observe(domRef.current)
        }
    }, [isDesktop, props])

    return (
      <div
        className={`${props.effect} ${isVisible && !props.hasReach ? classes.isVisible : props.hasReach ? classes.isVisible : ''}`}
        ref={domRef}
      >
        {props.children}
      </div>
    )
}

const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
  
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);

      return () => window.removeEventListener("resize", handleWindowResize);
    }, [])
  
    return { width }
  }

const Landing = () => {
    const [buttonState, setButtonState] = useState(false)
    const [buttonLeft, setButtonLeft] = useState(false)
    const [buttonRight, setButtonRight] = useState(false)

    const [reached, setReached] = useState(false)

    const { width } = useViewport()

    const scrollPosition = useWindowPosition()

    useEffect(() => {
        if (scrollPosition >= 2100) {
            setReached(true)
        }
    }, [scrollPosition])

    return (
        <div className={classes.container}>
            <section className={classes.orangeContainer}>
                <div className={classes.textDiv}>
                    <div style={{ width: `${width > breakpoint ? '50%' : '100%'}` }}>
                        <p className={classes.label}>
                            <img src={LightBulb} alt="lightbulb" /> Gratuit pour une signature
                        </p>
                        <h1>Gérez simplement<br /> les signatures d’e-mail <br />de votre société</h1>
                        <p>TPE, PME, Indépendants, Auto-entrepreneurs, Freelance, avec Signally votre signature d’email devient dynamique et renforce votre communication.</p>
                        {width <= breakpoint && 
                            <div className={classes.previewSign}>
                                <div className={classes.signaturePreview}>
                                    <img src={Vimeo} alt="John Doe" />
                                    <div>
                                        <h4>John Doe</h4>
                                        <p>CEO</p>
                                        <h5>Signally</h5>
                                        <p>44 Boulevard Hausmann 75009 Paris</p>
                                        <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                                    </div>
                                </div>
                            </div>
                        }                       
                        <button 
                            onMouseOver={() => setButtonState(true)} 
                            onMouseOut={() => setButtonState(false)} 
                            className={classes.orangeCTA}
                        >
                            Commencer 
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z" fill={!buttonState ? '#fff' : '#FF7954' }/>
                            </svg>
                        </button>
                    </div>
                    {width > breakpoint && <div style={{ width: '50%', padding: '5rem' }}>
                        <div className={classes.previewSign}>
                            <div className={classes.signaturePreview}>
                                <img src={Outlook} alt="John Doe" />
                                <div>
                                    <h4>John Doe</h4>
                                    <p>CEO</p>
                                    <h5>Signally</h5>
                                    <p>44 Boulevard Hausmann 75009 Paris</p>
                                    <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                                </div>
                                <div></div>
                            </div>
                            <div className={classes.signaturePreview}>
                            <img src={Vimeo} alt="John Doe" />
                                <div>
                                    <h4>Vanessa Limkpe</h4>
                                    <p>Directrice artistiaue</p>
                                    <h5>Signally</h5>
                                    <p>44 Boulevard Hausmann 75009 Paris</p>
                                    <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                                </div>
                                <div></div>
                            </div>
                            <div className={classes.signaturePreview}>
                                <img src={Gmail} alt="John Doe" />
                                <div>
                                    <h4>Jean Dujardin</h4>
                                    <p>Acteur</p>
                                    <h5>Hollywood</h5>
                                    <p>14 rue rousillion 34130 Montpellier</p>
                                    <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                                </div>
                                <div></div>
                            </div>
                            <div className={classes.signaturePreview}>
                                <img src={Twitter} alt="John Doe" />
                                <div>
                                    <h4>Orianne Pauleau</h4>
                                    <p>Responsable ressources humaines</p>
                                    <h5>Europa</h5>
                                    <p>10 rue saint germain 34214 Lyon</p>
                                    <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>}
                </div>
            </section>
            <div className={classes.centeredDiv}>
                <h2>Gérez facilement vos utilisateurs grâce aux intégrations Signally</h2>
                <p>Que ce soit sur mobile ou ordinateur, Signally intègre les solutions emailing : <br />Gmail, Microsoft 365 avec Outlook et Apple Mail</p>
                <img src={Integration} alt="Integrations" />
            </div>
            <section className={classes.whiteContainer}>
                <h2>Comment ça marche ?</h2>
                <p>En trois mots : Personnalisez, installez et administrez !</p>
                <div className={classes.stepsContainer}>
                    <FadeInSection delay='300' hasReach={reached} effect={classes.fadeInSection}>
                        <img src={Personnalisation} alt="personnalisation" loading="lazy" />
                        <h3>Personnalisation</h3>
                        <p>Créez votre signature en quelques clics seulement grâce à nos templates et personnalisez-la à l’aide de nos outils de création.</p>
                    </FadeInSection>
                    <FadeInSection delay='1200' hasReach={reached} effect={classes.fadeInSection} >
                        <img src={Installation} alt="installation" loading="lazy" />
                        <h3>Installation</h3>
                        <p>Les signatures d’email Signally s’installent automatiquement avec nos plug-in compatibles Office365, Gmail, et Apple Mail.</p>
                        </FadeInSection>
                    <FadeInSection delay='2400' hasReach={reached} effect={classes.fadeInSection}>
                        <img src={Administration} alt="administration" loading="lazy" />
                        <h3>Administration</h3>
                        <p>Signally vous permet de gérer extrêmement simplement l’ensemble de vos signatures d’email de votre entreprise.</p>
                    </FadeInSection>
                </div>
            </section>
            <section className={classes.textOnRight}>
                <FadeInSection delay='0' effect={classes.fadeInRightSection}>
                    <div className={`${classes.imgContainer} ${width < breakpoint && scrollPosition >= 1700 ? classes.fadeInFirstText : ''}`}>
                        <img src={FirstScreen} alt="Screenshot 1" />
                    </div>
                </FadeInSection>
                <div className={classes.txtContainer}>
                    <h3>Créez des équipes, attribuez vos signatures et planifiez le déploiement de vos bannières marketing</h3>
                    <p>Signally s’adapte à votre organisation. Créez des équipes et
                    déployez toutes vos signatures automatiquement à l’ensemble
                    de vos collaborateurs. Bénéficiez ainsi d’une communication
                    ultra-flexible et dynamique.</p>
                    <button 
                        onMouseOver={() => setButtonRight(true)} 
                        onMouseOut={() => setButtonRight(false)} 
                        className={classes.orangeCTA}
                    >
                        Commencer 
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z" fill={!buttonRight ? '#fff' : '#FF7954' }/>
                        </svg>
                    </button>
                </div>
            </section>
            <section className={classes.textOnLeft}>
                <div className={classes.txtContainer}>
                    <h3>Donnez une image moderne et singulière de votre entreprise à chaque envoi de mails.</h3>
                    <p>Notre outil de création permet une ultra-personnalisation de vos emails. Performant et simple, il vous permettra de réaliser une signature à votre image.</p>
                    <button 
                        onMouseOver={() => setButtonLeft(true)} 
                        onMouseOut={() => setButtonLeft(false)} 
                        className={classes.orangeCTA}
                    >
                        Commencer 
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z" fill={!buttonLeft ? '#fff' : '#FF7954' }/>
                        </svg>
                    </button>
                </div>
                <FadeInSection delay='0' effect={classes.fadeInSection}>
                    <div className={classes.imgContainer}>
                        <img src={SecondScreen} alt="Screenshot 2" />
                    </div>
                </FadeInSection>
            </section>
            <div className={classes.prefooter}>
                <div>
                    <Logo />
                    <p>Enfin un outil simple* pour créer, installer et gérer les signature d'email de son entreprise.</p>
                </div>
                <ul className={classes.socials}>
                    <li>
                        <spam className={classes.linkedin}>
                            <img src={LinkedIn} alt="LinkedIn" loading="lazy" />
                        </spam>
                    </li>
                    <li>
                        <spam className={classes.facebook}>
                            <img src={Facebook} alt="Facebook" loading="lazy" />
                        </spam>
                    </li>
                    <li>
                        <spam className={classes.twitter}>
                            <img src={Twitter} alt="Twitter" loading="lazy" />
                        </spam>
                    </li>
                    <li>
                        <spam className={classes.instagram}>
                            <img src={Instagram} alt="Instagram" loading="lazy" />
                        </spam>
                    </li>
                </ul>
            </div>
            <footer>
                <p>*Avec Signally, aucune connaissance technique n’est requise</p>
                <ul>
                    <li><Link to="legals">Mentions Légales</Link></li>
                    <li><Link to="dashboard">Contact</Link></li>
                </ul>
            </footer>
        </div>
    )
}

export default Landing