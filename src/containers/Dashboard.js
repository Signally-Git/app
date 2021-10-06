import HeaderMobile from '../components/Dashboard/Header/HeaderMobile'
import Header from '../components/Dashboard/Header/Header'
import classes from '../components/Dashboard/dashboard.module.css'
import Menu from '../components/Dashboard/Menu/Menu'
import Tiles from '../components/Dashboard/Home/tiles'
import Teams from '../components/Dashboard/Teams/teams'
import Signatures from '../components/Dashboard/Signatures/signatures'
import Events from '../components/Dashboard/Events/events'
import CreateEvent from '../components/Dashboard/Events/CreateEvent/createEvent'
import { useEffect, useState } from 'react'
import ArrowRight from '../assets/icons/arrow-right.svg'
import PastEvents from '../components/Dashboard/Events/PastEvents/PastEvents'
import Profile from '../components/Dashboard/Profile/profile'

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import axios from 'axios'
import { API } from '../config'
import RenderHTML from '../components/Dashboard/Signatures/createSignature/RenderHTML/RenderHTML'

let count = 0;

function Dashboard(props) {
    const [isHeader, setIsHeader] = useState("")
    const [createEvent, setCreateEvent] = useState(null)
    const userId = JSON.parse(localStorage.getItem("user"))?.id
    const [user, setUser] = useState()
    const [template, setTemplate] = useState()
    const [stat, setStat] = useState(false)
    const [statEvent, setStatEvent] = useState(false)
    const [data, setData] = useState([])
    const [activeEvents, setActiveEvents] = useState()
    const [organisation, setOrganisation] = useState()

    useEffect(async () => {
        await axios.get(`${API}user/${userId}?access_token=${localStorage.getItem("token")}`).then(async (res) => {
            setUser(res.data)
            if (res.data.signature)
                await axios.get(`${API}template/${res.data?.signature?.id}?access_token=${localStorage.getItem("token")}`).then((res) => {
                    setTemplate(res.data.signatureData)
                    console.log(res.data)
                })
        })

        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user"))?.organisation_id}?access_token=${localStorage.getItem("token")}`).then((res) => {
            setOrganisation(res.data)
        })

    }, [])

    useEffect(async () => {
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user"))?.organisation_id}/campaigns?access_token=${localStorage.getItem("token")}`).then((res) => {
            setActiveEvents(res.data.data)
            console.log("TEST", res.data.data[0])
        })
        count = 0;
    }, [])

    useEffect(() => {
        setData({
            firstName: user?.first_name,
            lastName: user?.last_name,
            poste: user?.position,
            company: organisation?.name,
            address: organisation?.address,
            mobile: user?.phone_number,
            phone: organisation?.phone_number
        })
    }, [user, template])

    if (isMobile)
        return (
            <div>
                {
                    isHeader?.length > 0 &&
                    <HeaderMobile page={props.page} title={isHeader} create={createEvent} />
                }
                {props.page === 'home' ? <>
                    <Tiles handleHeader={setIsHeader} />
                </> : props.page === 'teams' ?
                    <>
                        <Teams handleHeader={setIsHeader} create={setCreateEvent} />
                    </> : props.page === 'signatures' ?
                        <>
                            <Signatures handleHeader={setIsHeader} header={isHeader} create={setCreateEvent} />
                        </> : props.page === 'events' ?
                            <>
                                <Events handleHeader={setIsHeader} create={setCreateEvent} />
                            </> : props.page === 'create-event' ?
                                <>
                                    <CreateEvent handleHeader={setIsHeader} />
                                </> : props.page === 'past-events' ?
                                    <>
                                        <PastEvents handleHeader={setIsHeader} />
                                    </> : props.page === 'profile' ?
                                        <>
                                            <Profile handleHeader={setIsHeader} header={isHeader} create={setCreateEvent} />
                                        </> : null}
                <Menu page={props.page} />
            </div>
        )
    return (
        <div className={classes.desktop}>
            <div className={classes.desktopSubcontainer}>
                {
                    isHeader?.length > 0 &&
                    <Header page={props.page} user={JSON.parse(localStorage.getItem('user'))} title={isHeader} create={createEvent} />
                }
                <div className={classes.mainContent}>
                    <div className={classes.menuContainer}>
                        <div className={classes.userInfos}>
                            <img src={organisation?.logo?.path} alt='' />
                            <p>{JSON.parse(localStorage.getItem('user'))?.first_name}</p>
                            <p className={classes.capitalize}>{JSON.parse(localStorage.getItem('user'))?.last_name}</p>
                        </div>
                        <Menu className={classes.menu} page={props.page} />
                    </div>

                    <div className={classes.dashboardContainer}>
                        {props.page === 'home' ?
                            <>
                                {/* <h1 className={classes.h1}>Bonjour {JSON.parse(localStorage.getItem('user'))?.first_name}</h1> */}
                                <div onClick={() => setStat(!stat)}>
                                    <div className={`${classes.signatureContainer} ${stat ? classes.open : classes.closed}`}>
                                        <div className={classes.signaturePreview}>
                                            <h5>Signature active</h5>
                                            <RenderHTML template={template} data={data} />
                                        </div>
                                        {stat ?
                                            <div>
                                                <img src="http://fakeimg.pl/150x200?text=Statistics&font=lobster" />
                                            </div> : ""}
                                    </div>
                                </div>
                                <div className={classes.tilesContainer}>
                                    <Tiles handleHeader={setIsHeader} />
                                </div>
                                {/* <div className={classes.spacer}></div> */}
                                {activeEvents ?
                                    <div onClick={() => setStatEvent(!statEvent)} className={`${classes.eventText} ${statEvent ? classes.open : classes.closed}`}>
                                        <div>
                                            <h5>Évènement actif</h5>
                                            <img src={activeEvents[0]?.banner.path} />
                                            <br />
                                            <span className={classes.active}>{activeEvents[0]?.name}</span>
                                            <span className={classes.duration}>
                                                {new Date(activeEvents[0]?.start_date).toLocaleString([], { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}

                                                <img src={ArrowRight} className={classes.arrow} alt="arrow" />
                                                {new Date(activeEvents[0]?.end_date).toLocaleString([], { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        {statEvent ?
                                            <div>
                                                <img src="http://fakeimg.pl/150x200?text=Statistics&font=lobster" />
                                            </div> : ""}
                                    </div> : ""}
                            </> : props.page === 'teams' ?
                                <>
                                    <Teams handleHeader={setIsHeader} create={setCreateEvent} />
                                </> : props.page === 'signatures' ?
                                    <>
                                        <Signatures handleHeader={setIsHeader} header={isHeader} create={setCreateEvent} />
                                    </> : props.page === 'events' ?
                                        <>
                                            <Events handleHeader={setIsHeader} create={setCreateEvent} />
                                        </> : props.page === 'create-event' ?
                                            <>
                                                <CreateEvent handleHeader={setIsHeader} />
                                            </> : props.page === 'past-events' ?
                                                <>
                                                    <PastEvents handleHeader={setIsHeader} />
                                                </> : props.page === 'profile' ?
                                                    <>
                                                        <Profile handleHeader={setIsHeader} header={isHeader} create={setCreateEvent} />
                                                    </> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard