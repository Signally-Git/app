import Header from '../components/Dashboard/Header/Header'
import Menu from '../components/Dashboard/Menu/Menu'
import Tiles from '../components/Dashboard/Home/tiles'

function Dashboard(props) {
    return (
        <div>
            <Header page={props.page} />
            {props.page === 'home' ? <>
                <Tiles />
            </> : null}
            <Menu page={props.page} />
        </div>
    )
}

export default Dashboard