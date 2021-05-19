import classes from './signaturePreview.module.css'
import SignaturePreviewImg from '../../../assets/img/signallypreview.svg'

function SignaturePreview() {
    return (
        <div className={classes.container}>
            <div className={classes.row}>
                <p>Votre signature</p>
                <span className={classes.status}>Active <div className={classes.active}></div></span>
            </div>
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
        </div>
    )
}

export default SignaturePreview