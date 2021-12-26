import classes from '../components/Dashboard/dashboard.module.css'
import Tiles from '../components/Dashboard/Home/tiles'
import Signatures from '../components/Dashboard/Signatures/signatures/signatures'
import Events from '../components/Dashboard/Events/events'
import CreateEvent from '../components/Dashboard/Events/CreateEvent/createEvent'
import { useEffect, useState } from 'react'
import Profile from '../components/Dashboard/Profile/profile'
import Chart from 'react-apexcharts'

import axios from 'axios'
import { API } from 'config'
import Users from '../components/Dashboard/Users/users'
import CreateSignature from '../components/Dashboard/Signatures/create/createSignature'
import { Link } from 'react-router-dom'
import { UseEvents } from 'Utils/useEvents/useEvents'
import ReadOnlyPreview from 'Desktop/components/Dashboard/Signatures/create/Preview/readOnlyPreview'

let count = 0;

function Dashboard(props) {
    const [isHeader, setIsHeader] = useState("")
    const [createEvent, setCreateEvent] = useState(null)
    const userId = JSON.parse(localStorage.getItem("user"))?.id
    const [user, setUser] = useState()
    const [template, setTemplate] = useState()
    const [templateName, setTemplateName] = useState()
    const [stat, setStat] = useState(true)
    const [statEvent, setStatEvent] = useState(true)
    const [data, setData] = useState([])
    const [activeEvents, setActiveEvents] = useState()
    const [organisation, setOrganisation] = useState()
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: 'apexchart-example', toolbar: {
                show: false
            },
            animations: {
                enabled: false,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        markers: {
            size: 4,
        },
        colors: ['#ff7954'],
        xaxis: {
            categories: ["L", "M", "M", "J", "V", "S", "D"]
        },
    })
    const [chartOptionsEvents, setChartOptionsEvents] = useState({
        chart: {
            id: 'apexchart-example', toolbar: {
                show: false
            },
            animations: {
                enabled: false,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        markers: {
            size: 4,
        },
        colors: ['#66433e'],
        xaxis: {
            categories: ["L", "M", "M", "J", "V", "S", "D"]
        },
    })
    const [chartSeries, setChartSeries] = useState([{ name: 'CPM signature', type: "line", data: [30, 40, 45, 50, 49, 22, 70] }])
    const [chartSeriesEvents, setChartSeriesEvents] = useState([{ name: 'CPM bannière', type: "line", data: [18, 24, 11, 14, 25, 22, 23] }])

    useEffect(async () => {
        await axios.get(`${API}user/${userId}?access_token=${localStorage.getItem("token")}`).then(async (res) => {
            setUser(res.data)
            if (res.data.signature)
                await axios.get(`${API}template/${res.data?.signature?.id}?access_token=${localStorage.getItem("token")}`).then((res) => {
                    setTemplate(res.data.signatureData)
                    setTemplateName(res.data.name)
                })
        })

        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user"))?.organisation_id}?access_token=${localStorage.getItem("token")}`).then((res) => {
            setOrganisation(res.data)
        })

    }, [])

    useEffect(() => {
        const getEvents = async () => {
            const eventAPI = await UseEvents(localStorage.getItem("organisation_id"), 'active')
            setActiveEvents(eventAPI)
        }
        getEvents()
        count = 0;
    }, [])

    useEffect(() => {
        setData({
            logo: organisation?.logo?.path,
            firstName: user?.first_name,
            lastName: user?.last_name,
            jobName: user?.position,
            entity: organisation?.name,
            address: organisation?.address,
            mobile: user?.phone_number,
            phone: organisation?.phone_number
        })
    }, [user, template, organisation])

    return (
        <>
            {props.page === 'home' ?
                <>
                    {/* <h1 className={classes.h1}>Bonjour {JSON.parse(localStorage.getItem('user'))?.first_name}</h1> */}
                    <h1>Dashboard</h1>
                    <div className={classes.row}>
                        {(activeEvents?.length > 0 || template) &&
                            <div className={classes.col}>
                                {template &&
                                    <div onClick={() => setStat(!stat)}>
                                        <div className={`${classes.signatureContainer} ${stat ? classes.open : classes.closed}`}>
                                            <div className={classes.signaturePreview}>
                                                <h5>Signature active <Link to="/signatures">{templateName}</Link></h5>
                                                <ReadOnlyPreview template={template} infos={data} />
                                            </div>
                                            {stat ?
                                                <div className={classes.chartContainer}>
                                                    <Chart options={chartOptions} series={chartSeries} width={190} height={220} />
                                                </div> : ""}
                                        </div>
                                    </div>}
                                {activeEvents ?
                                    activeEvents[0] &&
                                    <div onClick={() => setStat(!stat)}>
                                        <div className={`${classes.signatureContainer} ${stat ? classes.open : classes.closed}`}>
                                            <div className={classes.eventPreview}>
                                                <h5>Event actif <Link to="/signatures">{activeEvents[0]?.name}</Link></h5>
                                                <img className={classes.banner} src={API+activeEvents[0]?.imagePath} />
                                                <span className={classes.duration}>
                                                    <div className={`${classes.col} ${classes.bold}`}>
                                                        <span>{`du ${new Date(activeEvents[0]?.startAt).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric' })}`}</span>
                                                        <span>{`au ${new Date(activeEvents[0]?.endAt).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric' })}`}</span>
                                                    </div>
                                                    <div className={classes.col}>
                                                        <span>{`${new Date(activeEvents[0].startAt).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`}</span>
                                                        <span>{`${new Date(activeEvents[0]?.endAt).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`}</span>
                                                    </div>
                                                </span>
                                            </div>
                                            {statEvent ?
                                                <div className={classes.chartContainer}>
                                                    <Chart options={chartOptionsEvents} series={chartSeriesEvents} width={190} height={220} />
                                                </div>
                                                : ""}
                                        </div>
                                    </div>
                                    : ""}
                            </div>}
                        <div className={classes.col}>
                            <div className={classes.tilesContainer}>
                                <Tiles handleHeader={setIsHeader} />
                            </div>
                        </div>
                    </div>
                    {/* <div className={classes.spacer}></div> */}
                </> : props.page === 'teams' ?
                    <>
                        <Users />
                    </> : props.page === 'signatures' ?
                        <>
                            <Signatures />
                        </> : props.page === 'create-signature' ?
                            <>
                                <CreateSignature />
                            </> : props.page === 'events' ?
                                <>
                                    <Events />
                                </> : props.page === 'create-event' ?
                                    <>
                                        <CreateEvent handleHeader={setIsHeader} />
                                    </> : props.page === 'profile' ?
                                        <>
                                            <Profile handleHeader={setIsHeader} header={isHeader} create={setCreateEvent} />
                                        </> : null}
        </>
    )
}

export default Dashboard