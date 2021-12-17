import classes from './signature.module.css'
import { useEffect, useState } from 'react'
import { API } from 'config'
import axios from 'axios'
import RenderHTML from '../createSignature/RenderHTML/RenderHTML'
import { useHistory } from 'react-router-dom'



function Signature(props) {
    let tmp = []
    let checkTMP = []
    const [template, setTemplate] = useState([])
    const [checkbox, setCheckbox] = useState([])
    const [isChanged, setIsChanged] = useState(false)
    const [teamsList, setTeamsList] = useState([])
    const [selectedTeams, setSelectedTeams] = useState([])
    const [templateID, setTemplateID] = useState(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1))
    const [selectedList, setSelectedList] = useState([])
    const [display, setDisplay] = useState(false)
    const [members, setMembers] = useState([])
    const [data, setData] = useState({})
    const [otherTeams, setOtherTeams] = useState()

    useEffect(async () => {
        await axios.get(`${API}user/${JSON.parse(localStorage.getItem("user")).id}?access_token=${localStorage.getItem("token")}`).then(async (res) => {
            setData({
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                poste: res.data.position,
                mobile: res.data.phone_number,
                phone: res.data.phone_number
            })
        })
        console.log(otherTeams)

    }, [])

    console.log(selectedTeams, tmp)

    const handleCheckbox = (e) => {
        setIsChanged(true)
        e.target.checked ? setCheckbox([...checkbox, e.target.id]) : setCheckbox(checkbox.filter(check => check !== e.target.id))
        e.target.checked ? setSelectedTeams([...selectedTeams, e.target.placeholder]) : setSelectedTeams(selectedTeams.filter(check => check !== e.target.placeholder))
    }

    let history = useHistory()
    const handleSave = () => {
        const req = {
            "signature_template_id": templateID
        }
        selectedTeams.map((team) => {
            axios.patch(`${API}team/${team}?access_token=${localStorage.getItem("token")}`, req).then(() => {
                axios.get(`${API}team/${team}/members?access_token=${localStorage.getItem("token")}`).then((res) => {
                    console.log(res.data.data)
                    setMembers(res.data.data)
                    const members = res.data.data
                    members.map((user) => {
                        axios.patch(`${API}user/${user.id}?access_token=${localStorage.getItem("token")}`, req).then(() => {
                            console.log(res)
                        })
                    })
                    history.push("/signatures")
                })
            })
        })
    }
    useEffect(async () => {
        if (props?.model?.length > 0)
            props.handleHeader(props.model)
        else {
            axios.get(`${API}template/${templateID}?access_token=${localStorage.getItem("token")}`).then((res) => {
                setTemplate(res.data)
            })
        }
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/teams?access_token=${localStorage.getItem("token")}`).then((res) => {
            setTeamsList(res.data.data)
            console.log(res.data.data)
        })
    }, [])

    useEffect(() => {
        let tmp = [];
        setSelectedList(teamsList?.map((item, key) => {
            if (item.signature_template_id === templateID) {
                setDisplay(true)
                checkTMP = [...checkTMP, key.toString()]
                tmp = [...tmp, item.id]
                return (
                    <li key={key}>
                        <label htmlFor={key}>
                            {item.name} <span className={classes.userCount}>({item.members_count})</span>
                        </label>
                        <input defaultChecked={true} className={classes.checkbox} type="checkbox" id={key} placeholder={item.id} key={item.name} onChange={(e) => { handleCheckbox(e) }} />
                        <span className={classes.checkmark}></span>
                    </li>)
            }
        }))
        console.log(otherTeams)
        tmp = (teamsList?.map((item, key) => {
            if (item.signature_template_id !== templateID)
                return (
                    <li key={key}>
                        <label htmlFor={key}>
                            {item.name} <span className={classes.userCount}>({item.members_count})</span>
                        </label>
                        <input className={classes.checkbox} type="checkbox" id={key} placeholder={item.id} key={item.name} onChange={(e) => { handleCheckbox(e) }} />
                        <span className={classes.checkmark}></span>
                    </li>)
        }))
        setOtherTeams(tmp?.filter(function (el) {
            return el != null;
        }))
        setSelectedTeams(tmp)
        setCheckbox(checkTMP)
    }, [teamsList])

    useEffect(() => {
        props.create("")
        if (template)
            props.handleHeader(`Signature : ${template.name}`)
    }, [template])

    return (<div className={classes.container}>
        <div className={`${classes.assignedContainer}`}>
            <RenderHTML className={classes.signaturePreview} data={data} template={template.signatureData} />
            <br />
            <span className={classes.assignTo}>Assignée à  {checkbox.length > 1 ? `${checkbox.length} équipes` : checkbox.length === 1 ? `${checkbox.length} équipe` : "aucune équipe"}</span>
            <br />
            <br />
            <br />
            {display &&
                <ul className={`${classes.teamsList} ${classes.assignedTeams}`}>
                    {selectedList}
                </ul>}
        </div>{otherTeams?.length > 0 &&
            <>
                <span className={classes.assignTo}>Assigner cette signature à une autre équipe</span>
                <ul className={`${classes.teamsList} ${classes.shadowed}`}>
                    {otherTeams}
                </ul>
            </>}
        <button className={`${classes.saveCTA} ${isChanged && classes.orangeBtn}`} onClick={() => handleSave()}>Sauvegarder</button>
    </div>)
}

export default Signature