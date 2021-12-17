import classes from './desktopevents.module.css'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from 'config'
import ListItem from '../Teams/Team/user'
import RenderHTML from '../Signatures/createSignature/RenderHTML/RenderHTML'
import ChevronRight from 'Assets/icons/chevron-right.svg'
import ArrowRight from 'Assets/icons/arrow-right.svg'
import { HiOutlineSearch } from 'react-icons/hi'

let countPast = 0
let countCurrent = 0
let countIncoming = 0
function Events() {

    const [active, setActive] = useState("present")
    const [template, setTemplate] = useState()
    const [data, setData] = useState([])
    const [preview, setPreview] = useState()
    const [activeEvents, setActiveEvents] = useState([])

    useEffect(async () => {
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/campaigns?access_token=${localStorage.getItem("token")}`).then((res) => {
            setActiveEvents(res.data.data)
        })
    }, [])

    useEffect(async () => {
        countPast = 0
        countCurrent = 0
        countIncoming = 0
    })

    useEffect(() => {
        console.log(preview)
    }, [preview])

    return (
        <div>
            <div className={classes.container}>
                <h1>Évènements</h1>
                <div className={classes.teamsContainer}>
                    <ul className={classes.menu}>
                        <li onClick={() => setActive("past")} className={active === "past" ? classes.active : ""}>Passés</li>
                        <li onClick={() => setActive("present")} className={active === "present" ? classes.active : ""}>En cours</li>
                        <li onClick={() => setActive("incoming")} className={active === "incoming" ? classes.active : ""}>À venir</li>
                    </ul>
                    {active === "past" ?
                        <div>
                            <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input className={classes.search} type="text" placeholder="Rechercher un évènement" />
                                </div>
                            <span>{countPast} évènements</span>
                            <ul className={classes.itemsList}>
                                {activeEvents.map((activeEvent, index) => {
                                    console.log(activeEvent)
                                    if (new Date(activeEvent.end_date) < new Date()) {
                                        countPast++
                                        return (
                                            <li key={index} onClick={() => setPreview(activeEvent)} tabIndex={index}>
                                                <div className={classes.eventText}>
                                                    <span className={classes.active}>{activeEvent.name}</span>
                                                    <span className={classes.duration}>
                                                        {new Date(activeEvent.start_date).toLocaleString([], { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        <img src={ArrowRight} className={classes.arrow} alt="arrow" />
                                                        {new Date(activeEvent.end_date).toLocaleString([], { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>

                                                </div>
                                                {/* <img src={ChevronRight} className={classes.chevron} alt="Click" /> */}
                                            </li>
                                        )
                                    }
                                })
                                }
                            </ul>
                        </div>
                        : active === "present" ?
                            <div>
                                <div className={classes.btn}>Ajouter un évènement</div>
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input className={classes.search} type="text" placeholder="Rechercher un évènement" />
                                </div>
                                <span>{countCurrent} évènements</span>
                                <ul className={classes.itemsList}>
                                    {activeEvents.map((activeEvent, index) => {
                                        console.log(activeEvent)
                                        if (activeEvent.active) {
                                            countCurrent++
                                            return (
                                                <li key={index} onClick={() => setPreview(activeEvent)} tabIndex={index}>
                                                    <div className={classes.eventText}>
                                                        <span className={classes.active}>{activeEvent.name}</span>
                                                        <span className={classes.duration}>
                                                            {new Date(activeEvent.start_date).toLocaleString([], { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            <img src={ArrowRight} className={classes.arrow} alt="arrow" />
                                                            {new Date(activeEvent.end_date).toLocaleString([], { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>

                                                    </div>
                                                    {/* <img src={ChevronRight} className={classes.chevron} alt="Click" /> */}
                                                </li>
                                            )
                                        }
                                    })
                                    }
                                </ul>
                            </div> :
                            <div>
                                <div className={classes.btn}>Ajouter un évènement</div>
                                <div className={classes.searchInput}>
                                    <HiOutlineSearch />
                                    <input className={classes.search} type="text" placeholder="Rechercher un évènement" />
                                </div>
                                <span>{countIncoming} évènements</span>
                                <ul className={classes.itemsList}>
                                    {activeEvents.map((activeEvent, index) => {
                                        if (new Date(activeEvent.start_date) > new Date()) {
                                            countIncoming++
                                            return (
                                                <li key={index} onClick={() => setPreview(activeEvent)} tabIndex={index}>
                                                    <div className={classes.eventText}>
                                                        <span className={classes.active}>{activeEvent.name}</span>
                                                        <span className={classes.duration}>
                                                            {new Date(activeEvent.start_date).toLocaleString([], { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            <img src={ArrowRight} className={classes.arrow} alt="arrow" />
                                                            {new Date(activeEvent.end_date).toLocaleString([], { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>

                                                    </div>
                                                    {/* <img src={ChevronRight} className={classes.chevron} alt="Click" /> */}
                                                </li>
                                            )
                                        }
                                    })
                                    }
                                </ul>
                            </div>}
                </div>
                {preview ? 
                <div className={classes.eventPreview}>
                    <h2><span className={classes.orangeTxt}>{preview.name}</span></h2>
                    <img src={preview?.banner.path} />
                </div> : ""}
            </div>
        </div>)
}

export default Events