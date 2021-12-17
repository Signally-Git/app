import classes from './users.module.css'
import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { API } from 'config'
import { HiOutlineSearch } from 'react-icons/hi'
import Tab from './Tab/tab'
import SignaturePreview from './SignaturePreview/signaturePreview'

function Team() {
    const [active, setActive] = useState("groups")
    const [entity, setEntity] = useState()
    
    return (
        <div>
            <div className={classes.container}>
                <h1>Teams</h1>
                <div className={classes.teamsContainer}>
                    <ul className={classes.menu}>
                        <li onClick={() => setActive("groups")} className={active === "groups" ? classes.active : ""}>Hotels</li>
                        <li onClick={() => setActive("teams")} className={active === "teams" ? classes.active : ""}>Équipes</li>
                        <li onClick={() => setActive("users")} className={active === "users" ? classes.active : ""}>Collaborateurs</li>
                    </ul>
                    <Tab tab={active} selected={entity} setSelected={setEntity} />
                </div>
                {entity ?
                    <div className={classes.overflow}>
                        <div className={classes.signaturePreview}>
                            <SignaturePreview show={entity} />
                        </div>
                        {entity.type === "team" ? 
                        <div className={classes.teamAssignment}>
                            <div className={classes.col}>
                                <h2>Membres de l'équipe </h2>
                                <span>{entity.users} collaborateurs</span>
                                <ul className={`${classes.itemsList} ${classes.users}`}>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                    <li tabIndex="0">Sylvain</li>
                                </ul>
                            </div>
                            <div className={classes.col}>
                                <h2>Autres collaborateurs</h2>
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input className={classes.search} type="text" placeholder="Rechercher un collaborateur" />
                                </div>
                                <ul className={classes.itemsList}>
                                    <li tabIndex="0">Sylvain</li>
                                    <li tabIndex="0">Benjamin</li>
                                </ul>
                            </div>
                        </div> : ""}
                    </div> : ""}
            </div>
        </div>)
}

export default Team