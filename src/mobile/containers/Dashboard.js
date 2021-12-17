import HeaderMobile from '../components/Dashboard/Header/HeaderMobile'
import Menu from '../components/Dashboard/Menu/Menu'
import Tiles from '../components/Dashboard/Home/tiles'
import Teams from '../components/Dashboard/Teams/teams'
import Signatures from '../components/Dashboard/Signatures/Signature/signature'
import Events from '../components/Dashboard/Events/events'
import CreateEvent from '../components/Dashboard/Events/CreateEvent/createEvent'
import { useEffect, useState } from 'react'
import PastEvents from '../components/Dashboard/Events/PastEvents/PastEvents'
import Profile from '../components/Dashboard/Profile/profile'
import axios from 'axios'
import { API } from 'config'
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
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: 'apexchart-example', toolbar: {
                show: false
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
            categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
    })
    const [chartSeries, setChartSeries] = useState([{ name: 'CPM signature', type: "line", data: [30, 40, 45, 50, 49, 22, 70, 41] }])

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
}

export default Dashboard