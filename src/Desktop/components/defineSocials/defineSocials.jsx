import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaSnapchat, FaTwitter } from 'react-icons/fa'
import Input from 'Utils/Input/input'
import classes from './defineSocials.module.css'
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi';
import { useNotification } from 'Utils/Notifications/notifications';

export default function DefineSocials() {
    const [socials, setSocials] = React.useState([{ url: "", type: "" }])
    const [select, setSelect] = React.useState(0)
    const [value, setValue] = React.useState("")
    const socialLink = React.useRef(null)
    const notification = useNotification()

    const socialIcons = {
        FACEBOOK: <FaFacebook />,
        INSTAGRAM: <FaInstagram />,
        LINKEDIN: <FaLinkedin />,
        PINTEREST: <FaPinterest />,
        SNAPCHAT: <FaSnapchat />,
        TWITTER: <FaTwitter />
    }

    const renderSocial = (social) => {
        const Component = socialIcons[social.type.toUpperCase()]
        return Component
    }

    const getType = (string) => {
        let type;
        try {
            type = new URL((string)).hostname.replace('www.', '').replace('.com', '').replace(`^(?:.*://)?(?:.*?\.)?([^:/]*?\.[^:/]*).*$`, '');
            return type
        } catch (_) {
            return false;
        }
    }

    const handleChange = React.useCallback((e) => {
        e.preventDefault()
        const type = getType(e.target.value)
        let newArr = [...socials];
        newArr[select] = { url: e.target.value, type: type };
        setSocials(newArr);
        setValue(e.target.value || "")
    })

    const handleSwap = (social) => {
        setSelect(socials.findIndex(x => x === social))
        setValue(socials[socials.findIndex(x => x === social)]?.url || "")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (socials.filter((social) => getType(value) === social?.type).length === 1) {
            setSelect(socials.length)
            setValue("")
            socialLink.current.focus()
        }
        else {
            notification({ content: <>Il existe déjà un réseau social {getType(value)}</>, status: 'invalid'})
        }
    }

    const handleRemove = () => {
        socials.splice(socials.findIndex(x => x?.url === value), 1)
        setValue("")
        setSelect(socials.length)
    }

    return (
        <div className={classes.container}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Réseaux sociaux</label>
                    <ul className={classes.socialsList}>
                        {socials?.map((social, index) => {
                            return <li key={index} title={social?.url} onClick={() => handleSwap(social)}>
                                {social?.type ? renderSocial(social) : ""}
                            </li>
                        })}
                        <li>
                        </li>
                    </ul>
                </div>
                <div>
                    <Input ref={socialLink} style={{ width: '20rem' }} value={value} onChange={(e) => handleChange(e)} type="text" placeholder="URL" />
                    <BiPlusCircle onClick={(e) => handleSubmit(e)} />
                    <BiMinusCircle onClick={(e) => handleRemove()} />
                </div>
            </form>
        </div>
    )
}