import CopySignatureComponent from 'Desktop/components/CopySignature/CopySignature';
import classes from './CopySignature.module.css'

function CopySignature () {
    return (<div className={classes.container}>
            <CopySignatureComponent />
        </div>)
}

export default CopySignature;