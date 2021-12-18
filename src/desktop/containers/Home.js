import Header from '../components/Header/Header'
import Landing from '../components/Landing/SignIn/landing'

function Home() {
    return (
        <div style={{background: "#FFF", margin: 0}}>
            <Header landing={true} />
            <Landing />
        </div>
    )
}

export default Home