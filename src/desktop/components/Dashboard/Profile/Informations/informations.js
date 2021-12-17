import { useEffect, useState } from 'react'
import classes from './informations.module.css'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IoMdClose } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import {
    FaLink,
    FaInstagram,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa";
import axios from 'axios';
import { API } from 'config';
import { useHistory } from 'react-router-dom';
import Hello from 'Assets/img/hi.svg';
import Button from 'Utils/Button/btn';
import Input from 'Utils/Input/input';
import UploadFile from 'Utils/Upload/uploadFile';

function Informations() {
    const [active, setActive] = useState("company")
    const [social, setSocial] = useState([""])
    const [icon, setIcon] = useState([<FaLink />])
    const [logo, setLogo] = useState()
    const [uploadedMedia, setUploadedMedia] = useState()
    const [companyName, setCompanyName] = useState("")
    const [companyAddress, setCompanyAddress] = useState("")
    const [website, setWebsite] = useState("")
    const [phone, setPhone] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [position, setPosition] = useState("")
    const [mobile, setMobile] = useState("")
    const [socials, setSocials] = useState({})
    let history = useHistory()

    const handleSaveCompany = async () => {
        const img = new FormData()
        img.append('file', uploadedMedia)
        if (uploadedMedia)
            await axios.post(`${API}media`, img).then(async (res) => {
                const req = {
                    name: companyName,
                    address: companyAddress,
                    website_url: website,
                    logo_id: res.data.id,
                    phone_number: phone,
                    ...socials
                }
                await axios.patch(`${API}organisations/${JSON.parse(localStorage.getItem("user"))?.organisation_id}?access_token=${localStorage.getItem("token")}`, req).then((res) => {
                    history.goBack()
                })
            })
        else {
            const req = {
                name: companyName,
                address: companyAddress,
                website_url: website,
                phone_number: phone,
                ...socials
            }
            await axios.patch(`${API}organisations/${JSON.parse(localStorage.getItem("user"))?.organisation_id}?access_token=${localStorage.getItem("token")}`, req).then((res) => {
                history.goBack()
            })
        }
    }

    const handleSavePersonal = async () => {
        const req = {
            first_name: firstName,
            last_name: lastName,
            position: position,
            phone_number: mobile
        }
        await axios.patch(`${API}users/${JSON.parse(localStorage.getItem("user")).id}?access_token=${localStorage.getItem("token")}`, req).then((res) => {
            history.goBack()
        })
    }

    useEffect(async () => {
        handleSocial()
        await axios.get(`${API}organisations/${JSON.parse(localStorage.getItem("user"))?.organisation_id}?access_token=${localStorage.getItem("token")}`).then((res) => {
            if (res.data.logo)
                setLogo(res.data.logo.path)
            if (res.data.name)
                setCompanyName(res.data.name)
            if (res.data.address)
                setCompanyAddress(res.data.address)
            if (res.data.phone_number)
                setPhone(res.data.phone_number)
            if (res.data.website_url)
                setWebsite(res.data.website_url)
            if (res.data.twitter) {
                setSocials(({ ...socials, twitter: res.data.twitter }))
                icon[0] = <FaTwitter />
                setIcon([...icon])
            }
            if (res.data.facebook) {
                setSocials(({ ...socials, facebook: res.data.facebook }))
                icon[1] = <FaFacebookF />
                setIcon([...icon])
            }
            if (res.data.instagram) {
                setSocials(({ ...socials, instagram: res.data.instagram }))
                icon[2] = <FaInstagram />
                setIcon([...icon])
            }
            if (res.data.linkedin) {
                setSocials(({ ...socials, linkedin: res.data.linkedin }))
                icon[3] = <FaLinkedinIn />
                setIcon([...icon])
            }

            const tmp = [res.data.twitter, res.data.facebook, res.data.instagram, res.data.linkedin]
            setSocial(tmp.filter((rs) => { return (rs !== undefined) }))
        })

        await axios.get(`${API}users/${JSON.parse(localStorage.getItem("user")).id}?access_token=${localStorage.getItem("token")}`).then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data))
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setPosition(res.data.position)
            setMobile(res.data.phone_number)
        })
    }, [])

    const handleSocial = (string, index) => {
        social[index] = string;
        setSocial([...social]);

        if (string) {
            if (string.search(/twitter/i) !== -1) {
                icon[index] = <FaTwitter />
                setIcon([...icon])
                setSocials({ ...socials, twitter: string })
                return
            }
            if (string.search(/facebook/i) !== -1) {
                icon[index] = <FaFacebookF />
                setIcon([...icon])
                setSocials({ ...socials, facebook: string })
                return
            }
            if (string.search(/instagram/i) !== -1) {
                icon[index] = <FaInstagram />
                setIcon([...icon])
                setSocials({ ...socials, instagram: string })
                return
            }
            if (string.search(/linkedin/i) !== -1) {
                icon[index] = <FaLinkedinIn />
                setIcon([...icon])
                setSocials({ ...socials, linkedin: string })
                return
            }

            else {
                icon[index] = <FaLink />
                setIcon([...icon])
                return
            }
        }
    }
    return (
        <div className={classes.container}>
            <h1>Compte</h1>
            <div className={classes.tabContainer}>
                <ul className={classes.menu}>
                    <li onClick={() => setActive("company")} className={active === "company" ? classes.active : ""}>Profil</li>
                    <li onClick={() => setActive("personal")} className={active === "personal" ? classes.active : ""}>{companyName || "Société"}</li>
                </ul>
                {active === "personal" ? <>
                    <div className={classes.inputsContainer}>
                        <div className={classes.inputContainer}>
                            <label>Logo de l'entreprise</label>
                            <UploadFile file={uploadedMedia}
                                    setFile={(e) => setUploadedMedia(e)}
                                    placeholder="Importer une image"
                                    type="image/*" />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Nom société</label>
                            <Input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Adresse</label>
                            <Input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Site web</label>
                            <Input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Téléphone fixe</label>
                            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className={classes.iconsContainer}>
                            <label htmlFor="socials">Réseaux sociaux</label>
                            <AiOutlinePlusCircle onClick={() => { setSocial(social.concat("")); setIcon(icon.concat(<FaLink />)) }} />
                        </div>
                        {
                            social.map((rs, index) => {
                                return (
                                    <div className={classes.iconInput} key={index}>
                                        {icon[index]}
                                        <Input style={{textIndent: "2rem", width: "100%"}} autoFocus={rs.length === 0 && icon[index] && icon[index] !== <FaLink />} type="text" placeholder="URL" value={rs} onChange={(e) => handleSocial(e.target.value, index)} />
                                    </div>)
                            })
                        }
                    </div>
                    <Button width="40%" color="orangeFill" onClick={() => handleSaveCompany()}>Sauvegarder</Button>
                </> : <>
                    <div className={classes.inputsContainer}>
                        <div>
                            <div className={classes.inputContainer}>
                                <label>Prénom</label>
                                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                            </div>
                            <div className={classes.inputContainer}>
                                <label>Nom</label>
                                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                            </div>
                            <div className={classes.inputContainer}>
                                <label>Poste / Fonction</label>
                                <Input value={position} onChange={(e) => setPosition(e.target.value)} type="text" />
                            </div>
                            <div className={classes.inputContainer}>
                                <label>Email</label>
                                <Input disabled defaultValue={JSON.parse(localStorage.getItem("user"))?.email} type="mail" />
                            </div>
                            <div className={classes.inputContainer}>
                                <label>Téléphone mobile</label>
                                <Input value={mobile} onChange={(e) => setMobile(e.target.value)} type="tel" />
                            </div>
                        </div>
                    </div>
                    <Button width="40%" color="orangeFill" onClick={() => handleSavePersonal()}>Sauvegarder</Button>
                </>
                }
            </div>
            <img src={Hello} style={{ height: "70%" }} />
        </div>
    )
}

export default Informations