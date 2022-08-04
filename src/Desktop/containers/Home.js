import Header from '../components/Header/Header'
import Landing from '../components/Landing/SignIn/landing'

function Home() {
    return (
        <div style={{ background: "#FFF", overflow: 'hidden', height: "100vh" }}>
            <Header landing={true} />
            <Landing />
        </div>
    )
}

export default Home