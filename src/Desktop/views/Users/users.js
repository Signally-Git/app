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
    const [currentTeams, setCurrentTeams] = useState("")
    const [teams, setTeams] = useState([])
    const [otherTeam, setOtherTeam] = useState("")
    const [edit, setEdit] = useState()
    const [editInfo, setEditInfo] = useState()

    const [transition, setTransition] = useState()

    const slider = useRef(null)

    useEffect(async () => {
        const listUsers = await request.get('users?exists[team]=false')
        setUsers(listUsers.data['hydra:member'])
    }, [entity])

    useEffect(async () => {
        const listTeams = await request.get('teams?exists[workplace]=false')
        setTeams(listTeams.data['hydra:member'])
    }, [entity])

    // HANDLING REAL TIME USERS IN TEAM
    useEffect(() => {
        const sse = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io${entity?.['@id']}`);
        if (edit === 'assign-team') {
            sse.onmessage = e => getRealtimeData(JSON.parse(e.data));
        }
        function getRealtimeData(data) {
            console.log(data)
            setTimeout(() => {
                setEntity({ ...entity, users: data.users })
            }, 1500);
        }

        return () => {
            sse.close();
        };
    }, [edit])

    // HANDLING REAL TIME USERS WITHOUT TEAM
    useEffect(() => {
        const sse = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io/users/users-without-team`);
        sse.onmessage = e => getRealtimeDataWOutTeam(JSON.parse(e.data));

        function getRealtimeDataWOutTeam(data) {
            setTimeout(() => {
                setUsers(data)
            }, 1500);
        }

        return () => {
            sse.close();
        };
    }, [edit])

    useEffect(() => {
        const sse = new EventSource(`https://hub.signally.io/.well-known/mercure?topic=https://api.beta.signally.io/users/teams-without-workplace`);
        sse.onmessage = e => getRealtimeDataWOutWP(JSON.parse(e.data));

        function getRealtimeDataWOutWP(data) {
            setTimeout(() => {
                setTeams(data)
            }, 1500);
        }

        return () => {
            sse.close();
        };
    }, [edit])

    const handleAddTeam = (team) => {
        request.patch(`teams/${team.id}`, { workplace: entity?.['@id'] }, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        }).then(() => {
            setTransition(team.id)
            setTimeout(() => {
                setTransition('done')
            }, 1500);
        });
    }

    const handleRemoveTeam = (team) => {
        const removedTeams = entity.teams.filter((teamCheck) => teamCheck['id'] !== team['id'])
        request.delete(`${entity['@id']}/teams/${team.id}`, { workplace: null }, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        }).then(() => {
            setTransition(team.id)
            setTimeout(() => {
                setEntity({ ...entity, teams: removedTeams })
                setTransition('done')
            }, 1500);
        });
    }

    const handleUpdateAll = (users, action) => {
        users?.map((user) => {
            handleUpdate(user, action)
        })
    }

    const handleUpdate = (user, action) => {
        switch (action) {
            case 'remove':
                const removedUsers = entity.users.filter((userCheck) => userCheck['id'] !== user['id'])
                request.delete(`${entity['@id']}/users/${user.id}`, { team: null }, {
                    headers: { 'Content-Type': 'application/merge-patch+json' }
                }).then(() => {
                    setTransition(user.id)
                    setTimeout(() => {
                        setEntity({ ...entity, users: removedUsers })
                        setTransition('done')
                    }, 1500);
                });
                break;

            case 'add':
                request.patch(`users/${user.id}`, { team: entity?.['@id'] }, {
                    headers: { 'Content-Type': 'application/merge-patch+json' }
                }).then(() => {
                    setTransition(user.id)
                    setTimeout(() => {
                        setTransition('done')
                    }, 1500);
                });
                break;
            default:
                break;
        }

    }

    useEffect(() => {
        setEntity()
        setEdit()
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
                                <div className={classes.slider} ref={slider}>
                                    <div className={classes.col}>
                                        <div className={classes.tagline}>
                                            <h2><span className={classes.orangeTxt}>{entity?.teams?.length || 0}</span> équipe(s) <span className={classes.orangeTxt}>{entity?.name}</span></h2>
                                            <Button color="brown" onClick={() => { setEdit('assign-signature') }}>Signature</Button>
                                        </div>
                                        <br />
                                        <div className={classes.searchInput}>
                                            <HiOutlineSearch />
                                            <input className={classes.search} type="text" onChange={(e) => setCurrentTeams(e.target.value)} placeholder="Rechercher une équipe" />
                                        </div>
                                        <ul className={`${classes.itemsList} ${classes.users}`}>
                                            {entity?.teams?.map((team) => {
                                                if (team.name.search(currentTeams.toLowerCase()) !== -1)
                                                    return <li key={team.id} className={`${classes.assignItem} ${transition === team.id ? classes.transitionRemove : ""}`}>
                                                        <span>{team.name}</span>
                                                        {transition === team.id ? <span className={classes.added}>Retiré</span> : <button>
                                                            <BiMinusCircle title={`Retirer ${team.name} dans ${entity?.name}`} onClick={() => handleRemoveTeam(team)} />
                                                        </button>}
                                                    </li>
                                            })}
                                        </ul>
                                        <Button color={'orange'} arrow onClick={(e) => handleScroll(e, 2000)}>Ajouter des équipes</Button>
                                    </div>
                                    <div className={classes.col}>
                                        <div className={classes.tagline}>
                                            <h2>Ajouter des équipes</h2>
                                        </div>
                                        <br />
                                        <div className={classes.searchInput}>
                                            <HiOutlineSearch />
                                            <input className={classes.search} type="text" onChange={(e) => setOtherTeam(e.target.value)} placeholder="Rechercher un collaborateur" />
                                        </div>
                                        <ul className={classes.itemsList}>
                                            {teams?.map((team) => {
                                                if (team.name.search(otherTeam.toLowerCase()) !== -1)
                                                    return <li key={team.id} className={`${classes.assignItem} ${transition === team.id ? classes.transitionRight : ""}`}>
                                                        <span>{team.name}</span>
                                                        {transition === team.id ? <span className={classes.added}>Ajouté</span> :
                                                            <button>
                                                                <BiPlusCircle title={`Ajouter ${team.name} dans ${entity?.name}`} onClick={() => handleAddTeam(team)} />
                                                            </button>
                                                        }
                                                    </li>
                                            })}
                                        </ul>
                                        <Button color={'orange'} onClick={(e) => handleScroll(e, 0)}>Terminer</Button>
                                    </div>
                                </div>
                            </div> : edit === "assign-team" ?
                                <div className={classes.teamAssignment}>
                                    <div className={classes.slider} ref={slider}>
                                        <div className={classes.col}>
                                            <div className={classes.tagline}>
                                                <h2><span className={classes.orangeTxt}>{entity?.users?.length || 0}</span> membre(s) <span className={classes.orangeTxt}>{entity?.name}</span></h2>
                                                <Button color="brown" onClick={() => { setEdit('assign-signature') }}>Signature</Button>
                                            </div>
                                            <br />
                                            <div className={classes.searchInput}>
                                                <HiOutlineSearch />
                                                <input className={classes.search} type="text" onChange={(e) => setCurrentUsers(e.target.value)} placeholder="Rechercher un collaborateur" />
                                            </div>
                                            <span className={classes.all} onClick={() => handleUpdateAll(entity?.users, 'remove')}>Retirer tout</span>
                                            <ul className={`${classes.itemsList} ${classes.users}`}>
                                                {entity?.users?.map((user) => {
                                                    const fullName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()
                                                    if (fullName.search(currentUsers.toLowerCase()) !== -1)
                                                        return <li key={user.id} className={`${classes.assignItem} ${transition === user.id ? classes.transitionRemove : ""}`} title={`Retirer ${user.firstName} ${user.lastName} dans ${entity?.name}`} onClick={() => handleUpdate(user, 'remove')} >
                                                            <span>{user.firstName} {user.lastName}</span>
                                                            {transition === user.id ? <span className={classes.added}>Retiré</span> : <button>
                                                                <BiMinusCircle />
                                                            </button>}
                                                        </li>
                                                })}
                                            </ul>
                                            <Button color={'orange'} arrow onClick={(e) => handleScroll(e, 2000)}>Ajouter des collaborateurs</Button>
                                        </div>
                                        <div className={classes.col}>
                                            <div className={classes.tagline}>
                                                <h2>Ajouter des collaborateurs</h2>
                                            </div>
                                            <br />
                                            <div className={classes.searchInput}>
                                                <HiOutlineSearch />
                                                <input className={classes.search} type="text" onChange={(e) => setOtherUser(e.target.value)} placeholder="Rechercher un collaborateur" />
                                            </div>
                                            <span className={classes.all} onClick={() => handleUpdateAll(users, 'add')}>Ajouter tout</span>
                                            <ul className={classes.itemsList}>
                                                {users?.map((user) => {
                                                    const fullName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()
                                                    if (fullName.search(otherUser.toLowerCase()) !== -1)
                                                        return <li key={user.id} className={`${classes.assignItem} ${transition === user.id ? classes.transitionRight : ""}`} title={`Ajouter ${user.firstName} ${user.lastName} dans ${entity?.name}`} onClick={() => handleUpdate(user, 'add')}>
                                                            <span>{user.firstName} {user.lastName}</span>
                                                            {transition === user.id ? <span className={classes.added}>Ajouté</span> :
                                                                <button>
                                                                    <BiPlusCircle />
                                                                </button>
                                                            }
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