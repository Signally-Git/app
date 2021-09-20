import classes from './users.module.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../config";
import RenderHTML from "../Signatures/createSignature/RenderHTML/RenderHTML";
import Menu from '../Menu/Menu';

export default function Users() {
    let { userId } = useParams()
    const [user, setUser] = useState()
    const [template, setTemplate] = useState()
    const [data, setData] = useState([])
    const [organisation, setOrganisation] = useState()

    useEffect(async () => {
        await axios.get(`${API}user/${userId}?access_token=${localStorage.getItem("token")}`).then(async (res) => {
            setUser(res.data)
            if (res.data.signature)
            await axios.get(`${API}template/${res.data?.signature?.id}?access_token=${localStorage.getItem("token")}`).then((res) => {
                setTemplate(res.data.signatureData)
                console.log(res.data)
            })
        })
        await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}?access_token=${localStorage.getItem("token")}`).then((res) => {
            setOrganisation(res.data)
        })
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
    if (user?.signature)
    return (<div className={classes.container}>
        <div className={`${classes.assignedContainer}`}>
            <RenderHTML className={classes.signaturePreview} template={template} data={data} />
            <Menu page={"signatures"} />
        </div>
    </div>)
    return (<div className={`${classes.container} ${classes.noSignature}`}>
        <h2>Aucune signature disponible pour cet utilisateur. <br /><br />Et si vous en <Link to="/create-signature">ajoutiez une</Link> ?</h2>
        <Menu page={"signatures"} />
    </div>)
}