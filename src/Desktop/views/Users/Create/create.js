import { useRef, useState } from 'react'
import Button from 'Utils/Button/btn'
import Input from 'Utils/Input/input'
import classes from './create.module.css'
import { useHistory } from 'react-router-dom'
import request from 'Utils/Request/request'
import { Box } from 'Assets/img/KUKLA/illustrations'

export default function Create(props) {
    const slide = useRef(null)
    const focus = useRef(null)
    const width = "15rem"
    const history = useHistory()
    const [groupName, setGroupName] = useState("")

    const handleCSV = async (file) => {
        const csv = new FormData()
        console.log(props.fill.type)
        const url = `import/organisation/${props.fill.type === "users" ? "users" : `${JSON.parse(localStorage.getItem('user')).organisation.replace("/organisations/", "")}/workplaces`}`

        csv.append('file', file)

        await request.post(url, csv)
            .then((res) => {
                props.setState(`${res.data["hydra:totalItems"]} ${props.fill.type} ajoutés`)
                history.push(`/teams/${props.fill.type}`)
            }).catch((err) => console.log("ERR", err))
    }

    const createGroup = () => {
        // axios.post(`${API}organisation/${localStorage.getItem('organisation_id')}/groups?access_token=${localStorage.getItem('token')}`, groupName).then((res) => console.log(res))
        console.log("createGroup")
        return
    }

    const handleSlide = async (e, multiple) => {
        e.preventDefault()
        slide.current.scrollTo({
            top: 0,
            left: slide.current.offsetWidth * multiple,
            behavior: 'smooth'
        })
    }

    const handleSave = () => {
        console.log("handleSave")
        // axios.get(`${API}organisation/${localStorage.getItem('organisation_id')}/groups?access_token=${localStorage.getItem('token')}`).then((res) => console.log(res))
    }

    return (<div className={classes.container}>
        {Box}
        <div className={classes.slidesContainer} ref={slide}>
            <div className={`${classes.slide} ${classes.space}`}>
                <p>{props.fill.subTxt}</p>
                <Button width="15rem" color="orange" arrow={true} onClick={(e) => handleSlide(e, 1)}>{props.fill.firstCTA}</Button>
            </div>
            {props.fill.import ?
                <div className={classes.slide}>
                    <Button width={width} color="orangeFill" arrow={true} className={classes.btn} onClick={(e) => handleSlide(e, 2)}>Manuellement</Button>
                    <Button width={width} color="brown" className={classes.btn}> <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => {
                            handleSave()
                            handleCSV(e.target.files[0])
                        }}
                    />A partir d'un fichier .csv</Button>
                </div> : ""}
            <div className={classes.slide}>
                <div>
                    <Input style={{ width: "100%" }} ref={focus} onChange={(e) => setGroupName(e.target.value)} type="text" placeholder={props.fill.placeholder} />
                    <Button width={width} color="orangeFill" arrow={true} onClick={(e) => { createGroup(); handleSlide(e, 3) }} className={`${classes.btn} ${groupName.length === 0 ? classes.disabled : ""}`}>{props.fill.secondCTA}</Button>
                    <button className={`${classes.btn} ${classes.back}`} onClick={(e) => handleSlide(e, 1)}>Retour</button>
                </div>
            </div>
            {props.fill?.placeholder2 ?
                <div className={classes.slide}>
                    <div>
                        <Input style={{ width: "100%" }} onChange={(e) => setGroupName(e.target.value)} type="text" placeholder={props.fill.placeholder2} />
                        <Input style={{ width: "100%" }} onChange={(e) => setGroupName(e.target.value)} type="text" placeholder={props.fill.placeholder3} />
                        <div className={classes.row}>
                            <Input style={{ width: "100%" }} onChange={(e) => setGroupName(e.target.value)} type="text" placeholder={props.fill.placeholder4} />
                            <Input style={{ width: "100%" }} onChange={(e) => setGroupName(e.target.value)} type="text" placeholder={props.fill.placeholder5} />
                        </div>
                        <Button width={"10rem"} color="orangeFill" onClick={() => handleSave()} className={`${classes.btn} ${groupName.length === 0 ? classes.disabled : ""}`}>{props.fill.thirdCTA}</Button>
                        <button onClick={() => handleSave()} className={`${classes.btn}`}>{props.fill.fourthCTA}</button>
                    </div>
                </div> : ""}
            {/* <div className={classes.slide}>
                <div className={classes.fileUpload}>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => {
                            console.log(e.target.files[0].type)
                        }}
                    />
                    <span>
                        <BsUpload />
                        Importer un fichier
                    </span>
                </div>
                <Button width={width} color="orangeFill" arrow={true} onClick={() => handleSave()}>Valider</Button>
                <Button width={width} color="brown" onClick={(e) => handleSlide(e, 1)}>Retour</Button>
            </div> */}
        </div>
    </div>)
}