import Header from '../components/Dashboard/Header/Header'
import Menu from '../components/Dashboard/Menu/Menu'
import Tiles from '../components/Dashboard/Home/tiles'
import Teams from '../components/Dashboard/Teams/teams'
import Signatures from '../components/Dashboard/Signatures/signatures'
import Events from '../components/Dashboard/Events/events'
import CreateEvent from '../components/Dashboard/Events/CreateEvent/createEvent'

function Dashboard(props) {
    return (
        <div>
            <Header page={props.page} />
            {props.page === 'home' ? <>
                <Tiles />
            </> : props.page === 'teams' ? 
            <>
                <Teams />
            </> : props.page === 'signatures' ? 
            <>
                <Signatures />
            </> : props.page === 'events' ? 
            <>
                <Events />
            </> : props.page === 'create-event' ? 
            <>
                <CreateEvent />
            </> : null}
            <Menu page={props.page} />
        </div>
    )
}

export default Dashboard