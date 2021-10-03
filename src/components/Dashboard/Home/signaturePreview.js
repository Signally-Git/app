import classes from './signaturePreview.module.css'
import SignaturePreviewImg from '../../../assets/img/signallypreview.svg'
import { BrowserView, MobileView } from 'react-device-detect'
import { useState } from 'react'

function SignaturePreview() {
    const [stats, setStats] = useState(false)

    return (
        <div className={classes.container} onClick={() => setStats(!stats)}>
            <div className={classes.row}>
                <MobileView>
                    <p>Votre signature</p>
                </MobileView>
                <BrowserView>
                    <h5>Signature active</h5>
                </BrowserView>
                {JSON.parse(localStorage.getItem("user"))?.is_deployed ? <>
                    <span className={classes.status}>Active <div className={classes.active}></div></span>
                </> : <>
                    <span className={classes.status}>Inactive <div className={classes.inactive}></div></span>
                </>}
            </div>
            <div className={classes.previewContainer}>
                <div>
                <img src={SignaturePreviewImg} alt="Signature preview" />
                <div className={classes.signText}>
                    <h3>Benjamin Morgaine</h3>
                    <p>CEO</p>
                    <h4>Signally</h4>
                    <p>44 Boulevard Hausmann 75009 Paris</p>
                    <p>T <span className={classes.orangeTxt}>0624927190</span> / M <span className={classes.orangeTxt}>0175298234</span></p>
                </div>
                </div>
                {stats ?
                <div className={classes.stats}>
                    <img src='https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fh5p.org%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium-logo%2Fpublic%2Flogos%2Fchart-icon-color.png%3Fitok%3DkpLTYHHJ&sp=1633294646Te40312a64c82f7e9834ca7bfaf8bba6ab184e28fa2fb710cac59847851007d7a' alt=''/>
                </div> : ""}
            </div>
        </div>
    )
}

export default SignaturePreview