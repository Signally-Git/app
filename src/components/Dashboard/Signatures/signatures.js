import classes from './signatures.module.css'
import SignaturePreviewImg from '../../../assets/img/signallypreview.svg'
import { Link, Route } from 'react-router-dom'
import Signature from './Signature/signature'
import { useEffect } from 'react'

function Signatures(props) {
    useEffect(() => {
        props.handleHeader("Signatures")
        props.create("/create-signature")
    }, [])
    return (
        <div>

            <Route exact path="/signatures">
                <div className={classes.container}>
                    <span>2 modèles</span>
                    <ul>
                        <li>
                            <Link to="signatures/model1">
                                <h2 className={classes.active}>Modèle 1</h2>
                                <div className={classes.previewContainer}>
                                    <img src={SignaturePreviewImg} alt="Signature preview" />
                                    <div className={classes.signText}>
                                        <h3>Benjamin Morgaine</h3>
                                        <p>CEO</p>
                                        <h4>Signally</h4>
                                        <p>44 Boulevard Hausmann 75009 Paris</p>
                                        <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li className={classes.inactiveSignature}>
                            <Link to="signatures/model2">
                                <h2 className={classes.inactive}>Modèle 2</h2>
                                <div className={classes.previewContainer}>
                                    <img src={SignaturePreviewImg} alt="Signature preview" />
                                    <div className={classes.signText}>
                                        <h3>Benjamin Morgaine</h3>
                                        <p>CEO</p>
                                        <h4>Signally</h4>
                                        <p>44 Boulevard Hausmann 75009 Paris</p>
                                        <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Route>
            <Route path="/signatures/model1">
                <Signature model="Modèle 1" handleHeader={props.handleHeader} create={props.create} />
            </Route>
            <Route path="/signatures/model2">
                <Signature model="Modèle 2" handleHeader={props.handleHeader} create={props.create} />
            </Route>
        </div>)

}

export default Signatures