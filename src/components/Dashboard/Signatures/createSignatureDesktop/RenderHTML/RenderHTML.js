import axios from "axios"
import parse from "html-react-parser"
import { useEffect, useState } from "react"
import { API } from "../../../../../config"

export default function RenderHTML(props) {
  const [organisation, setOrganisation] = useState()
  const [companyLogo, setCompanyLogo] = useState()
  useEffect(async () => {
    await axios.get(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}?access_token=${localStorage.getItem("token")}`).then((res) => {
      setOrganisation(res.data)
      setCompanyLogo(res.data.logo?.path)
    })
  }, [])
  console.log(props)
  useEffect(() => {
    if (props.data.companyLogo)
      if (typeof props.data.companyLogo !== "string")
        setCompanyLogo(URL.createObjectURL(props.data.companyLogo))
      else
        setCompanyLogo(props.data.companyLogo)
  }, [props.data])
  if (props.data?.firstName && props.template) {
    const mapObj = {
      PLACEHOLDER_BANNER: props.data.banner || "https://images.signally.io/ec9128a1f3ad0413005f24e55eeef251a098e7e54e6",
      PLACEHOLDER_FIRST_NAME: props.data.firstName,
      PLACEHOLDER_FIRST_NAME_STYLE: props.data.firstNameStyle || "PLACEHOLDER_FIRST_NAME_STYLE",
      PLACEHOLDER_LAST_NAME: props.data.lastName,
      PLACEHOLDER_LAST_NAME_STYLE: props.data.lastNameStyle || "PLACEHOLDER_LAST_NAME_STYLE",
      PLACEHOLDER_POSTE: props.data.poste,
      PLACEHOLDER_POSTE_STYLE: props.data.posteStyle || "PLACEHOLDER_POSTE_STYLE",
      PLACEHOLDER_COMPANY: props.data.company || organisation?.name,
      PLACEHOLDER_COMPANY_STYLE: props.data.companyStyle || "PLACEHOLDER_COMPANY_STYLE",
      PLACEHOLDER_COMPANY_ICON: companyLogo || "PLACEHOLDER_COMPANY_ICON",
      PLACEHOLDER_FACEBOOK : props.data.facebook || "PLACEHOLDER_FACEBOOK",
      PLACEHOLDER_INSTAGRAM: props.data.instagram || "PLACEHOLDER_INSTAGRAM",
      PLACEHOLDER_TWITTER: props.data.twitter || "PLACEHOLDER_TWITTER",
      PLACEHOLDER_LINKEDIN: props.data.linkedin || "PLACEHOLDER_LINKEDIN",
      PLACEHOLDER_SOCIALS_STYLE: props.data.socialsStyle || "PLACEHOLDER_SOCIALS_STYLE",
      PLACEHOLDER_ADDRESS: props.data.address || organisation?.address,
      PLACEHOLDER_ADDRESS_STYLE: props.data.addressStyle || "PLACEHOLDER_ADDRESS_STYLE",
      PLACEHOLDER_MOBILE: props.data.mobile,
      PLACEHOLDER_MOBILE_STYLE: props.data.mobileStyle || "PLACEHOLDER_MOBILE_STYLE",
      PLACEHOLDER_PHONE: props.data.phone || organisation?.phone_number,
      PLACEHOLDER_PHONE_STYLE: props.data.phoneStyle || "PLACEHOLDER_PHONE_STYLE",
      PLACEHOLDER_EVENT_BANNER: props.data.eventBanner || "PLACEHOLDER_EVENT_BANNER"
    }
    return parse(
      props.template.replace(
        /\b(?:PLACEHOLDER_BANNER|PLACEHOLDER_FIRST_NAME|PLACEHOLDER_COMPANY_ICON|PLACEHOLDER_FIRST_NAME_STYLE|PLACEHOLDER_LAST_NAME|PLACEHOLDER_LAST_NAME_STYLE|PLACEHOLDER_POSTE|PLACEHOLDER_POSTE_STYLE|PLACEHOLDER_COMPANY|PLACEHOLDER_COMPANY_STYLE|PLACEHOLDER_ADDRESS|PLACEHOLDER_ADDRESS_STYLE|PLACEHOLDER_MOBILE|PLACEHOLDER_MOBILE_STYLE|PLACEHOLDER_PHONE|PLACEHOLDER_PHONE_STYLE|PLACEHOLDER_FACEBOOK|PLACEHOLDER_INSTAGRAM|PLACEHOLDER_TWITTER|PLACEHOLDER_LINKEDIN|PLACEHOLDER_SOCIALS_STYLE|PLACEHOLDER_EVENT_BANNER)\b/gi,
        (matched) => mapObj[matched]
      )
    )
  }
  else return <div></div>
}
