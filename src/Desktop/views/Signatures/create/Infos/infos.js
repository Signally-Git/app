import { useState } from 'react';
import Input from './Input'
import { BsChevronDown, BsUpload } from "react-icons/bs";
import classes from './infos.module.css'
import { IoMdClose } from 'react-icons/io';
import { Range } from "react-range";
import UploadFile from 'Utils/Upload/uploadFile';
import { FiChevronDown } from 'react-icons/fi';

// Informations tab, allows to change texts to preview long or short ones
// Styles every text with color & decoration, and family + size for the whole template
// Change group's logo

export default function Infos(props) {
    // Template banner
    const [img, setImg] = useState("");
    const [profile, setProfile] = useState(false);
    const [organisation, setOrganisation] = useState(false);


    // Template informations
    const inputs = [{ placeholder: "Prénom", type: "text", toChange: "firstName", value: props.content.firstName, disabled: true },
    { placeholder: "Nom", type: "text", toChange: "lastName", value: props.content.lastName, disabled: true },
    { placeholder: "Poste", type: "text", toChange: "jobName", value: props.content.jobName, disabled: true },
    { placeholder: "Mobile", type: "tel", toChange: "mobile", value: props.content.mobile, disabled: true }
    ]

    const companyInputs = [{ placeholder: "Société", type: "text", toChange: "company", value: props.content.company, disabled: true },
    { placeholder: "Adresse", type: "text", toChange: "addressStreet", value: props.content.addressStreet, disabled: true },
    { placeholder: "Code postal", type: "text", toChange: "addressZipcode", value: props.content.addressZipcode, disabled: true },
    { placeholder: "Ville", type: "text", toChange: "addressCity", value: props.content.addressCity, disabled: true },
    { placeholder: "Pays", type: "text", toChange: "addressCountry", value: props.content.addressCountry, disabled: true },
    { placeholder: "Téléphone", type: "tel", toChange: "phone", value: props.content.phone, disabled: true }
    ]

    // Styling the whole template's font
    // Listing websafe fonts to select font-family
    const webSafeFontList = ["Arial", "Arial Black", "Comic Sans MS", "Courier New",
        "Georgia", "Helvetica", "Impact", "Lucida Console", "Lucida sans Unicode", "Palatino Linotype",
        "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana"]
    // Handling font-family selection 
    const [selectedFont, setSelectedFont] = useState("Arial")
    const [showFonts, setShowFonts] = useState(false);

    const handleFont = (event) => {
        event.preventDefault()
        setSelectedFont(event.target.value)
        props.setContent({ ...props.content, fontFamily: event.target.value })
        setShowFonts(false)
    }

    // URL.createObjectURL to save IMG
    // console.log("INFOS", props.content)
    // Choosing font-size
    const handleRange = (range) => {
        props.setContent({ ...props.content, fontSize: range })
    }

    // console.log(img)
    return (
        <>
            <div className={classes.infosContainer}>
                <div className={classes.inputsContainer}>
                    <div className={classes.inputContainer}>
                        <h4>Photo ou logo</h4>
                        <UploadFile
                            file={img}
                            setFile={(e) => setImg(e)}
                            placeholder="Importer une image"
                            type="image/*"
                        />
                    </div>
                </div>
                <div className={classes.inputsContainer}>
                    <div className={`${classes.expandTitle} ${!profile ? classes.closed : ""}`}>
                        <h4 onClick={() => setProfile(!profile)}>Informations du profil</h4>
                        <FiChevronDown onClick={() => setProfile(!profile)} />
                        </div>
                    {
                        profile ?
                            <div className={classes.inputsFlex}>
                                {inputs.map((input) => {
                                    return <div className={classes.inputContainer} key={input.placeholder}>
                                        <Input
                                            value={input.value.value}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            disabled={input.disabled}
                                            defaultColor={input.value.color}
                                            defaultStyle={input.value.style}
                                            toChange={input.toChange}
                                            content={props.content}
                                            setContent={props.setContent}
                                        />
                                    </div>
                                })}
                            </div> : <></>}
                </div>
                <div className={classes.inputsContainer}>
                    <div className={`${classes.expandTitle} ${!organisation ? classes.closed : ""}`}>
                        <h4 onClick={() => setOrganisation(!organisation)}>Informations de la société</h4>
                        <FiChevronDown onClick={() => setOrganisation(!organisation)} />
                    </div>
                    {organisation ?
                        <div className={classes.inputsFlex}>
                            {companyInputs.map((input) => {
                                return <div className={classes.inputContainer} key={input.placeholder}>
                                    <Input
                                        value={input.value.value}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        disabled={input.disabled}
                                        defaultColor={input.value.color}
                                        defaultStyle={input.value.style}
                                        toChange={input.toChange}
                                        content={props.content}
                                        setContent={props.setContent}
                                    />
                                </div>
                            })}
                        </div> : <></>}
                </div>
                <div className={classes.inputContainer}>
                    <h4>Style et taille du texte</h4>
                </div>
                <div className={classes.styleContainer}>
                    <div className={classes.row}>
                        <div className={classes.selectFontContainer}>
                            <input style={{ fontFamily: selectedFont }} className={classes.selectedFont}
                                type="text" readOnly value={selectedFont} onClick={() => setShowFonts(!showFonts)} />
                            <BsChevronDown />
                            <form onChange={(e) => handleFont(e)}>
                                {showFonts ? <ul className={classes.selectFont}>
                                    {webSafeFontList.map((font) => {
                                        return (
                                            <li>
                                                <input type="radio" value={font} id={font} name="font" />
                                                <label htmlFor={font} style={{ fontFamily: font }}>{font}</label>
                                            </li>)
                                    })}
                                </ul> : ""}
                            </form>
                        </div>
                        <div className={classes.selectSize}>
                            <div className={classes.row}>
                                <div>
                                    <span className={classes.fontSize}>
                                        {props.content.fontSize}px
                                    </span>
                                    <Range
                                        step={props.templateRules.fontSize.step}
                                        min={props.templateRules.fontSize.min}
                                        max={props.templateRules.fontSize.max}
                                        values={props.content.fontSize}
                                        onChange={(range) => handleRange(range)}
                                        renderTrack={({ props, children }) => (
                                            <div {...props} style={{
                                                ...props.style,
                                                height: "6px",
                                                width: "100%",
                                                backgroundColor: "#F1ECEA",
                                                margin: "0",
                                                borderRadius: "50px"
                                            }}>
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div {...props} style={{
                                                ...props.style,
                                                transition: "0.2s",
                                                height: "25px",
                                                width: "25px",
                                                backgroundColor: "#FF7954",
                                                border: "3px solid #FFF",
                                                borderRadius: "50%",
                                                outline: "none",
                                                boxShadow: "1px 1px 3px #FF795488"
                                            }}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}