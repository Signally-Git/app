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
    FaSnapchat,
    FaPinterest,
} from "react-icons/fa";
import axios from 'axios';
import { API } from 'config';
import { useHistory } from 'react-router-dom';
import Hello from 'Assets/img/hi.svg';
import Button from 'Utils/Button/btn';
import Input from 'Utils/Input/input';
import UploadFile from 'Utils/Upload/uploadFile';
import request from 'Utils/Request/request';

function Informations() {
    const [active, setActive] = useState("company")
    const [social, setSocial] = useState([' '])
    const [icon, setIcon] = useState([<FaLink />])
    const [logo, setLogo] = useState()
    const [organisationId, setOrganisationId] = useState()
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
    useEffect(async () => {
        await request.get(`whoami`).then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data))
            setFirstName(res.data.firstName)
            setLastName(res.data.lastName)
            setPosition(res.data.position)
            setMobile(res.data.phone)
        })
    }, [])
    
    useEffect(() => {

        console.log(social)
    }, [social])

    const handleSaveCompany = async () => {
        const img = new FormData()
        img.append('image', uploadedMedia)
        if (uploadedMedia)
            await request.post(`import/image`, img).then(async (res) => {
                const requestLogo = {
                    name: "test",
                    path: res.data.path
                }
                await request.post('logos', requestLogo).then((res) => {
                    console.log(res.data)
                });
                // const req = {
                //     name: companyName,
                //     websiteUrl: website,
                //     logo: res.data['@id']
                // }
                // await request.patch(`organisations/${organisationId}`, req, {
                //     headers: { 'Content-Type': 'application/merge-patch+json' }
                // }).then((res) => {
                //     // history.goBack()
                //     console.log(res)
                // })
            })
        else {
            const req = {
                name: companyName,
                websiteUrl: website,
                address: {
                    street: companyAddress
                },
                digitalAddress: {
                    phone: phone
                }

            }
            await request.patch(`organisations/${organisationId}`, req, {
                headers: { 'Content-Type': 'application/merge-patch+json' }
            }).then((res) => {
                history.goBack()
            })
        }
    }

    const handleSavePersonal = async () => {
        const req = {
            firstName: firstName,
            lastName: lastName,
            position: position,
            phone: mobile
        }
        await request.patch(`users/${JSON.parse(localStorage.getItem('user')).id}`, req, {
            headers: { 'Content-Type': 'application/merge-patch+json' }
        })
        history.goBack()
    }

    useEffect(async () => {
        handleSocial()
        let organisation = await request.get(JSON.parse(localStorage.getItem('user')).organisation)
        organisation = organisation.data
        setOrganisationId(organisation.id)
        // setLogo(organisation.logos[0])
        setCompanyName(organisation.name)
        setCompanyAddress(organisation.address.street)
        setWebsite(organisation.websiteUrl)
        setPhone(organisation.digitalAddress.phone)

        if (organisation.socialMediaAccounts.twitter) {
            setSocials(({ ...socials, twitter: organisation.socialMediaAccounts.twitter }))
            icon[0] = <FaTwitter />
            setIcon([...icon])
        }
        if (organisation.socialMediaAccounts.facebook) {
            setSocials(({ ...socials, facebook: organisation.socialMediaAccounts.facebook }))
            icon[1] = <FaFacebookF />
            setIcon([...icon])
        }
        if (organisation.socialMediaAccounts.instagram) {
            setSocials(({ ...socials, instagram: organisation.socialMediaAccounts.instagram }))
            icon[2] = <FaInstagram />
            setIcon([...icon])
        }
        if (organisation.socialMediaAccounts.linkedin) {
            setSocials(({ ...socials, linkedin: organisation.socialMediaAccounts.linkedin }))
            icon[3] = <FaLinkedinIn />
            setIcon([...icon])
        }

        const tmp = [organisation.socialMediaAccounts.twitter, organisation.socialMediaAccounts.facebook, organisation.socialMediaAccounts.instagram, organisation.socialMediaAccounts.linkedin]
        setSocial(tmp.filter((rs) => { return (rs !== undefined) }))

    }, [])

    const handleSocial = (string, index) => {
        if (social?.length > 0) {
            social[index] = string
            setSocial([...social]);
        }

        if (string) {
            if (string.search(/snapchat/i) !== -1) {
                icon[index] = <FaSnapchat />
                setIcon([...icon])
                setSocials({ ...socials, snapchat: string })
                return
            }
            if (string.search(/pinterest/i) !== -1) {
                icon[index] = <FaPinterest />
                setIcon([...icon])
                setSocials({ ...socials, pinterest: string })
                return
            }
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
                        <div className={classes.row}>
                            <div className={classes.inputContainer}>
                                <label>Nom société</label>
                                <Input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                            </div>
                            <div className={classes.inputContainer}>
                                <label>Logo de l'entreprise</label>
                                <UploadFile file={uploadedMedia}
                                    setFile={(e) => setUploadedMedia(e)}
                                    placeholder="Importer une image"
                                    style={{paddingTop: '.8rem', paddingBottom: '.8rem'}}
                                    type="image/*" />
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.inputContainer}>
                                <label>Adresse</label>
                                <Input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
                            </div>
                            <div className={classes.inputContainer}>
                                <label>Téléphone fixe</label>
                                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                        <div className={classes.inputContainer}>
                            <label>Site web</label>
                            <Input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                        </div>
                        <div className={classes.socialsContainer}>
                            <label htmlFor="socials" className={classes.orangeTxt}>Réseaux sociaux</label>
                            <AiOutlinePlusCircle fontSize={'1.5rem'} onClick={() => { setSocial(social.concat("")); setIcon(icon.concat(<FaLink />)) }} />
                        </div>
                        {
                            social?.map((rs, index) => {
                                return (
                                    <div className={classes.iconInput} key={index}>
                                        {icon[index]}
                                        <Input style={{ textIndent: "2rem", width: "100%" }} autoFocus={rs.length === 0 && icon[index] && icon[index] !== <FaLink />} type="text" placeholder="URL" value={rs} onChange={(e) => handleSocial(e.target.value, index)} />
                                    </div>)
                            })
                        }
                    </div>
                    <div className={classes.btnsContainer}>
                        <Button color="orange" onClick={() => history.goBack()}>Annuler</Button>
                        <Button color="orangeFill" onClick={() => handleSaveCompany()}>Sauvegarder</Button>
                    </div>
                </> : <>
                    <div className={classes.inputsContainer}>
                        <div>
                            <div className={classes.row}>
                                <div className={classes.inputContainer}>
                                    <label>Prénom</label>
                                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                                </div>
                                <div className={classes.inputContainer}>
                                    <label>Nom</label>
                                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.inputContainer}>
                                    <label>Poste / Fonction</label>
                                    <Input value={position} onChange={(e) => setPosition(e.target.value)} type="text" />
                                </div>
                                <div className={classes.inputContainer}>
                                    <label>Téléphone mobile</label>
                                    <Input value={mobile} onChange={(e) => setMobile(e.target.value)} type="tel" />
                                </div>
                            </div>
                            <div className={classes.inputContainer}>
                                <label>Email</label>
                                <Input disabled defaultValue={JSON.parse(localStorage.getItem("user"))?.email} type="mail" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.btnsContainer}>
                        <Button color="orange" onClick={() => history.goBack()}>Annuler</Button>
                        <Button color="orangeFill" onClick={() => handleSavePersonal()}>Sauvegarder</Button>
                    </div>
                </>
                }
            </div>
            <img src={Hello} />
        </div>
    )
}

export default Informations