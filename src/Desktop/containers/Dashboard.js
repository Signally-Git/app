import classes from '../components/Dashboard/dashboard.module.css'
import Tiles from '../components/Dashboard/tiles'
import Signatures from '../views/Signatures/signatures'
import Events from '../views/Events/events'
import CreateEvent from '../views/Events/CreateEvent/createEvent'
import { useEffect, useState } from 'react'
import Profile from '../views/Profile/profile'
import Users from '../views/Users/users'
import CreateSignature from '../views/Signatures/create/createSignature'
import { UseEvents } from 'Utils/useEvents/useEvents'
import request from 'Utils/Request/request'
import News from 'Desktop/components/News/news'

let count = 0;

function Dashboard(props) {
    const [isHeader, setIsHeader] = useState("")
    const [createEvent, setCreateEvent] = useState(null)
    const [user, setUser] = useState()
    const [users, setUsers] = useState([])
    const [template, setTemplate] = useState()
    const [templateName, setTemplateName] = useState()
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
        await request.get(`whoami`).then(async (res) => {
            let users;
            setUser(res.data)
            setTemplate(res.data?.compiledSignature)
            setTemplateName(res.data?.signature?.name)
            await request.get('users').then((r) => users = r.data)
            await request.get(res.data?.organisation).then((r) => {
                setOrganisation({...r.data, ...organisation, users: users['hydra:member']})
            })
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
    }, [])

    return (
        <>
            {props.page === 'home' ?
                <>
                    {/* <h1 className={classes.h1}>Bonjour {JSON.parse(localStorage.getItem('user'))?.first_name}</h1> */}
                    <h1>Dashboard</h1>
                    <div className={classes.row}>
                        <News organisation={organisation} />
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