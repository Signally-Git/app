import { BrowserView, MobileView } from 'react-device-detect'
import SignaturePreview from '../components/Dashboard/Home/signaturePreview'
import CreateSignatureComponent from '../components/Dashboard/Signatures/createSignature/createSignature'
import CreateSignatureComponentDesktop from '../components/Dashboard/Signatures/createSignatureDesktop/createSignature'
import Dashboard from './Dashboard'

function CreateSignature() {
    return (<div>
        <MobileView>
            <CreateSignatureComponent />
        </MobileView>
        <BrowserView>
            <Dashboard page="create-signature" />
        </BrowserView>
    </div>)
}

export default CreateSignature