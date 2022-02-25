import classes from "./createSignature.module.css";
import { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import { API } from "config";
import Options from "./Options/options";
import Infos from "./Infos/infos";
import TemplateSelection from "./TemplateSelect/templateSelect";
import Preview from "./Preview/customizablePreview";
import { BsArrowRight } from "react-icons/bs";
import Button from "Utils/Button/btn";
import { renderToString } from "react-dom/server";
import { API } from "config";
import Input from "Utils/Input/input";
import { useHistory } from "react-router";
import { UseEvents } from "Utils/useEvents/useEvents";
import { useNotification } from "Utils/Notifications/notifications";
import request from "Utils/Request/request";

// Component handling the creation of signature, selection of template

function CreateSignatureComponent() {
  const [user, setUser] = useState(null)
  const [company, setCompany] = useState(null)
  const [events, setEvents] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState()
  const history = useHistory()
  const notification = useNotification()
  const [preview, setPreview] = useState("")
  
  const [templateRules, setTemplateRules] = useState({
    fontSize: { min: 9, max: 13, step: 1 }
  })
  
  
  const [signatureInfo, setSignatureInfo] = useState({
    logo: company?.logo,
    firstName: { value: user?.first_name, color: "#000", style: { fontWeight: "bold" } },
    lastName: { value: user?.last_name, color: "#000", style: { fontWeight: "bold" } },
    jobName: { value: user?.position, color: "#000", style: {} },
    company: { value: company?.name, color: "#000", style: { fontWeight: "bold" } },
    addressStreet: { value: company?.street, color: "#000", style: {} },
    addressInfo: { value: company?.streetInfo, color: "#000", style: {} },
    addressZipcode: { value: company?.zipCode, color: "#000", style: {} },
    addressCity: { value: company?.city, color: "#000", style: {} },
    addressCountry: { value: company?.country, color: "#000", style: {} },
    mobile: { value: user?.phone_number, color: "#000", style: {} },
    phone: { value: company?.phone_number, color: "#000", style: {} },
    fontSize: [11],
    fontFamily: "Helvetica"
  });
  const [signatureOption, setSignatureOption] = useState({
    footer: { disclaimerValue: "Disclaimer", disclaimerEnabled: false, ecoValue: "Eco resp", ecoEnabled: false, items: ["Disclaimer", "Eco"] },
    salutation: { value: "Cordialement,", enabled: false, padding: 10 },
    custom: { enabled: false },
    eco: { value: "Ecoresponsability", enabled: false },
    followUs: { value: "Follow us", enabled: false, disabled: true },
    bgColor: "#FCE750",
    bannerTop: { url: "test", enabled: false, padding: 10 },
    event: { list: events, selected: events[0], enabled: false, padding: 12 },
    socials: { enabled: false, bgColor: "#000", fill: "#FFF", items: ["facebook", "linkedin", "twitter", "instagram", "snapchat", "pinterest"] },
    footer: {
      maxWidth: 380, value: `This e-mail, any attachments and the information contained therein ("this message") are confidential and intended solely for the use of the addressee(s). If you have received this message in error please send it back to the sender and delete it. Unauthorized publication, use, dissemination or disclosure of this message, either in whole or in part is strictly prohibited.
    
    Ce message electronique et tous les fichiers joints ainsi que les informations contenues dans ce message (ci apres "le message"), sont confidentiels et destines exclusivement a l'usage de la personne a laquelle ils sont adresses. Si vous avez recu ce message par erreur, merci de le renvoyer a son emetteur et de le detruire. Toute diffusion, publication, totale ou partielle ou divulgation sous quelque forme que ce soit non expressement autorisees de ce message, sont interdites.,`, enabled: false, padding: 10, size: 7
    }
  })

  const handlePopulate = () => {
    setSignatureInfo({
      logo: company?.logo,
      firstName: { value: user?.first_name, color: "#000", style: { fontWeight: "bold" } },
      lastName: { value: user?.last_name, color: "#000", style: { fontWeight: "bold" } },
      jobName: { value: user?.position, color: "#000", style: {} },
      company: { value: company?.name, color: "#000", style: { fontWeight: "bold" } },
      addressStreet: { value: company?.street, color: "#000", style: {} },
      addressInfo: { value: company?.streetInfo, color: "#000", style: {} },
      addressZipcode: { value: company?.zipCode, color: "#000", style: {} },
      addressCity: { value: company?.city, color: "#000", style: {} },
      addressCountry: { value: company?.country, color: "#000", style: {} },
      mobile: { value: user?.phone_number, color: "#000", style: {} },
      phone: { value: company?.phone_number, color: "#000", style: {} },
      fontSize: [11],
      fontFamily: "Helvetica"
    })
    setSignatureOption({
      footer: { disclaimerValue: "Disclaimer", disclaimerEnabled: false, ecoValue: "Eco resp", ecoEnabled: false, items: ["Disclaimer", "Eco"] },
      salutation: { value: "Cordialement,", enabled: false, padding: 10 },
      custom: { enabled: false },
      eco: { value: "Ecoresponsability", enabled: false },
      followUs: { value: "Follow us", enabled: false },
      bgColor: "#FCE750",
      bannerTop: { url: "test", enabled: false, padding: 10 },
      event: { ...signatureOption.event, display: `${API}${signatureOption.event.selected.imagePath}`, enabled: false, padding: 12 },
      socials: { enabled: false, bgColor: "#000", fill: "#FFF", items: ["twitter", "facebook", "pinterest", "snapchat", "linkedin", "instagram"] },
      footer: {
        maxWidth: 380, value: `This e-mail, any attachments and the information contained therein ("this message") are confidential and intended solely for the use of the addressee(s). If you have received this message in error please send it back to the sender and delete it. Unauthorized publication, use, dissemination or disclosure of this message, either in whole or in part is strictly prohibited.
      
      Ce message electronique et tous les fichiers joints ainsi que les informations contenues dans ce message (ci apres "le message"), sont confidentiels et destines exclusivement a l'usage de la personne a laquelle ils sont adresses. Si vous avez recu ce message par erreur, merci de le renvoyer a son emetteur et de le detruire. Toute diffusion, publication, totale ou partielle ou divulgation sous quelque forme que ce soit non expressement autorisees de ce message, sont interdites.,`, enabled: false, padding: 10, size: 7
      }
    })
  }

  useEffect(() => {
    const getUser = async () => {
      const user = await request.get('whoami')
      const company = await request.get(JSON.parse(localStorage.getItem('user')).organisation)

      setUser(user)
      setCompany(company)
      setSignatureInfo({
        logo: company?.logo,
        firstName: { value: user?.first_name, color: "#000", style: { fontWeight: "bold" } },
        lastName: { value: user?.last_name, color: "#000", style: { fontWeight: "bold" } },
        jobName: { value: user?.position, color: "#000", style: {} },
        company: { value: company?.name, color: "#000", style: { fontWeight: "bold" } },
        addressStreet: { value: company?.address?.street, color: "#000", style: {} },
        addressInfo: { value: company?.address?.streetInfo, color: "#000", style: {} },
        addressZipcode: { value: company?.address?.zipCode, color: "#000", style: {} },
        addressCity: { value: company?.address?.city, color: "#000", style: {} },
        addressCountry: { value: company?.address?.country, color: "#000", style: {} },
        mobile: { value: user?.phone_number, color: "#000", style: {} },
        phone: { value: company?.digitalAddress?.phone, color: "#000", style: {} },
        fontSize: [11],
        fontFamily: "Helvetica"
      })
    }

    getUser()
  }, [])

  // Menu
  const [tab, setTab] = useState(true);


  useEffect(() => {
    const getEvents = async () => {
      const eventAPI = await UseEvents(localStorage.getItem("organisation_id"))
      setSignatureOption({ ...signatureOption, event: { ...signatureOption.event, selected: eventAPI[0], list: eventAPI } }, "active")
    }
    getEvents()
  }, [signatureOption.event.enabled])

  // Used to handle transition
  const elem = useRef(null);
  const [templates, setTemplates] = useState(false)

  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState()
  const [templateId, setTemplateIdToPatch] = useState()
  const [signatureName, setSignatureName] = useState("test")

  useEffect(() => {
    const handleModal = () => {
      return (<span><div className={classes.modal}>
        <div className={classes.slidesContainer}>
          <div className={classes.slide}>
            <h4>Donner un nom à cette signature</h4>
            <Input style={{ width: "75%" }} placeholder="Nom de la signature" type="text" onChange={(e) => setSignatureName(e.target.value)} />
            <div onClick={() => setModal(false)}>
              <Button width="30%" color="brown">Annuler</Button>
              <Button width="40%" color="orange" onClick={() => handleSave()}>Valider</Button>
            </div>
          </div>
        </div>
      </div>
      </span>)
    }
    setModalContent(handleModal(modal))
  }, [modal, signatureName])

  const handleSave = async () => {
    // const toSave = {
    //   ...signatureInfo,
    //   logo: { ...signatureInfo.logo, path: "PLACEHOLDER_COMPANY_ICON" },
    //   firstName: { ...signatureInfo.firstName, value: "PLACEHOLDER_FIRST_NAME" },
    //   lastName: { ...signatureInfo.lastName, value: "PLACEHOLDER_LAST_NAME" },
    //   jobName: { ...signatureInfo.jobName, value: "PLACEHOLDER_POSITION" },
    //   company: { ...signatureInfo.company, value: "PLACEHOLDER_COMPANY" },
    //   addressStreet: { ...signatureInfo.addressStreet, value: "PLACEHOLDER_ADDRESS_STREET" },
    //   addressInfo: { ...signatureInfo.addressInfo, value: "PLACEHOLDER_ADDRESS_INFO" },
    //   addressZipcode: { ...signatureInfo.addressZipcode, value: "PLACEHOLDER_ADDRESS_ZIPCODE" },
    //   addressCity: { ...signatureInfo.addressCity, value: "PLACEHOLDER_ADDRESS_CITY" },
    //   addressCountry: { ...signatureInfo.country, value: "PLACEHOLDER_ADDRESS_COUNTRY" },
    //   mobile: { ...signatureInfo.mobile, value: "PLACEHOLDER_MOBILE" },
    //   phone: { ...signatureInfo.phone, value: "PLACEHOLDER_PHONE" },

    //   event: signatureOption.event.enabled === true ? "PLACEHOLDER_EVENT_BANNER" : "",
    // }
    const test = <Preview infos={signatureInfo} options={signatureOption} template={selectedTemplate.html} />

    const req = {
      name: signatureName,
      html: renderToString(test)
    }

    await request.post('signature_templates', req).then(async (res) => {
      await request.post(`signatures`, { name: signatureName, html: selectedTemplate.html, signatureTemplate: res.data['@id'], organisation: JSON.parse(localStorage.getItem('user')).organisation }).then(
        async (result) => {
          notification({ content: <>Votre signature <span style={{ color: "#FF7954" }}>{signatureName}</span> a été créée avec succès</>, status: "valid" })
          setTemplateIdToPatch(result.data.id)
          const styles = [
            // COLOR FOR EACH TXT
            {
              "property": "color",
              "value": signatureInfo.firstName.color,
              "type": "firstName",
              "signature": result.data.id,
            },
            {
              "property": "color",
              "value": signatureInfo.lastName.color,
              "type": "lastName",
              "signature": result.data.id
            },
            {
              "property": "color",
              "value": signatureInfo.jobName.color,
              "type": "jobName",
              "signature": result.data.id,
            },
            {
              "property": "color",
              "value": signatureInfo.mobile.color,
              "type": "mobile",
              "signature": result.data.id,
            },
            {
              "property": "color",
              "value": signatureInfo.addressStreet.color,
              "type": "addressStreet",
              "signature": result.data.id,
            },
            {
              "property": "color",
              "value": signatureInfo.addressInfo.color,
              "type": "addressInfo",
              "signature": result.data.id,
            },
            {
              "property": "color",
              "value": signatureInfo.addressZipcode.color,
              "type": "addressZipcode",
              "signature": result.data.id,
            },
            {
              "property": "color",
              "value": signatureInfo.addressCity.color,
              "type": "addressCity",
              "signature": result.data.id,
            },
            {
              "property": "color",
              "value": signatureInfo.addressCountry.color,
              "type": "addressCountry",
              "signature": result.data.id,
            },
            {
              "property": "color",
              "value": signatureInfo.phone.color,
              "type": "phone",
              "signature": result.data.id,
            },
            // FONT WEIGHT FOR EACH TXT
            {
              "property": "fontWeight",
              "value": signatureInfo.firstName.style.fontWeight || "normal",
              "type": "firstName",
              "signature": result.data.id,
            },
            {
              "property": "fontWeight",
              "value": signatureInfo.lastName.style.fontWeight || "normal",
              "type": "lastName",
              "signature": result.data.id
            },
            {
              "property": "fontWeight",
              "value": signatureInfo.jobName.style.fontWeight || "normal",
              "type": "jobName",
              "signature": result.data.id,
            },
            {
              "property": "fontWeight",
              "value": signatureInfo.mobile.style.fontWeight || "normal",
              "type": "mobile",
              "signature": result.data.id,
            },
            {
              "property": "fontWeight",
              "value": signatureInfo.addressStreet.style.fontWeight || "normal",
              "type": "addressStreet",
              "signature": result.data.id,
            },
            {
              "property": "fontWeight",
              "value": signatureInfo.addressInfo.style.fontWeight || "normal",
              "type": "addressInfo",
              "signature": result.data.id,
            },
            {
              "property": "fontWeight",
              "value": signatureInfo.addressZipcode.style.fontWeight || "normal",
              "type": "addressZipcode",
              "signature": result.data.id,
            },
            {
              "property": "fontWeight",
              "value": signatureInfo.addressCity.style.fontWeight || "normal",
              "type": "addressCity",
              "signature": result.data.id,
            },
            {
              "property": "fontWeight",
              "value": signatureInfo.addressCountry.style.fontWeight || "normal",
              "type": "addressCountry",
              "signature": result.data.id,
            },
            {
              "property": "fontWeight",
              "value": signatureInfo.phone.style.fontWeight || "normal",
              "type": "phone",
              "signature": result.data.id,
            },
            // TEXT DECORATION FOR EACH TXT
            {
              "property": "textDecoration",
              "value": signatureInfo.firstName.style.textDecoration || "none",
              "type": "firstName",
              "signature": result.data.id,
            },
            {
              "property": "textDecoration",
              "value": signatureInfo.lastName.style.textDecoration || "none",
              "type": "lastName",
              "signature": result.data.id
            },
            {
              "property": "textDecoration",
              "value": signatureInfo.jobName.style.textDecoration || "none",
              "type": "jobName",
              "signature": result.data.id,
            },
            {
              "property": "textDecoration",
              "value": signatureInfo.mobile.style.textDecoration || "none",
              "type": "mobile",
              "signature": result.data.id,
            },
            {
              "property": "textDecoration",
              "value": signatureInfo.addressStreet.style.textDecoration || "none",
              "type": "addressStreet",
              "signature": result.data.id,
            },
            {
              "property": "textDecoration",
              "value": signatureInfo.addressInfo.style.textDecoration || "none",
              "type": "addressInfo",
              "signature": result.data.id,
            },
            {
              "property": "textDecoration",
              "value": signatureInfo.addressZipcode.style.textDecoration || "none",
              "type": "addressZipcode",
              "signature": result.data.id,
            },
            {
              "property": "textDecoration",
              "value": signatureInfo.addressCity.style.textDecoration || "none",
              "type": "addressCity",
              "signature": result.data.id,
            },
            {
              "property": "textDecoration",
              "value": signatureInfo.addressCountry.style.textDecoration || "none",
              "type": "addressCountry",
              "signature": result.data.id,
            },
            {
              "property": "textDecoration",
              "value": signatureInfo.phone.style.textDecoration || "none",
              "type": "phone",
              "signature": result.data.id,
            },
            // FONT STYLE FOR EACH TXT
            {
              "property": "fontStyle",
              "value": signatureInfo.firstName.style.fontStyle || "normal",
              "type": "firstName",
              "signature": result.data.id,
            },
            {
              "property": "fontStyle",
              "value": signatureInfo.lastName.style.fontStyle || "normal",
              "type": "lastName",
              "signature": result.data.id
            },
            {
              "property": "fontStyle",
              "value": signatureInfo.jobName.style.fontStyle || "normal",
              "type": "jobName",
              "signature": result.data.id,
            },
            {
              "property": "fontStyle",
              "value": signatureInfo.mobile.style.fontStyle || "normal",
              "type": "mobile",
              "signature": result.data.id,
            },
            {
              "property": "fontStyle",
              "value": signatureInfo.addressStreet.style.fontStyle || "normal",
              "type": "addressStreet",
              "signature": result.data.id,
            },
            {
              "property": "fontStyle",
              "value": signatureInfo.addressInfo.style.fontStyle || "normal",
              "type": "addressInfo",
              "signature": result.data.id,
            },
            {
              "property": "fontStyle",
              "value": signatureInfo.addressZipcode.style.fontStyle || "normal",
              "type": "addressZipcode",
              "signature": result.data.id,
            },
            {
              "property": "fontStyle",
              "value": signatureInfo.addressCity.style.fontStyle || "normal",
              "type": "addressCity",
              "signature": result.data.id,
            },
            {
              "property": "fontStyle",
              "value": signatureInfo.addressCountry.style.fontStyle || "normal",
              "type": "addressCountry",
              "signature": result.data.id,
            },
            {
              "property": "fontStyle",
              "value": signatureInfo.phone.style.fontStyle || "normal",
              "type": "phone",
              "signature": result.data.id,
            },
            // FONT GENERAL STYLE
            {
              "property": "fontFamily",
              "value": signatureInfo.fontFamily,
              "type": "generalFontFamily",
              "signature": result.data.id,
            },
            {
              "property": "fontSize",
              "value": signatureInfo.fontSize[0]?.toString(),
              "type": "generalFontSize",
              "signature": result.data.id,
            },
            // DIV COLOR,
            {
              "property": "color",
              "value": signatureOption.bgColor,
              "type": "divColor",
              "signature": result.data.id
            },
            // Greetings
            {
              "property": "enabled",
              "value": signatureOption.salutation.enabled?.toString() || "false",
              "type": "greetings",
              "signature": result.data.id
            },
            {
              "property": "padding",
              "value": signatureOption.salutation.padding?.toString() || "12",
              "type": "greetingsPadding",
              "signature": result.data.id
            },
            // Event
            {
              "property": "enabled",
              "value": signatureOption.event.enabled?.toString() || "false",
              "type": "event",
              "signature": result.data.id
            },
            {
              "property": "padding",
              "value": signatureOption.event.padding?.toString() || "12",
              "type": "eventPadding",
              "signature": result.data.id
            },
            // Disclaimer
            {
              "property": "enabled",
              "value": signatureOption.disclaimerEnabled?.toString() || "false",
              "type": "disclaimer",
              "signature": result.data.id
            },
            {
              "property": "padding",
              "value": signatureOption.disclaimerValue?.toString() || "12",
              "type": "disclaimerPadding",
              "signature": result.data.id
            }
          ]
          request.post('signature_styles/batch', styles).then((r) => {
            console.log(r.data)
          })
          // GERER ICI
          // request.post('signature_styles', { signature: result.data['@id'], signatureTemplate: res.data['@id'], })
          // console.log(localStorage.getItem('user').signature_template_id)
          // await axios.get(`${API}template/${JSON.parse(localStorage.getItem('user')).signature_template_id}?access_token=${localStorage.getItem("token")}`)
          //   .then().catch(async () => {
          //     const req = {
          //       signature_template_id: res.data.id,
          //     }

          //     await axios.patch(`${API}user/${localStorage.getItem('user_id')}?access_token=${localStorage.getItem('token')}`, req)
          //       .then((res) => console.log(res))
          //   })

          history.push('/signatures')
        }
      ).catch((err) => {
        console.log(err)
        notification({ content: <>Une erreur s'est produite. Veuillez réessayer</>, status: "invalid" })
      })
    })

  }

  useEffect(() => {
    // const request = {
    //   "tags": JSON.stringify(signatureOption.event),
    // }
    // const patchTemplate = async () => {
    //   await axios.patch(`${API}template/${templateId}?access_token=${localStorage.getItem("token")}`, request)
    //     .then((res) => {
    //       console.log("PATCHING", res)
    //     }).catch((err) => { console.log("PATCHING", err) })
    // }
    // if (templateId)
    //   patchTemplate()
  }, [templateId])

  useEffect(() => {
    showTemplates(false)
    // console.log(selectedTemplate)
  }, [selectedTemplate])

  const showTemplates = (isOpen) => {
    if (isOpen) {
      setTemplates(<TemplateSelection showFunction={showTemplates} setTemplate={setSelectedTemplate} icons={signatureOption.socials} />)
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
        setTemplates()
      }, 1000);
    }

  }

  useEffect(() => {
    console.log(signatureInfo, signatureOption, selectedTemplate)
    if (signatureInfo && signatureOption && selectedTemplate)
      setPreview(<Preview infos={signatureInfo} options={signatureOption} template={selectedTemplate.html} />)
  }, [signatureInfo, signatureOption, selectedTemplate])


  return (
    <div className={classes.container} ref={elem}>
      {modal === true ? modalContent : ""}
      <div>
        <h1>Créer une signature</h1>
        <div className={classes.row}>
          <div className={classes.options}>
            <div className={classes.tabsContainer}>
              <label className={classes.switchTabs}>
                <div className={classes.tabTitles}>
                  <span>Style</span>
                  <span>Options</span>
                </div>
                <input type="checkbox" onChange={() => setTab(!tab)} />
                <div className={classes.sliderTabs}></div>
              </label>
              <button onClick={() => handlePopulate()}>Réinitialiser</button>
            </div>
            <div className={classes.tabContent}>
              {tab ?
                <Infos content={signatureInfo} setContent={setSignatureInfo} templateRules={templateRules} />
                :
                <Options data={signatureOption} setData={setSignatureOption} />}
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
              <br />
              {selectedTemplate &&
                preview}
              <div className={classes.CTAsContainer}>
                <Button color="orange" onClick={() => setModal(true)} style={{ opacity: selectedTemplate ? 1 : 0, pointerEvents: selectedTemplate ? "" : "none" }}>Sauvegarder</Button>
                <Button color="brown" onClick={() => showTemplates(true)}>Choisir un {selectedTemplate ? "autre modèle" : "modèle de signature"} <BsArrowRight style={{ stroke: "black", strokeWidth: "1", marginLeft: ".5rem" }} className={`${selectedTemplate ? "" : classes.blinking} ${classes.arrow}`} /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {templates}
    </div>
  );
}

export default CreateSignatureComponent;
