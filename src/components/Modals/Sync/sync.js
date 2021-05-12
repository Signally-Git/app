import classes from './sync.module.css'
import Cross from '../../../assets/icons/cross.svg'
import SyncIcon from '../../../assets/icons/sync.svg'
import { useState } from 'react'
import Outlook from '../../../assets/icons/outlook.svg'
import Gmail from '../../../assets/icons/gmail.svg'
import AppStore from '../../../assets/icons/appstore.svg'
import ChevronRight from '../../../assets/icons/chevron-right.svg'

function Sync() {
    const [isClosed, setIsClosed] = useState(false)
    return (
        <div className={classes.container} style={{display: !isClosed ? "block" : "none"}}>
            <div>
                <img src={SyncIcon} alt="synchronize" />
                <span>Synchronisez votre client mail</span>
                <img src={Cross} alt="close" onClick={() => setIsClosed(true)} />
            </div>
            <ul>
                <li>
                    <img src={Outlook} alt="Outlook" />
                </li>
                <li>
                    <img src={Gmail} alt="Gmail" />
                </li>
                <li>
                    <img src={AppStore} alt="Apple Mail" />
                </li>
                <li>
                    <img src={ChevronRight} alt="Synchronize" className={classes.blackImg} />
                </li>
            </ul>
        </div>
    )
}

export default Sync