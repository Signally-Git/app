import classes from './users.module.css'
import { useEffect, useRef, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import Tab from './Tab/tab'
import SignaturePreview from './SignaturePreview/signaturePreview'
import { Link, useParams } from 'react-router-dom'
import request from 'Utils/Request/request'
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi'
import Button from 'Utils/Button/btn'


function Team() {
    const [entity, setEntity] = useState()
    const { type } = useParams()
    const [users, setUsers] = useState([])
    const [otherUser, setOtherUser] = useState("")
    const [currentUsers, setCurrentUsers] = useState("")
    const [teams, setTeams] = useState([])
    const [otherTeam, setOtherTeam] = useState("")
    const [edit, setEdit] = useState()
    const [editInfo, setEditInfo] = useState()

    const [transition, setTransition] = useState()

    const slider = useRef(null)

    // useEffect(async () => {
    //     const listUsers = await request.get('users?exists[team]=false')
    //     setUsers(listUsers.data['hydra:member'])
    // }, [])

    useEffect(async () => {
        const listTeams = await request.get('teams')
        setTeams(listTeams.data['hydra:member'])
    }, [entity])

    useEffect(() => {
        const sse = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io${entity?.['@id']}`);
        if (edit === 'assign-team') {
            sse.onmessage = e => getRealtimeData(JSON.parse(e.data));
        }
        function getRealtimeData(data) {
            console.log(data)
            setTimeout(() => {
                setEntity({ ...entity, users: data.users })
            }, 1100);
        }

        return () => {
            sse.close();
        };
    }, [edit])
    const sse = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io/users/users-without-team`);
    useEffect(() => {
        sse.onmessage = e => getRealtimeDataWOutTeam(JSON.parse(e.data));

        function getRealtimeDataWOutTeam(data) {
            // setTimeout(() => {
            setUsers(data)
            // }, 1100);
        }

        return () => {
            sse.close();
        };
    }, [])

    const handleUpdate = (user, action) => {
        console.log(user)
        switch (action) {
            case 'remove':
                const removedUsers = entity.users.filter((userCheck) => userCheck['id'] !== user['id'])
                request.delete(`${entity['@id']}/users/${user.id}`, { team: null }, {
                    headers: { 'Content-Type': 'application/merge-patch+json' }
                }).then(() => {
                    setTransition(user['@id'])
                    setTimeout(() => {
                        setEntity({ ...entity, users: removedUsers })
                        setTransition('done')
                    }, 1500);
                });
                break;

            case 'add':
                request.patch(`users/${user.id}`, { team: entity?.['@id'] }, {
                    headers: { 'Content-Type': 'application/merge-patch+json' }
                }).then(() => setTransition(user['@id']));
                setTimeout(() => {
                    setTransition('done')
                }, 1500);
                break;
            default:
                break;
        }

    }

    useEffect(() => {
        setEntity()
    }, [type])

    const handleScroll = (e, scroll) => {
        e.preventDefault()
        slider.current.scroll({
            top: 0,
            left: scroll,
            behavior: 'smooth'
        });
    }

    return (
        <div>
            <div className={classes.container}>
                <h1>Teams</h1>
                <div className={classes.teamsContainer}>
                    <ul className={classes.menu}>
                        <li className={type === "workplaces" ? classes.active : ""}>
                            <Link to="/teams/workplaces">Hotels</Link>
                        </li>
                        <li className={type === "teams" ? classes.active : ""}>
                            <Link to="/teams/teams">Équipes</Link>
                        </li>
                        <li className={type === "users" ? classes.active : ""}>
                            <Link to="/teams/users">Collaborateurs</Link>
                        </li>
                    </ul>
                    <Tab tab={type} selected={entity} setSelected={setEntity} edit={edit} setEdit={setEdit} editInfo={editInfo} setEditInfo={setEditInfo} />
                </div>
                {entity ?
                    <div className={classes.overflow}>
                        {edit === "assign-workplace" ?
                            <div className={classes.teamAssignment}>
                                <div className={classes.col}>
                                    <h2>Équipes de <span className={classes.orangeTxt}>{entity?.name}</span></h2>
                                    {entity?.teams ? <><span>{entity?.teams?.length} équipes</span>
                                        <ul className={`${classes.itemsList} ${classes.users}`}>
                                            {entity?.teams?.map((team) => {
                                                return <li key={team.id}>{team.name}</li>
                                            })}
                                        </ul></> : "Aucune équipe associée"}
                                </div>
                                <div className={classes.col}>
                                    <h2>Autres équipes</h2>
                                    <div className={classes.searchInput}>
                                        <HiOutlineSearch />
                                        <input className={classes.search} type="text" onChange={(e) => setOtherTeam(e.target.value)} placeholder="Rechercher une équipe" />
                                    </div>
                                    <ul className={classes.itemsList}>
                                        {teams.map((team) => {
                                            if (team.name.search(otherTeam.toLowerCase()) !== -1)
                                                return <li key={team.id}>{team.name}</li>
                                        })}
                                    </ul>
                                </div>
                            </div> : edit === "assign-team" ?
                                <div className={classes.teamAssignment}>
                                    <div className={classes.slider} ref={slider}>
                                        <div className={classes.col}>
                                            <div className={classes.tagline}>
                                                <h2><span className={classes.orangeTxt}>{entity?.users?.length || 0}</span> membre(s) <span className={classes.orangeTxt}>{entity?.name}</span></h2>
                                                <Button color="brown" onClick={() => { setEdit('assign-signature') }}>Attribuer signature</Button>
                                            </div>
                                            <br />
                                            <div className={classes.searchInput}>
                                                <HiOutlineSearch />
                                                <input className={classes.search} type="text" onChange={(e) => setCurrentUsers(e.target.value)} placeholder="Rechercher un collaborateur" />
                                            </div>
                                            <ul className={`${classes.itemsList} ${classes.users}`}>
                                                {entity?.users?.map((user) => {
                                                    const fullName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()
                                                    if (fullName.search(currentUsers.toLowerCase()) !== -1)
                                                        return <li key={user.id} className={`${classes.assignItem} ${transition === user['@id'] ? classes.transitionRemove : ""}`}>
                                                            <span>{user.firstName} {user.lastName}</span>
                                                            {transition === user['@id'] ? <span className={classes.added}>Retiré</span> : <button>
                                                                <BiMinusCircle title={`Retirer ${user.firstName} ${user.lastName} dans ${entity?.name}`} onClick={() => handleUpdate(user, 'remove')} />
                                                            </button>}
                                                        </li>
                                                })}
                                            </ul>
                                            <Button color={'orange'} arrow onClick={(e) => handleScroll(e, 1000)}>Ajouter d'autres collaborateurs</Button>
                                        </div>
                                        <div className={classes.col}>
                                            <div className={classes.tagline}>
                                                <h2>Ajouter d'autres collaborateurs</h2>
                                            </div>
                                            <br />
                                            <div className={classes.searchInput}>
                                                <HiOutlineSearch />
                                                <input className={classes.search} type="text" onChange={(e) => setOtherUser(e.target.value)} placeholder="Rechercher un collaborateur" />
                                            </div>
                                            <ul className={classes.itemsList}>
                                                {users?.map((user) => {
                                                    const fullName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()
                                                    if (fullName.search(currentUsers.toLowerCase()) !== -1)
                                                        return <li key={user.id} className={`${classes.assignItem} ${transition === user['@id'] ? classes.transition : ""}`}>
                                                            <span>{user.firstName} {user.lastName}</span>
                                                            {/* {transition === user['@id'] ? <span className={classes.added}>Ajouté</span> :  */}
                                                            <button>
                                                                <BiPlusCircle title={`Ajouter ${user.firstName} ${user.lastName} dans ${entity?.name}`} onClick={() => handleUpdate(user, 'add')} />
                                                            </button>
                                                            {/* } */}
                                                        </li>
                                                })}
                                            </ul>
                                            <Button color={'orange'} onClick={(e) => handleScroll(e, 0)}>Terminer</Button>
                                        </div>
                                    </div>
                                </div> :
                                <div className={classes.signaturePreview}>
                                    <SignaturePreview show={entity} setShow={setEntity} edit={edit} setEdit={setEdit} />
                                </div>}
                    </div> : ""}
            </div>
        </div>)
}

export default Team