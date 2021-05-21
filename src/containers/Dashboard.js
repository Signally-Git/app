import Header from '../components/Dashboard/Header/Header'
import Menu from '../components/Dashboard/Menu/Menu'
import Tiles from '../components/Dashboard/Home/tiles'
import Teams from '../components/Dashboard/Teams/teams'
import Signatures from '../components/Dashboard/Signatures/signatures'
import Events from '../components/Dashboard/Events/events'
import CreateEvent from '../components/Dashboard/Events/CreateEvent/createEvent'
import { useState } from 'react'
import PastEvents from '../components/Dashboard/Events/PastEvents/PastEvents'

function Dashboard(props) {
    const [isHeader, setIsHeader] = useState("")
    const [createEvent, setCreateEvent] = useState(null)
    return (
        <div>
            {
                isHeader.length > 0 &&
                <Header page={props.page} title={isHeader} create={createEvent} />
            }
            {props.page === 'home' ? <>
                <Tiles handleHeader={setIsHeader} />
            </> : props.page === 'teams' ? 
            <>
                <Teams handleHeader={setIsHeader} create={setCreateEvent} />
            </> : props.page === 'signatures' ? 
            <>
                <Signatures handleHeader={setIsHeader} />
            </> : props.page === 'events' ? 
            <>
                <Events handleHeader={setIsHeader} create={setCreateEvent}  />
            </> : props.page === 'create-event' ? 
            <>
                <CreateEvent handleHeader={setIsHeader} />
            </> : props.page === 'past-events' ? 
            <>
                <PastEvents handleHeader={setIsHeader}/>
            </> : null}
            <Menu page={props.page} />
        </div>
    )
}

export default Dashboard