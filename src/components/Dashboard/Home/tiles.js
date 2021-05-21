import ChevronRight from '../../../assets/icons/chevron-right.svg'
import Sync from '../../Modals/Sync/sync'
import classes from './tiles.module.css'
import SignaturePreview from '../Home/signaturePreview'
import { Link } from 'react-router-dom'

function Tiles(props) {
    props.handleHeader(" ")
    return (
        <div className={classes.container}>
            <h1>Bonjour Benjamin</h1>
            <div className={classes.tilesList}>
                <div className={classes.tile}>
                    <div className={classes.row}>
                        <p>Signatures</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>2</span>
                            <span> /38</span>
                        </div>
                        <span>actives</span>
                    </div>
                </div>
                <div className={classes.tile}>
                    <div className={classes.row}>
                        <p>Évènements</p>
                        <img src={ChevronRight} alt="View" />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>4</span>
                            <span> /5</span>
                        </div>
                        <span>actifs</span>
                    </div>
                </div>
                <div className={classes.tile}>
                    <div className={classes.row}>
                        <p>Utilisateurs</p>
                        <img src={ChevronRight} alt="View" className={classes.blackImg} />
                    </div>
                    <div className={classes.row}>
                        <div>
                            <span className={classes.bigTxt}>36</span>
                            <span> /38</span>
                        </div>
                        <span>actifs</span>
                    </div>
                </div>
            </div>
            
            <SignaturePreview />
            {/* <div className={classes.watermark}>
                <h3>Signally</h3>
            </div> */}
            <Link to="/synchronize" className={classes.syncContainer}>
                <Sync />
            </Link>
        </div>
    )
}

export default Tiles