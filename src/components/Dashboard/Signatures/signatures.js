import classes from './signatures.module.css'
import { Link, Route } from 'react-router-dom'
import Signature from './Signature/signature'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../../config'
import SingleSignature from './singleSignature'

function Signatures(props) {
    const [templates, setTemplates] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const [data, setData] = useState({})

    useEffect(async () => {
        await axios.get(`${API}user/${JSON.parse(localStorage.getItem("user")).id}?access_token=${localStorage.getItem("token")}`).then(async (res) => {
            setData({
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                poste: res.data.position,
                mobile: res.data.phone_number
            })
        })
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/signature-templates?access_token=${localStorage.getItem("token")}`).then((res) => {
            setTemplates(res.data.data)
        })

    }, [isDeleted])

    useEffect(() => {
        props.create("/create-signature")
        props.handleHeader("Signatures")
    }, [])

    useEffect(() => {
        setIsDeleted(false)
    }, [isDeleted])

    return (
        <div>
            <Route exact path="/signatures">
                <div className={classes.container}>
                    <span className={classes.span}>{templates?.length > 1 ? templates?.length + " modèles" : templates?.length + "  modèle"}</span>
                    <ul>
                        {data.firstName && templates?.map((template, id) => {
                            return <SingleSignature
                                data={data}
                                template={template} id={id} index={props.index} deleted={setIsDeleted}
                                create={props.create}
                                handleHeader={props.handleHeader} />
                        })}
                    </ul>
                </div>
            </Route>
            <Route path="/signatures/:id">
                <Signature handleHeader={props.handleHeader} create={props.create} />
            </Route>
        </div>)

}

export default Signatures