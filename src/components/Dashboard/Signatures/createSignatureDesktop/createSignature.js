import classes from "./createSignature.module.css";
import { useRef, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { BsChevronDown, BsUpload } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import RenderHTML from "./RenderHTML/RenderHTML";
import Input from "./Infos/Input";
import { HexColorInput, HexColorPicker } from "react-colorful";
import axios from "axios";
import { API } from "../../../../config";
import Options from "../createSignature/Options/options";
import { Range } from "react-range";

function CreateSignatureComponent() {
  const [modal, setModal] = useState(false)
  const elem = useRef(null);
  const tags = useRef(null);
  const [range, setRange] = useState([50]);
  const [paddingTopBanner, setPaddingTopBanner] = useState([0])
  const [paddingFooter, setPaddingFooter] = useState([0])
  const [fontlist, setFontList] = useState(false);
  const [font, setFont] = useState("Arial")
  const [signatureName, setSignatureName] = useState()
  const [uploadedMedia, setUploadedMedia] = useState()
  const [bannerImg, setBannerImg] = useState()
  const [bannerImgHosted, setBannerImgHosted] = useState()
  const [socialColor, setSocialColor] = useState("#FFFFFF");
  const [socialBgColor, setSocialBgColor] = useState("#000000");
  const [socialOption, setSocialOption] = useState("");
  const [displaySocials, setDisplaySocials] = useState(true);
  const [template, setTemplate] = useState()

  const [tab, setTab] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [firstNameFont, setFirstNameFont] = useState("Helvetica");
  const [firstNameColor, setFirstNameColor] = useState("#402a27");
  const [firstNameFontSize, setFirstNameFontSize] = useState([50]);

  const [lastName, setLastName] = useState("");
  const [lastNameFont, setLastNameFont] = useState("Helvetica");
  const [lastNameColor, setLastNameColor] = useState("#402a27");
  const [lastNameFontSize, setLastNameFontSize] = useState([50]);

  const [poste, setPoste] = useState("");
  const [posteFont, setPosteFont] = useState("Helvetica");
  const [posteColor, setPosteColor] = useState("#402a27");
  const [posteFontSize, setPosteFontSize] = useState([50]);

  const [companyDetails, setCompanyDetails] = useState("");
  const [company, setCompany] = useState("");
  const [companyFont, setCompanyFont] = useState("Helvetica");
  const [companyColor, setCompanyColor] = useState("#ff7a3d");
  const [companyFontSize, setCompanyFontSize] = useState([50]);

  const [address, setAddress] = useState("");
  const [addressFont, setAddressFont] = useState("Helvetica");
  const [addressColor, setAddressColor] = useState("#402a27");
  const [addressFontSize, setAddressFontSize] = useState([50]);

  const [mobile, setMobile] = useState("");
  const [mobileFont, setMobileFont] = useState("Helvetica");
  const [mobileColor, setMobileColor] = useState("#402a27");
  const [mobileFontSize, setMobileFontSize] = useState([50]);

  const [phone, setPhone] = useState("");
  const [phoneFont, setPhoneFont] = useState("Helvetica");
  const [phoneColor, setPhoneColor] = useState("#402a27");
  const [phoneFontSize, setPhoneFontSize] = useState([50]);

  const [img, setImg] = useState([]);
  const [imgName, setImgName] = useState("");
  const [banner, setBanner] = useState();
  const [bannerName, setBannerName] = useState("");
  const [footerBanner, setFooterBanner] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState("");
  const [event, setEvent] = useState()
  const [loading, setLoading] = useState(false)
  // Options
  const [politesse, setPolitesse] = useState("")
  const [politesseValue, setPolitesseValue] = useState("")
  const [optionOrder, setOptionOrder] = useState()
  const [disclaimer, setDisclaimer] = useState("")
  const [disclaimerValue, setDisclaimerValue] = useState()
  const [ecoRes, setEcoRes] = useState(false)
  const [ecoValue, setEcoValue] = useState()
  let history = useHistory()

  const handleFont = (event) => {
    event.preventDefault()
    setFont(event.target.value)
    setFontList(false)
  }

  const handleCreation = async () => {
    setLoading(true)
    const imgForm = new FormData()
    const imgBanner = new FormData()
    const req = {
      name: signatureName,
      signatureData: selectedSignature
    }
    if (uploadedMedia) {
      imgForm.append('file', uploadedMedia)

      await axios.post(`${API}media`, imgForm).then(async (res) => {
        const request = {
          logo_id: res.data.id
        }
        await axios.patch(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}?access_token=${localStorage.getItem("token")}`, request).then((res) => {
          // console.log("patch", res)
        })
      })
    }
    if (bannerImg) {
      imgBanner.append('file', bannerImg)

      await axios.post(`${API}media`, imgBanner).then(async (res) => {
        setBannerImgHosted(res.data.path)
        // console.log("UPLOADING IMG", res.data)
      })

      return
    }
    else
      await axios.post(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/signature-templates?access_token=${localStorage.getItem("token")}`, req).then((res) => {
        history.push("/signatures")
      })
  }

  useEffect(async () => {
    await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}?access_token=${localStorage.getItem("token")}`).then((res) => {
      setCompanyDetails(res.data)
      setCompany(res.data.name)
      setAddress(res.data.address)
      setPhone(res.data.phone_number)
    })
    await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/campaigns?access_token=${localStorage.getItem("token")}`).then((res) => {
      console.log(res.data.data)
      res.data.data.map((campaign) => {
        if (campaign.active)
          setEvent(campaign.banner.path)
      })
    })
    await axios.get(`${API}user/${JSON.parse(localStorage.getItem("user")).id}?access_token=${localStorage.getItem("token")}`).then(async (res) => {
      setFirstName(res.data.first_name)
      setLastName(res.data.last_name)
      setPoste(res.data.position)
      setMobile(res.data.phone_number)
      if (res.data.signature)
        await axios.get(`${API}template/${res.data?.signature?.id}?access_token=${localStorage.getItem("token")}`).then((res) => {
          setTemplate(res.data.signatureData)
        })
    })
  }, [])

  const openModal = (isOpen) => {
    if (isOpen) {
      setModal(
        <div className={classes.modal}>
          <button className={classes.btnBackTemplate} onClick={() => openModal(false)}><HiOutlineArrowLeft />Retour à l'éditeur</button>
          <div className={classes.searchContainer}>
            <h1>Choisissez votre modèle de signature</h1>
            <div className={classes.tagsContainer}>
              <ul className={classes.studioStore}>
                <li className={classes.studio}>My Studio</li>
                <li className={classes.store}>My Store</li>
              </ul>
              <div className={classes.otherTagsContainer}>

                {/* <HiOutlineArrowLeft onClick={() => tags.current.scrollTo({ top: 0, left: tags.current.scrollLeft - 200, behavior: 'smooth' })} /> */}
                <ul className={classes.otherTags} ref={tags}>
                  <li className={classes.active}>Classique</li>
                  <li>Variable</li>
                  <li>Variable</li>
                  <li>Élegant</li>
                  <li>Créatif</li>
                  <li>Variable</li>
                </ul>
                {/* <HiOutlineArrowRight onClick={() => tags.current.scrollTo({ top: 0, left: tags.current.scrollLeft + 200, behavior: 'smooth' })} /> */}
              </div>
            </div>
            <div className={classes.orientationContainer}>
              <label className={classes.radioCtr} htmlFor="horizontal">Horizontal
                <input type="radio" checked="checked" id="horizontal" name="orientation" />
                <span className={classes.checkmark}></span>
              </label>
              <label className={classes.radioCtr} htmlFor="panoramique">Panoramique
                <input type="radio" checked="checked" id="panoramique" name="orientation" />
                <span className={classes.checkmark}></span>
              </label>
              <label className={classes.radioCtr} htmlFor="vertical">Vertical
                <input type="radio" checked="checked" id="vertical" name="orientation" />
                <span className={classes.checkmark}></span>
              </label>
            </div>
          </div>
          <ul className={classes.templatesContainer}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      )
      setTimeout(() => {
        elem.current.scrollTo({
          top: 0,
          left: window.innerWidth,
          behavior: 'smooth'
        });
      }, 10);
    }
    else {
      elem.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      setTimeout(() => {
        setModal()
      }, 1000);
    }

  }

  return (
    <div className={classes.container} style={{ overflow: modal ? "hidden" : "auto" }} ref={elem}>
      <div>
        <button className={classes.btnTemplate} onClick={() => openModal(true)}>Choisir un modèle de signature <HiOutlineArrowRight /></button>
        <h1>Créer une signature</h1>
        <div className={classes.row}>
          <div className={classes.options}>
            <div className={classes.optionsTitle}>
              <h6>Votre signature</h6>
              <button>Réinitialiser</button>
            </div>
            <div className={classes.tabsContainer}>
              <label className={classes.switchTabs}>
                <div className={classes.tabTitles}>
                  <span>Infos</span>
                  <span>Options</span>
                </div>
                <input type="checkbox" onChange={() => setTab(!tab)} />
                <div className={classes.sliderTabs}></div>
              </label>
            </div>
            <div className={classes.tabContent}>
              {tab ? (
                <>
                  <div className={classes.imgUploader}>
                    <div className={classes.inputsContainer}>
                      <div className={classes.inputContainer}>
                        <label>Photo ou logo</label>
                        <div className={classes.fileUpload}>
                          {imgName.length > 0 ? (
                            <div className={classes.uploadedFile}>
                              <span>{imgName}</span>{" "}
                              <IoMdClose
                                onClick={() => {
                                  setImgName("");
                                  setImg("");
                                }}
                              />
                            </div>
                          ) : (
                            <>
                              <input
                                type="file"
                                onChange={(e) => {
                                  setImg(URL.createObjectURL(e.target.files[0]));
                                  setImgName(e.target.files[0].name);
                                  setUploadedMedia(e.target.files[0])
                                }}
                              />
                              <span>
                                <BsUpload />
                                Importer une image
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={classes.inputContainer}>
                      <label>Informations personnelles</label>
                      <Input
                        value={firstName}
                        setValue={setFirstName}
                        type="text"
                        placeholder="Prénom"
                        color={firstNameColor}
                        setColor={setFirstNameColor}
                        font={firstNameFont}
                        setFont={setFirstNameFont}
                        range={firstNameFontSize}
                        setRange={setFirstNameFontSize}
                      />
                    </div>
                    <div className={classes.inputContainer}>
                      <Input
                        placeholder="Nom"
                        type="text"
                        value={lastName}
                        setValue={setLastName}
                        color={lastNameColor}
                        setColor={setLastNameColor}
                        font={lastNameFont}
                        setFont={setLastNameFont}
                        range={lastNameFontSize}
                        setRange={setLastNameFontSize}
                      />
                    </div>
                    <div className={classes.inputContainer}>
                      <Input
                        placeholder="Poste / Fonction"
                        type="text"
                        value={poste}
                        setValue={setPoste}
                        color={posteColor}
                        setColor={setPosteColor}
                        font={posteFont}
                        setFont={setPosteFont}
                        range={posteFontSize}
                        setRange={setPosteFontSize}
                      />
                    </div>
                    <div className={classes.inputContainer}>
                      <Input
                        disabled
                        type="text"
                        placeholder="Company"
                        value={company}
                        setValue={setCompany}
                        color={companyColor}
                        setColor={setCompanyColor}
                        font={companyFont}
                        setFont={setCompanyFont}
                        range={companyFontSize}
                        setRange={setCompanyFontSize}
                      />
                    </div>
                    <div className={classes.inputContainer}>
                      <Input
                        type="text"
                        placeholder="Adresse"
                        value={address}
                        setValue={setAddress}
                        color={addressColor}
                        setColor={setAddressColor}
                        font={addressFont}
                        setFont={setAddressFont}
                        range={addressFontSize}
                        setRange={setAddressFontSize}
                      />
                    </div>
                    <div className={classes.inputContainer}>
                      <Input
                        type="tel"
                        placeholder="Téléphone mobile"
                        value={mobile}
                        setValue={setMobile}
                        color={mobileColor}
                        setColor={setMobileColor}
                        font={mobileFont}
                        setFont={setMobileFont}
                        range={mobileFontSize}
                        setRange={setMobileFontSize}
                      />
                    </div>
                    <div className={classes.inputContainer}>
                      <Input
                        type="tel"
                        placeholder="Téléphone fixe"
                        value={phone}
                        setValue={setPhone}
                        color={phoneColor}
                        setColor={setPhoneColor}
                        font={phoneFont}
                        setFont={setPhoneFont}
                        range={phoneFontSize}
                        setRange={setPhoneFontSize}
                      />
                    </div>
                    <div className={classes.inputContainer}>
                      <label>Style du texte</label>

                    </div>
                    <span className={`${classes.span} ${classes.or}`}>
                      {range[0] === 0
                        ? "Petit"
                        : range[0] === 50
                          ? "Normal"
                          : "Grand"}
                    </span>
                    <Range
                      step={50}
                      min={0}
                      max={100}
                      values={range}
                      onChange={(range) => setRange(range)}
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
                    <div className={classes.selectFontContainer}>
                      <input style={{ fontFamily: font }} className={classes.selectedFont} type="text" readOnly value={font} onClick={() => setFontList(!fontlist)} />
                      <BsChevronDown />
                      <form onChange={(e) => handleFont(e)}>
                        {fontlist ? <ul className={classes.selectFont}>
                          <li>
                            <input type="radio" value="Arial" id="arial" name="font" />
                            <label htmlFor="arial" style={{ fontFamily: "Arial" }}>Arial</label>
                          </li>
                          <li>
                            <input type="radio" value="Arial Black" id="arial black" name="font" />
                            <label htmlFor="arial black" style={{ fontFamily: "Arial Black" }}>Arial Black</label>
                          </li>
                          <li>
                            <input type="radio" value="Comic Sans MS" id="comic sans ms" name="font" />
                            <label htmlFor="comic sans ms" style={{ fontFamily: "Comic Sans MS" }}>Comic Sans MS</label>
                          </li>
                          <li>
                            <input type="radio" value="Courier New" id="Courier New" name="font" />
                            <label htmlFor="Courier New" style={{ fontFamily: "Courier New" }}>Courier New</label>
                          </li>
                          <li>
                            <input type="radio" value="Georgia" id="Georgia" name="font" />
                            <label htmlFor="Georgia" style={{ fontFamily: "Georgia" }}>Georgia</label>
                          </li>
                          <li>
                            <input type="radio" value="Impact" id="Impact" name="font" />
                            <label htmlFor="Impact" style={{ fontFamily: "Impact" }}>Impact</label>
                          </li>
                          <li>
                            <input type="radio" value="Lucida Console" id="Lucida Console" name="font" />
                            <label htmlFor="Lucida Console" style={{ fontFamily: "Lucida Console" }}>Lucida Console</label>
                          </li>
                          <li>
                            <input type="radio" value="Lucida sans Unicode" id="Lucida sans Unicode" name="font" />
                            <label htmlFor="Lucida sans Unicode" style={{ fontFamily: "Lucida sans Unicode" }}>Lucida sans Unicode</label>
                          </li>
                          <li>
                            <input type="radio" value="Palatino Linotype" id="Palatino Linotype" name="font" />
                            <label htmlFor="Palatino Linotype" style={{ fontFamily: "Palatino Linotype" }}>Palatino Linotype</label>
                          </li>
                          <li>
                            <input type="radio" value="Tahoma" id="Tahoma" name="font" />
                            <label htmlFor="Tahoma" style={{ fontFamily: "Tahoma" }}>Tahoma</label>
                          </li>
                          <li>
                            <input type="radio" value="Times New Roman" id="Times New Roman" name="font" />
                            <label htmlFor="Times New Roman" style={{ fontFamily: "Times New Roman" }}>Times New Roman</label>
                          </li>
                          <li>
                            <input type="radio" value="Trebuchet MS" id="Trebuchet MS" name="font" />
                            <label htmlFor="Trebuchet MS" style={{ fontFamily: "Trebuchet MS" }}>Trebuchet MS</label>
                          </li>
                          <li>
                            <input type="radio" value="Verdana" id="Verdana" name="font" />
                            <label htmlFor="Verdana" style={{ fontFamily: "Verdana" }}>Verdana</label>
                          </li>
                        </ul> : ""}
                      </form>
                    </div>
                  </div>
                </>
              ) : !tab ? (
                <>
                  <div className={classes.inputContainer}>
                    <label>En-tête</label>
                  </div>
                  <div className={classes.iconsContainer}>
                    {politesse.length > 0 ? (
                      <input
                        type="text"
                        autoFocus
                        className={classes.input}
                        value={politesseValue}
                        onChange={(e) => setPolitesseValue(e.target.value)}
                        placeholder={politesse}
                      />
                    ) : (
                      <label htmlFor="polite">Formule de politesse</label>
                    )
                    }
                    <label className={classes.switch}>
                      <input
                        type="checkbox"
                        autoFocus
                        id="polite"
                        defaultChecked={politesse.length > 0}
                        onChange={(e) => {
                          e.target.checked
                            ? setPolitesse("Cordialement,")
                            : setPolitesse("");
                        }}
                      />
                      <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                  </div>
                  <div className={`${classes.iconsContainer} ${classes.topBannerContainer}`}>
                    {banner ? <div className={classes.fileUpload}>
                      <div className={classes.rangeUpload}>
                        {bannerName.length > 0 ? (
                          <>
                            <div className={classes.uploadedFile}>
                              <span title={bannerName}>{bannerName}</span>{" "}
                              <IoMdClose
                                onClick={() => {
                                  setBannerName("");
                                  setBanner("custom");
                                  setBannerImg();
                                  setBannerImgHosted();
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <input
                              type="file"
                              onChange={(e) => {
                                setBannerImg(e.target.files[0])
                                setBanner(URL.createObjectURL(e.target.files[0]));
                                setBannerName(e.target.files[0].name);
                              }}
                            />
                            <span>
                              <BsUpload />
                              Importez votre visuel
                            </span>
                          </>
                        )}
                      </div>
                    </div> : <label htmlFor="topBanner">Visuel</label>}
                    <label className={classes.switch}>
                      <input
                        type="checkbox"
                        autoFocus
                        id="topBanner"
                        onChange={(e) => {
                          e.target.checked
                            ? setBanner("custom")
                            : setBanner();
                        }}
                      />
                      <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                  </div>
                  {banner && <div className={classes.inputContainer}>
                    <span className={`${classes.span} ${classes.or}`}>
                      {paddingTopBanner} px
                    </span>
                    <Range
                      step={2}
                      min={0}
                      max={100}
                      values={paddingTopBanner}
                      onChange={(range) => setPaddingTopBanner(range)}
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
                  </div>}
                  <div className={classes.inputContainer}>
                    <label>Réseaux sociaux</label>
                  </div>
                  <div className={classes.iconsContainer}>
                    <label htmlFor="socials">Afficher réseaux</label>
                    {displaySocials && (
                      <>
                        <div className={classes.colorPreviewContainer}>
                          <div
                            className={classes.colorPreview}
                            style={{ background: socialColor }}
                            onClick={() =>
                              socialOption !== "color"
                                ? setSocialOption("color")
                                : setSocialOption("")
                            }
                          />
                          <div
                            className={classes.colorPreview}
                            style={{ background: socialBgColor }}
                            onClick={() =>
                              socialOption !== "background"
                                ? setSocialOption("background")
                                : setSocialOption("")
                            }
                          />
                        </div>
                      </>
                    )}
                    <label className={classes.switch}>
                      <input
                        defaultChecked={true}
                        type="checkbox"
                        id="socials"
                        onChange={() => setDisplaySocials(!displaySocials)}
                      />
                      <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                    {socialOption === "color" ? (
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
                      </>
                    ) : socialOption === "background" ? (
                      <>
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
                        <input type="text" placeholder="Follow us" />
                      </>
                    ) : null}

                  </div>
                  <div className={classes.inputContainer}>
                    <label title="Changer l'espacement du pied de page">Espacement</label>
                    <span className={`${classes.span} ${classes.or}`}>
                      {paddingFooter} px
                    </span>
                    <Range
                      step={2}
                      min={0}
                      max={100}
                      values={paddingFooter}
                      onChange={(range) => setPaddingFooter(range)}
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
                  </div>

                  <div className={classes.inputContainer}>
                    <label>Pied de page</label>
                  </div>
                  <Options
                    order={optionOrder}
                    setOrder={setOptionOrder}
                    disclaimer={disclaimer}
                    setDisclaimer={setDisclaimer}
                    disclaimerValue={disclaimerValue}
                    setDisclaimerValue={setDisclaimerValue}
                    eco={ecoRes}
                    setEco={setEcoRes}
                    ecoValue={ecoValue}
                    setEcoValue={setEcoValue}
                  />
                </>
              ) : null}
            </div>
          </div>
          <div className={classes.col}>
            <div className={classes.signatureContainer}>
              <div className={classes.browserHeader}>
                <ul className={classes.btnsContainer}>
                  <li className={classes.close}></li>
                  <li className={classes.reduce}></li>
                  <li className={classes.fullscreen}></li>
                </ul>
              </div>
              <div className={classes.lazyLoadingLong}></div>
              <div className={classes.lazyLoadingShort}></div>
              <div className={classes.lazyLoadingMedium}></div>
              <p>{politesseValue}</p>
              <RenderHTML template={template} data={{
                banner: bannerImgHosted || bannerImg && URL.createObjectURL(bannerImg) || null,
                firstName: firstName,
                firstNameStyle: `color:${firstNameColor};font-family:${firstNameFont};`,
                lastName: lastName,
                lastNameStyle: `color:${lastNameColor};font-family:${lastNameFont};`,
                poste: poste,
                posteStyle: `color:${posteColor};font-family:${posteFont};`,
                company: company,
                companyLogo: uploadedMedia,
                companyStyle: `color:${companyColor};font-family:${companyFont};`,
                address: address,
                addressStyle: `color:${addressColor};font-family:${addressFont};`,
                mobile: mobile,
                mobileStyle: `color:${mobileColor};font-family:${mobileFont};`,
                phone: phone,
                phoneStyle: `color:${phoneColor};font-family:${phoneFont};`,
                facebook: companyDetails.facebook,
                twitter: companyDetails.twitter,
                instagram: companyDetails.instagram,
                linkedin: companyDetails.linkedin,
                eventBanner: event
              }} />
              <p>{ecoRes ? ecoValue : ""}</p>
              <p>{disclaimer && disclaimerValue}</p>
            </div>
            <button className={classes.btn}>Sauvegarder</button>
          </div>
        </div>
      </div>
      {modal}
    </div>
  );
}

export default CreateSignatureComponent;
