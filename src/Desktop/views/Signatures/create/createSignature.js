import classes from "./createSignature.module.css";
import { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import { API } from "config";
import Options from "./Options/options";
import Infos from "./Infos/infos";
import TemplateSelection from "./TemplateSelect/templateSelect";
import Preview from "./Preview/customizablePreview";
import { UseUserInfos } from "Utils/useUserInfos/useUserInfos";
import { UseOrganizationInfos } from "Utils/useOrganizationInfos/useOrganizationInfos";
import { BsArrowRight } from "react-icons/bs";
import Button from "Utils/Button/btn";
import { renderToString } from "react-dom/server";
import axios from "axios";
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
    console.log(signatureOption.event)
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
    console.log(signatureOption.event)
  }

  useEffect(() => {
    const getUser = async () => {
      const user = await UseUserInfos(localStorage.getItem("user_id"))
      const company = await UseOrganizationInfos(localStorage.getItem("organisation_id"))

      setUser(user)
      setCompany(company)
      console.log(company)
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
    console.log(signatureOption.event.selected)
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
              <Button width="30%" color="orange">Annuler</Button>
              <Button width="40%" color="orangeFill" onClick={() => handleSave()}>Valider</Button>
            </div>
          </div>
        </div>
      </div>
      </span>)
    }
    setModalContent(handleModal(modal))
  }, [modal, signatureName])

  const handleSave = async () => {
    const toSave = {
      ...signatureInfo,
      logo: { ...signatureInfo.logo, path: "PLACEHOLDER_COMPANY_ICON" },
      firstName: { ...signatureInfo.firstName, value: "PLACEHOLDER_FIRST_NAME" },
      lastName: { ...signatureInfo.lastName, value: "PLACEHOLDER_LAST_NAME" },
      jobName: { ...signatureInfo.jobName, value: "PLACEHOLDER_POSITION" },
      company: { ...signatureInfo.company, value: "PLACEHOLDER_COMPANY" },
      addressStreet: { ...signatureInfo.addressStreet, value: "PLACEHOLDER_ADDRESS_STREET" },
      addressInfo: { ...signatureInfo.addressInfo, value: "PLACEHOLDER_ADDRESS_INFO" },
      addressZipcode: { ...signatureInfo.addressZipcode, value: "PLACEHOLDER_ADDRESS_ZIPCODE" },
      addressCity: { ...signatureInfo.addressCity, value: "PLACEHOLDER_ADDRESS_CITY" },
      addressCountry: { ...signatureInfo.country, value: "PLACEHOLDER_ADDRESS_COUNTRY" },
      mobile: { ...signatureInfo.mobile, value: "PLACEHOLDER_MOBILE" },
      phone: { ...signatureInfo.phone, value: "PLACEHOLDER_PHONE" },

      event: signatureOption.event.enabled === true ? "PLACEHOLDER_EVENT_BANNER" : "",
    }
    const test = <Preview infos={toSave} options={signatureOption} template={selectedTemplate} />

    const req = {
      name: signatureName,
      html: renderToString(test)
    }

    await request.post('signature_templates', req).then(async (res) => {
      console.log(JSON.parse(localStorage.getItem('user')).organisation)
        await request.post(`signatures`, {name: signatureName, html: renderToString(test), signatureTemplate: res.data['@id'], organisation: JSON.parse(localStorage.getItem('user')).organisation}).then(
          async (res) => {
            notification({ content: <>Votre signature <span style={{ color: "#FF7954" }}>{signatureName}</span> a été créée avec succès</>, status: "valid" })
            setTemplateIdToPatch(res.data.id)
    
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
        ).catch(() => {
          notification({ content: <>Une erreur s'est produite. Veuillez réessayer</>, status: "invalid" })
        })
    })

  }

  useEffect(() => {
    const request = {
      "tags": JSON.stringify(signatureOption.event),
    }
    const patchTemplate = async () => {
      await axios.patch(`${API}template/${templateId}?access_token=${localStorage.getItem("token")}`, request)
        .then((res) => {
          console.log("PATCHING", res)
        }).catch((err) => { console.log("PATCHING", err) })
    }
    if (templateId)
      patchTemplate()
  }, [templateId])

  useEffect(() => {
    showTemplates(false)
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
                <Preview infos={signatureInfo} options={signatureOption} template={selectedTemplate} />}
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
