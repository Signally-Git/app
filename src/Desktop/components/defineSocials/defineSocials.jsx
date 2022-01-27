import React from 'react'
import Input from 'Utils/Input/input'
import classes from './defineSocials.module.css'
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi';
import { useNotification } from 'Utils/Notifications/notifications';
import { TiSocialLinkedin, TiSocialPinterest } from 'react-icons/ti';
import { GrFacebookOption } from 'react-icons/gr';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { BsSnapchat } from 'react-icons/bs';

export default function DefineSocials() {
    const [socials, setSocials] = React.useState([{ url: "", type: "" }])
    const [select, setSelect] = React.useState(0)
    const [value, setValue] = React.useState("")
    const socialLink = React.useRef(null)
    const notification = useNotification()

    const socialIcons = {
        FACEBOOK: <GrFacebookOption style={{ padding: '5px'}} />,
        INSTAGRAM: <AiOutlineInstagram style={{ padding: '4px'}} />,
        LINKEDIN: <TiSocialLinkedin style={{ padding: '1px'}} />,
        PINTEREST: <TiSocialPinterest />,
        SNAPCHAT: <BsSnapchat style={{ padding: '6px'}} />,
        TWITTER: <AiOutlineTwitter style={{ padding: '4px'}} />
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
            notification({ content: <>Il existe déjà un réseau social {getType(value)}</>, status: 'invalid' })
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
                    </ul>
                </div>
                <div className={classes.editSocials}>
                    <Input ref={socialLink} style={{ width: '20rem' }} value={value} onChange={(e) => handleChange(e)} type="text" placeholder="URL" />
                    {socials[0]?.url?.length > 1 && <BiMinusCircle title={`Supprimer ${socials[select]?.url || socials[select - 1].url}`} onClick={() => handleRemove()} />}
                    <BiPlusCircle onClick={(e) => handleSubmit(e)} />
                </div>
            </form>
        </div>
    )
}