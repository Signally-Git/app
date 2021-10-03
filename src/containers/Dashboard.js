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
import PastEvents from '../components/Dashboard/Events/PastEvents/PastEvents'
import Profile from '../components/Dashboard/Profile/profile'

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import axios from 'axios'
import { API } from '../config'
import RenderHTML from '../components/Dashboard/Signatures/createSignature/RenderHTML/RenderHTML'

function Dashboard(props) {
    const [isHeader, setIsHeader] = useState("")
    const [createEvent, setCreateEvent] = useState(null)
    const userId = JSON.parse(localStorage.getItem("user")).id
    const [user, setUser] = useState()
    const [template, setTemplate] = useState()
    const [stat, setStat] = useState(false)
    const [data, setData] = useState([])
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
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}?access_token=${localStorage.getItem("token")}`).then((res) => {
            setOrganisation(res.data)
        })
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
                            <img src='https://dummyimage.com/60.png' alt='' />
                            <p>{JSON.parse(localStorage.getItem('user'))?.first_name}</p>
                            <p className={classes.capitalize}>{JSON.parse(localStorage.getItem('user'))?.last_name}</p>
                        </div>
                        <Menu className={classes.menu} page={props.page} />
                    </div>

                    <div className={classes.dashboardContainer}>
                        {props.page === 'home' ?
                            <>
                            <h1 className={classes.h1}>Bonjour {JSON.parse(localStorage.getItem('user'))?.first_name}</h1>
                                <div onClick={() => setStat(!stat)}>
                                    <h5>Signature active</h5>
                                    <div className={classes.signatureContainer}>
                                        <div className={classes.signaturePreview}>
                                            <RenderHTML template={template} data={data} />
                                        </div>
                                        {stat ?
                                            <div>
                                                <img src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fh5p.org%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium-logo%2Fpublic%2Flogos%2Fchart-icon-color.png%3Fitok%3DkpLTYHHJ&sp=1633294646Te40312a64c82f7e9834ca7bfaf8bba6ab184e28fa2fb710cac59847851007d7a" />
                                            </div> : ""}
                                    </div>
                                </div>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard