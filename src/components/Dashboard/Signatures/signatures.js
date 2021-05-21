import classes from './signatures.module.css'
import SignaturePreviewImg from '../../../assets/img/signallypreview.svg'

function Signatures(props) {
    props.handleHeader("Signatures")
    return (<div className={classes.container}>
        <span>2 modèles</span>
        <ul>
            <li>
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
            </li>
            <li className={classes.inactiveSignature}>
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
            </li>
        </ul>
    </div>)
}

export default Signatures