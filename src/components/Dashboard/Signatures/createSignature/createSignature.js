import classes from "./createSignature.module.css";
import SignaturePreviewImg from "../../../../assets/img/signallypreview.svg";
import { useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoMdClose } from 'react-icons/io'
import { BsUpload } from 'react-icons/bs'
import Input from "./Infos/Input";
import Options from "./Options/options";
import { Range } from "react-range"
import { Link } from "react-router-dom";
import { HexColorInput, HexColorPicker } from "react-colorful";
import ReactDOMServer from "react-dom/server";

const signatureAPI = [
  {
    name: "JEREMIE TRIGANO",
    poste: "CEO",
    company: "MAMA SHELTER",
    address: "61 rue Servan, 75011 Paris, France",
    mobile: "0624927190",
    fix: "0175298234",
  },
  {
    name: "Sylvain Morgaine",
    poste: "CEO",
    company: "Signally",
    address: "44 Boulevard Hausmann 75009 Paris",
    mobile: "0624927190",
    fix: "0175298234",
  },
  {
    name: "Benjamin Morgaine",
    poste: "CEO",
    company: "Signally",
    address: "44 Boulevard Hausmann 75009 Paris",
    mobile: "0624927190",
    fix: "0175298234",
  },
];

function CreateSignatureComponent() {
  const [displaySocials, setDisplaySocials] = useState(true)
  const [socialColor, setSocialColor] = useState("#FFFFFF")
  const [socialBgColor, setSocialBgColor] = useState("#000000")
  const [socialOption, setSocialOption] = useState("")

  const [politesse, setPolitesse] = useState("")
  const [politesseValue, setPolitesseValue] = useState("")

  const [disclaimer, setDisclaimer] = useState(false)
  const [disclaimerValue, setDisclaimerValue] = useState("")
  
  const [ecoRes, setEcoRes] = useState(false)
  const [ecoValue, setEcoValue] = useState("")
  
  const [optionOrder, setOptionOrder] = useState(0)

  const [checked, setChecked] = useState(0)

  const [bannerRange, setBannerRange] = useState([60])
  const [footerRange, setFooterRange] = useState([100])

  const [firstName, setFirstName] = useState("")
  const [firstNameFont, setFirstNameFont] = useState("Helvetica")
  const [firstNameColor, setFirstNameColor] = useState("#402a27")
  const [firstNameFontSize, setFirstNameFontSize] = useState([50])

  const [lastName, setLastName] = useState("")
  const [lastNameFont, setLastNameFont] = useState("Helvetica")
  const [lastNameColor, setLastNameColor] = useState("#402a27")
  const [lastNameFontSize, setLastNameFontSize] = useState([50])

  const [poste, setPoste] = useState("")
  const [posteFont, setPosteFont] = useState("Helvetica")
  const [posteColor, setPosteColor] = useState("#402a27")
  const [posteFontSize, setPosteFontSize] = useState([50])

  const [company, setCompany] = useState("MAMA SHELTER")
  const [companyFont, setCompanyFont] = useState("Helvetica")
  const [companyColor, setCompanyColor] = useState("#ff7a3d")
  const [companyFontSize, setCompanyFontSize] = useState([50])

  const [address, setAddress] = useState("")
  const [addressFont, setAddressFont] = useState("Helvetica")
  const [addressColor, setAddressColor] = useState("#402a27")
  const [addressFontSize, setAddressFontSize] = useState([50])

  const [mobile, setMobile] = useState("")
  const [mobileFont, setMobileFont] = useState("Helvetica")
  const [mobileColor, setMobileColor] = useState("#402a27")
  const [mobileFontSize, setMobileFontSize] = useState([50])

  const [phone, setPhone] = useState("")
  const [phoneFont, setPhoneFont] = useState("Helvetica")
  const [phoneColor, setPhoneColor] = useState("#402a27")
  const [phoneFontSize, setPhoneFontSize] = useState([50])

  const [animation, setAnimation] = useState(classes["tab0"]);
  const [img, setImg] = useState([]);
  const [imgName, setImgName] = useState("")
  const [banner, setBanner] = useState([]);
  const [bannerName, setBannerName] = useState("");
  const [footerBanner, setFooterBanner] = useState([]);
  // let test = ReactDOMServer.renderToStaticMarkup(<div style={{borderColor: "red"}}>test</div>);
  const [signature, setSignature] = useState(
  signatureAPI.map((signature, index) => {
    if (animation === classes["tab2"] && checked !== index)
      return;
    return (
       <li key={index} className={classes.signature}>
        {animation === classes["tab0"] &&
          <input
            onChange={(e) => e.target.checked && setChecked(index)}
            type="radio"
            className={classes.signInput}
            name="signature"
            defaultChecked={index === 0 && !checked && true}
          />}
        <div className={`${classes.previewContainer}`}>
          {animation === classes["tab2"] && <p className={classes.polite}>{politesseValue && politesse && politesseValue}</p>}

          {banner.length > 0 && animation === classes["tab2"] ? <img src={banner} className={classes.banner} style={{ marginRight: 100 - bannerRange + "%" }} /> : <div className={classes.placeholderImg}></div>}
          <img className={classes.companyImg} src={img.length > 0 ? img : SignaturePreviewImg} alt="Signature preview" />
          <div className={classes.signText}>
            <h3>
              {firstName.length > 0 ?
                <><span style={{
                  color: firstNameColor,
                  fontFamily: firstNameFont,
                  fontSize:
                    firstNameFontSize[0] === 0
                      ? ".8rem"
                      : firstNameFontSize[0] === 50
                        ? "1rem"
                        : "1.2rem",
                }}>  {firstName}</span> <span style={{
                  color: lastNameColor,
                  fontFamily: lastNameFont,
                  fontSize:
                    lastNameFontSize[0] === 0
                      ? ".8rem"
                      : lastNameFontSize[0] === 50
                        ? "1rem"
                        : "1.2rem",
                }}>
                    {lastName}</span></> : signature.name}
            </h3>
            <p style={{
              color: posteColor,
              fontFamily: posteFont,
              fontSize:
                posteFontSize[0] === 0
                  ? ".8rem"
                  : posteFontSize[0] === 50
                    ? "1rem"
                    : "1.2rem",
            }}>{poste.length > 0 ? `${poste}` : signature.poste}</p>

            <h4 style={{
              color: companyColor,
              fontFamily: companyFont,
              fontSize:
                companyFontSize[0] === 0
                  ? ".8rem"
                  : companyFontSize[0] === 50
                    ? "1rem"
                    : "1.2rem",
            }}>{signature.company}</h4>

            <p style={{
              color: addressColor,
              fontFamily: addressFont,
              fontSize:
                addressFontSize[0] === 0
                  ? ".8rem"
                  : addressFontSize[0] === 50
                    ? "1rem"
                    : "1.2rem",
            }}>{address.length > 0 ? `${address}` : signature.address}</p>

            <p style={{
              color: companyColor,
              fontWeight: "bold", fontSize: mobileFontSize[0] === 0
                ? ".8rem"
                : mobileFontSize[0] === 50
                  ? "1rem"
                  : "1.2rem"
            }}>
              T{" "}
              <span className={classes.orangeTxt} style={{
                color: mobileColor,
                fontWeight: "normal",
                fontFamily: mobileFont,
                fontSize:
                  mobileFontSize[0] === 0
                    ? ".8rem"
                    : mobileFontSize[0] === 50
                      ? "1rem"
                      : "1.2rem",
              }}>
                {mobile.length > 0 ? `${mobile}` : signature.mobile}
              </span>{" "}
              <span style={{
                color: companyColor, fontSize: phoneFontSize[0] === 0
                  ? ".8rem"
                  : phoneFontSize[0] === 50
                    ? "1rem"
                    : "1.2rem"
              }}>{" M "}</span>
              <span className={classes.orangeTxt} style={{
                color: phoneColor,
                fontFamily: phoneFont,
                fontWeight: "normal",
                fontSize:
                  phoneFontSize[0] === 0
                    ? ".8rem"
                    : phoneFontSize[0] === 50
                      ? "1rem"
                      : "1.2rem",

              }}>{phone.length > 0 ? `${phone}` : signature.fix}</span>
            </p>
            {signature.img1 ? <img src={signature.img1} /> : null}
            {displaySocials &&
              <ul className={classes.socials}>
                <li><FaFacebookF color={socialColor} style={{ background: socialBgColor }} /></li>
                <li><FaTwitter color={socialColor} style={{ background: socialBgColor }} /></li>
                <li><FaInstagram color={socialColor} style={{ background: socialBgColor }} /></li>
                <li><FaLinkedinIn color={socialColor} style={{ background: socialBgColor }} /></li>
              </ul>}
          <p>{animation === classes["tab2"] && (optionOrder[0]?.id === "eco" ? ecoRes.length > 0 && ecoValue : disclaimer.length > 0 && disclaimerValue)}</p>
          <p>{animation === classes["tab2"] && (optionOrder[1]?.id === "eco" ? ecoRes.length > 0 && ecoValue : disclaimer.length > 0 && disclaimerValue)}</p>
          </div>
          {footerBanner.length > 0 && animation === classes["tab2"] ? <img src={footerBanner} className={classes.banner} style={{ width: footerRange + "%" }} /> : <div className={classes.placeholderBanner}></div>}
        </div>
      </li>
    )
  }))
  console.log(ReactDOMServer.renderToStaticMarkup(signature[0]))

  return (
    <div className={classes.container}>
      <div className={`${classes.topContainer} ${animation === classes["tab2"] && classes.bigPreview}`}>
        <form>
          <ul className={classes.signaturePreviewList}>
            {signature}
          </ul>
        </form>
        <div className={classes.tabsContainer}>
          <ul className={classes.tabs}>
            <li onClick={() => setAnimation(`${classes["tab0"]}`)}>
              <div className={`${classes.selectedTab} ${animation}`}></div>
              <input type="radio" name="tabs" />
              <div className={classes.tabContainer}>Infos</div>
            </li>
            <li onClick={() => setAnimation(`${classes["tab2"]}`)}>
              <input type="radio" name="tabs" />
              <div className={classes.tabContainer}>Options</div>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.tabContent}>
        {animation === classes["tab0"] ? (
          <>
            <div className={classes.imgUploader}>
              <div className={classes.inputsContainer}>
                <div className={classes.inputContainer}>
                  <label>Photo ou logo</label>
                  <div className={classes.fileUpload}>
                    {imgName.length > 0 ?
                      <div className={classes.uploadedFile}><span>{imgName}</span> <IoMdClose onClick={() => { setImgName(""); setImg("") }} /></div>
                      : <><input type="file" onChange={(e) => { setImg(URL.createObjectURL(e.target.files[0])); setImgName(e.target.files[0].name) }} /><span><BsUpload />Importer une image</span></>}
                  </div>
                </div>
              </div>
              <div className={classes.inputContainer}>
                <label>Informations personnelles</label>
                <Input value={firstName} setValue={setFirstName}
                  type="text"
                  placeholder="Prénom"
                  color={firstNameColor} setColor={setFirstNameColor}
                  font={firstNameFont} setFont={setFirstNameFont}
                  range={firstNameFontSize} setRange={setFirstNameFontSize} />
              </div>
              <div className={classes.inputContainer}>
                <Input placeholder="Nom" type="text" value={lastName} setValue={setLastName}
                  color={lastNameColor} setColor={setLastNameColor}
                  font={lastNameFont} setFont={setLastNameFont}
                  range={lastNameFontSize} setRange={setLastNameFontSize} />
              </div>
              <div className={classes.inputContainer}>
                <Input placeholder="Poste / Fonction" type="text" value={poste} setValue={setPoste}
                  color={posteColor} setColor={setPosteColor}
                  font={posteFont} setFont={setPosteFont}
                  range={posteFontSize} setRange={setPosteFontSize} />
              </div>
              <div className={classes.inputContainer}>
                <Input disabled type="text" placeholder="Company" value={company} setValue={setCompany}
                  color={companyColor} setColor={setCompanyColor}
                  font={companyFont} setFont={setCompanyFont}
                  range={companyFontSize} setRange={setCompanyFontSize} />
              </div>
              <div className={classes.inputContainer}>
                <Input type="text" placeholder="Adresse" value={address} setValue={setAddress}
                  color={addressColor} setColor={setAddressColor}
                  font={addressFont} setFont={setAddressFont}
                  range={addressFontSize} setRange={setAddressFontSize} />
              </div>
              <div className={classes.inputContainer}>
                <Input type="tel" placeholder="Téléphone mobile" value={mobile} setValue={setMobile}
                  color={mobileColor} setColor={setMobileColor}
                  font={mobileFont} setFont={setMobileFont}
                  range={mobileFontSize} setRange={setMobileFontSize} />
              </div>
              <div className={classes.inputContainer}>
                <Input type="tel" placeholder="Téléphone fixe" value={phone} setValue={setPhone}
                  color={phoneColor} setColor={setPhoneColor}
                  font={phoneFont} setFont={setPhoneFont}
                  range={phoneFontSize} setRange={setPhoneFontSize} />
              </div>
            </div>
          </>
        ) : animation === classes["tab1"] ? (
          <>

          </>
        ) : animation === classes["tab2"] ? (
          <>
            <br />
            <br />
            <br />
            <div className={classes.inputContainer}>
              <label>En-tête</label>
            </div>
            <div className={classes.dragContainer}>
              <div className={classes.iconsContainer}>
                {politesse.length > 0 ? <input type="text" autoFocus className={classes.input} value={politesseValue} onChange={(e) => setPolitesseValue(e.target.value)} placeholder={politesse} /> :
                  <label htmlFor="polite">Formule de politesse</label>}
                <label className={classes.switch}>
                  <input type="checkbox" id="polite" defaultChecked={politesse.length > 0} onChange={(e) => { e.target.checked ? setPolitesse("Cordialement,") : setPolitesse("") }} />
                  <span
                    className={`${classes.slider} ${classes.round}`}
                  ></span>
                </label>
              </div>
              <br />
              <div className={classes.fileUpload}>
                <div className={classes.rangeUpload}>
                  {bannerName.length > 0 ?
                    <><div className={classes.uploadedFile}><span>{bannerName}</span> <IoMdClose onClick={() => { setBannerName(""); setBanner("") }} /></div>
                      <span>{bannerRange}%</span>
                      <Range
                        step={1}
                        min={1}
                        max={100}
                        values={bannerRange}
                        onChange={(range) => setBannerRange(range)}
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            style={{
                              ...props.style,
                              height: "6px",
                              width: "50%",
                              backgroundColor: "#FF795422",
                              margin: "1rem auto",
                              borderRadius: "50px"
                            }}
                          >
                            {children}
                          </div>
                        )}
                        renderThumb={({ props }) => (
                          <div
                            {...props}
                            style={{
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
                    </>
                    : <><input type="file" onChange={(e) => { setBanner(URL.createObjectURL(e.target.files[0])); setBannerName(e.target.files[0].name) }} /><span><BsUpload />Importer une image</span></>}
                </div>
              </div>
              <div className={classes.inputContainer}>
                <label>Réseaux sociaux</label>
              </div>
              <div className={classes.iconsContainer}>
                <label htmlFor="socials">Afficher réseaux</label>
                {displaySocials && <>
                  <div className={classes.colorPreviewContainer}>
                    <div
                      className={classes.colorPreview}
                      style={{ background: socialColor }}
                      onClick={() => socialOption !== "color" ? setSocialOption("color") : setSocialOption("")} />
                    <div className={classes.colorPreview}
                      style={{ background: socialBgColor }}
                      onClick={() => socialOption !== "background" ? setSocialOption("background") : setSocialOption("")} />
                  </div>
                </>}
                <label className={classes.switch}>
                  <input defaultChecked={true} type="checkbox" id="socials" onChange={(() => setDisplaySocials(!displaySocials))} />
                  <span
                    className={`${classes.slider} ${classes.round}`}
                  ></span>
                </label>
              {socialOption === "color" ?
                    <>
                      <div className={classes.optionContainer}>
                        <HexColorInput
                          className={classes.input}
                          color={socialColor}
                          onChange={setSocialColor}
                        />
                        <HexColorPicker
                          className={classes.colorPick}
                          color={socialColor}
                          onChange={setSocialColor}
                        />
                      </div>
                    </> : socialOption === "background" ? <>
                      <div className={classes.optionContainer}>
                        <HexColorInput
                          className={classes.input}
                          color={socialBgColor}
                          onChange={setSocialBgColor}
                        />
                        <HexColorPicker
                          className={classes.colorPick}
                          color={socialBgColor}
                          onChange={setSocialBgColor}
                        />
                      </div>
                    </> : null}
              </div>
              <div className={classes.inputContainer}>
                <label>Bannière</label>
              </div>
              <div className={classes.iconsContainer}>
                <label htmlFor="event">Activer évènement</label>
                <label className={classes.switch}>
                  <input type="checkbox" id="event" onChange={(e) => e.target.checked && banner ? setFooterBanner(banner) : setFooterBanner("")} />
                  <span
                    className={`${classes.slider} ${classes.round}`}
                  ></span>
                </label>
                {footerBanner.length > 0 && <>
                  <div className={classes.rangeUpload}>
                    {footerRange}%
                    <Range
                      step={1}
                      min={1}
                      max={100}
                      values={footerRange}
                      onChange={(range) => setFooterRange(range)}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "6px",
                            width: "50%",
                            backgroundColor: "#FF795422",
                            margin: "1rem auto",
                            borderRadius: "50px"
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          style={{
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
                  </div></>}
              </div>
              <div className={classes.inputContainer}>
                <label>Pied de page</label>
              </div>
              <Options order={optionOrder} setOrder={setOptionOrder} disclaimer={disclaimer} setDisclaimer={setDisclaimer} 
              disclaimerValue={disclaimerValue} setDisclaimerValue={setDisclaimerValue} 
              eco={ecoRes} setEco={setEcoRes}
              ecoValue={ecoValue} setEcoValue={setEcoValue}
              />
            </div>
          </>
        ) : null}
        <div className={classes.CTAcontainer}>
          <Link to="/signatures">
            <button className={`${classes.btn} ${classes.outlineBtn}`}>Retour</button>
          </Link>
          <button className={`${classes.btn} ${classes.outlineBtn}`}>Valider ma signature</button>
        </div>
      </div>
    </div>
  );
}

export default CreateSignatureComponent;
