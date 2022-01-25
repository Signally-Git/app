import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaSnapchat, FaTwitter } from 'react-icons/fa'
import Input from 'Utils/Input/input'
import classes from './defineSocials.module.css'
import Button from '../../../Utils/Button/btn';

export default function DefineSocials() {
    const [socials, setSocials] = React.useState([])
    const [value, setValue] = React.useState("")
    const [select, setSelect] = React.useState(0)

    const socialIcons = {
        FACEBOOK: <FaFacebook />,
        INSTAGRAM: <FaInstagram />,
        LINKEDIN: <FaLinkedin />,
        PINTEREST: <FaPinterest />,
        SNAPCHAT: <FaSnapchat />,
        TWITTER: <FaTwitter />
    }

    const renderSocial = (social) => {
        const Component = socialIcons[social.type]
        return Component
    }

    const handleChange = (e) => {
        socials[select] = { url: e.target.value, type: e.target.value }; 
        if (new URL(e.target.value))
            {
                console.log(new URL(e.target.value)).hostname.replace('www.','').replace('.com','').replace(`^(?:.*://)?(?:.*?\.)?([^:/]*?\.[^:/]*).*$`, '')
            }
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSelect(select + 1)
    }

    return (
        <div className={classes.container}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Réseaux sociaux</label>
                    <ul className={classes.socialsList}>
                        {socials.map((social) => {
                            return <li title={social.url} onClick={() => setSelect(socials.findIndex(x => x === social))}>
                                {renderSocial(social)}
                            </li>
                        })}
                        <li>
                        </li>
                    </ul>
                </div>
                <div>
                <Input style={{ width: '20rem' }} value={socials[select]?.url} onChange={(e) => handleChange(e)} type="text" placeholder="URL" />
                            <Button type='submit' color="brown" onClick={() => { return; }}>-</Button>
                            <Button type='submit' color="brown" onClick={() => { return; }}>+</Button>
                </div>
            </form>
        </div>
    )
}