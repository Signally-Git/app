import classes from "./createSignature.module.css";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import Input from "./Infos/Input";
import Options from "./Options/options";
import { Range } from "react-range";
import { Link, useHistory } from "react-router-dom";
import { HexColorInput, HexColorPicker } from "react-colorful";
import RenderHTML from "./RenderHTML/RenderHTML";
import axios from "axios";
import { API } from "../../../../config";
import { renderToString } from 'react-dom/server'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function CreateSignatureComponent() {
  const [signatureName, setSignatureName] = useState()
  const [uploadedMedia, setUploadedMedia] = useState()
  const [bannerImg, setBannerImg] = useState()
  const [bannerImgHosted, setBannerImgHosted] = useState()
  const [loading, setLoading] = useState(false)

  let history = useHistory()
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

  useEffect(() => {
    const req = {
      name: signatureName,
      signatureData: selectedSignature
    }
    if (selectedSignature.search(bannerImgHosted) > 0)
      axios.post(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/signature-templates?access_token=${localStorage.getItem("token")}`, req).then((res) => {
        history.push("/signatures")
        // console.log("UPLOADING SIGN", bannerImgHosted)
      })
  })
  const [displaySocials, setDisplaySocials] = useState(true);
  const [signatureAPI, setSignatureAPI] = useState([])

  const [socialColor, setSocialColor] = useState("#FFFFFF");
  const [socialBgColor, setSocialBgColor] = useState("#000000");
  const [socialOption, setSocialOption] = useState("");

  const [politesse, setPolitesse] = useState("");
  const [politesseValue, setPolitesseValue] = useState("");

  const [disclaimer, setDisclaimer] = useState(false);
  const [disclaimerValue, setDisclaimerValue] = useState("");

  const [ecoRes, setEcoRes] = useState(false);
  const [ecoValue, setEcoValue] = useState("");

  const [optionOrder, setOptionOrder] = useState(0);

  const [checked, setChecked] = useState(0);

  const [bannerRange, setBannerRange] = useState([60]);
  const [footerRange, setFooterRange] = useState([100]);

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

  const [animation, setAnimation] = useState(classes["tab0"]);
  const [img, setImg] = useState([]);
  const [imgName, setImgName] = useState("");
  const [banner, setBanner] = useState([]);
  const [bannerName, setBannerName] = useState("");
  const [footerBanner, setFooterBanner] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState("");
  const [event, setEvent] = useState()
  useEffect(() => {
    setSignatureAPI([`<div style="word-wrap:break-word;line-break:after-white-space"><div>
  </div><div><div>
  </div><div style="box-sizing:border-box;color:rgb(33,37,41);font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:left;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial"><div>
  </div><div id="m_-5237335378490344134x_header" style="box-sizing:border-box"><img height="50" src="PLACEHOLDER_BANNER" style="box-sizing:border-box;vertical-align:middle;border-style:none;height:50px" class="CToWUd"><br style="box-sizing:border-box">
  <br style="box-sizing:border-box">
  </div>
  <table style="box-sizing:border-box;border-collapse:collapse;margin-bottom:7px;line-height:1">
  <tbody style="box-sizing:border-box">
  <tr style="box-sizing:border-box">
  <td valign="top" style="box-sizing:border-box;vertical-align:top"><img id="m_-5237335378490344134x_tCity" alt="" src="PLACEHOLDER_COMPANY_ICON" width="107" height="140" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></td>
  <td valign="top" style="box-sizing:border-box;vertical-align:top;padding-left:34px">
  <table border="0" cellpadding="0" style="box-sizing:border-box;border-collapse:collapse">
  <tbody style="box-sizing:border-box">
  <tr style="box-sizing:border-box">
  <td style="box-sizing:border-box;font-family:Helvetica,Arial,sans-serif;line-height:15px;padding-top:5px;padding-bottom:9px">
  <span style="box-sizing:border-box;font-size:14px;font-weight:bold"><b id="m_-5237335378490344134x_tName" style="box-sizing:border-box;font-weight:bolder;PLACEHOLDER_FIRST_NAME_STYLE">PLACEHOLDER_FIRST_NAME <span style="PLACEHOLDER_LAST_NAME_STYLE">PLACEHOLDER_LAST_NAME</span></b></span><br style="box-sizing:border-box">
  <span id="m_-5237335378490344134x_job-and-adress" style="box-sizing:border-box;font-size:14px"><span id="m_-5237335378490344134x_tJob" style="box-sizing:border-box; PLACEHOLDER_POSTE_STYLE">PLACEHOLDER_POSTE</span></span></td>
  </tr>
  <tr style="box-sizing:border-box">
  <td id="m_-5237335378490344134x_tContact" style="box-sizing:border-box;font-family:Helvetica,Arial,sans-serif;line-height:16px;padding-bottom:0px">
  <span style="box-sizing:border-box;font-size:14px;font-weight:bold"><b style="box-sizing:border-box;font-weight:bolder;PLACEHOLDER_COMPANY_STYLE">PLACEHOLDER_COMPANY<span id="m_-5237335378490344134x_tCityName" style="box-sizing:border-box"></span></b></span><br style="box-sizing:border-box">
  <span id="m_-5237335378490344134x_tAddress" style="line-height: 24px; box-sizing:border-box;font-size:14px;PLACEHOLDER_ADDRESS_STYLE">PLACEHOLDER_ADDRESS<br style="box-sizing:border-box">
  </span><span id="m_-5237335378490344134x_tPhoneLabel" style="box-sizing:border-box;font-size:14px; font-weight: bolder; PLACEHOLDER_COMPANY_STYLE">T&nbsp;</span><span>&nbsp;</span><a id="m_-5237335378490344134x_tPhone" href="tel:PLACEHOLDER_PHONE" style="box-sizing:border-box;text-decoration:none;background-color:transparent;font-family:Helvetica,Arial,sans-serif;font-size:14px;PLACEHOLDER_PHONE_STYLE" target="_blank">PLACEHOLDER_PHONE</a><span>&nbsp;</span><span id="m_-5237335378490344134x_tPhonesSeparator" style="box-sizing:border-box;font-size:14px"><span>&nbsp;</span></span><span id="m_-5237335378490344134x_tMobilePhoneLabel" style="box-sizing:border-box;font-size:14px;font-weight: bolder; PLACEHOLDER_COMPANY_STYLE">M&nbsp;</span><span>&nbsp;</span><a id="m_-5237335378490344134x_tMobilePhone" href="tel:PLACEHOLDER_MOBILE" style="box-sizing:border-box;text-decoration:none;background-color:transparent;font-family:Helvetica,Arial,sans-serif;font-size:14px; PLACEHOLDER_MOBILE_STYLE" target="_blank">PLACEHOLDER_MOBILE</a></td>
  </tr>
  <tr style="box-sizing:border-box">
  <td style="box-sizing:border-box;padding-top:2px">
  <table cellpadding="5" style="box-sizing:border-box;border-collapse:collapse">
  <tbody style="box-sizing:border-box">
  <tr style="box-sizing:border-box">
    ${displaySocials ? `<td style="box-sizing:border-box;padding-left:0px">
      <a href="PLACEHOLDER_FACEBOOK" style="box-sizing:border-box;text-decoration:none;" target="_blank">
        <img src="https://images.signally.io/ec94186318ddf8e6381ccdd264545b2698836faaaa5" style="width: 30px" />
        </a></td>
        <td style="box-sizing:border-box;padding-left:0px">
      <a href="PLACEHOLDER_TWITTER" style="box-sizing:border-box;text-decoration:none; border-radius: 50%; " target="_blank">
      <img src="https://images.signally.io/ec9419cca0c8a72da5069e61f058af796074afc0489" style="width: 30px" />
        </a></td>
        <td style="box-sizing:border-box;padding-left:0px">
      <a href="PLACEHOLDER_INSTAGRAM" style="box-sizing:border-box;text-decoration:none; border-radius: 50%; " target="_blank">
      <img src="https://images.signally.io/ec9419b0c8cf84335388d8382c85409f3a5876ec316" style="width: 30px" />
        </a></td>
        <td style="box-sizing:border-box;padding-left:0px">
      <a href="PLACEHOLDER_LINKEDIN" style="box-sizing:border-box;text-decoration:none; border-radius: 50%; " target="_blank">
      <img src="https://images.signally.io/ec941990ba3992779614c69283ffe531fde316f8b0d" style="width: 30px" />
        </a></td>` : ""}
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  <tr style="box-sizing:border-box">
  <td style="box-sizing:border-box"><span style="box-sizing:border-box;font-family:helvetica,sans-serif,arial;color:rgb(109,110,113);font-size:11px;line-height:14px"></span></td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </div>
  <table style="box-sizing:border-box;border-collapse:collapse;color:rgb(33,37,41);font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:left;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;margin-top:20px">
  <tbody style="box-sizing:border-box">
  <tr style="box-sizing:border-box">
  <td style="box-sizing:border-box"><a href="https://mamalovesyou.com/collections/by-mama" style="box-sizing:border-box;text-decoration:none;background-color:transparent" target="_blank"><img src="PLACEHOLDER_EVENT_BANNER" width="400" height="31" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
  </tr>
  </tbody>
  </table><div class="yj6qo"></div><div class="adL">
  </div></div><div class="adL">
  </div></div>`, `<div style="word-wrap:break-word;line-break:after-white-space"><div>
  </div><div><div>
  </div><div style="box-sizing:border-box;color:rgb(33,37,41);font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:left;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial"><div>
  </div><div style="box-sizing:border-box"><br style="box-sizing:border-box">
  <br style="box-sizing:border-box">
  </div>
  <table style="box-sizing:border-box;border-collapse:collapse;margin-bottom:7px;line-height:1">
  <tbody style="box-sizing:border-box">
  <tr style="box-sizing:border-box">
  <td valign="top" style="box-sizing:border-box;vertical-align:top"><img alt="" src="https://ci4.googleusercontent.com/proxy/CtWYtaitHT4sqaIOT7ygmVfaKKIFTde4gqXnkO-V5BfossoaIvZoaDCCaIfWwjhBXW7qwAN_qZe0EK3KEOtMdPzF1aPlVa_kSv5z8zXHZay-3LsCnMQhySrmRX53xNNto5S5vQWHn9rkL_E=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/mamashelter-black-egg.png" width="107" height="140" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></td>
  <td valign="top" style="box-sizing:border-box;vertical-align:top;padding-left:34px">
  <table border="0" cellpadding="0" style="box-sizing:border-box;border-collapse:collapse">
  <tbody style="box-sizing:border-box">
  <tr style="box-sizing:border-box">
  <td style="box-sizing:border-box;font-family:Helvetica,Arial,sans-serif;line-height:15px;padding-top:5px;padding-bottom:9px">
  <span style="box-sizing:border-box;font-size:14px;font-weight:bold"><b style="box-sizing:border-box;font-weight:bolder">PLACEHOLDER_FIRST_NAME PLACEHOLDER_LAST_NAME</b></span><br style="box-sizing:border-box">
  <span style="box-sizing:border-box;font-size:14px"><span style="box-sizing:border-box">PLACEHOLDER_POSTE</span></span></td>
  </tr>
  <tr style="box-sizing:border-box">
  <td style="box-sizing:border-box;font-family:Helvetica,Arial,sans-serif;line-height:16px;padding-bottom:0px">
  <span style="box-sizing:border-box;font-size:14px;font-weight:bold"><b style="box-sizing:border-box;font-weight:bolder">PLACEHOLDER_COMPANY<span style="box-sizing:border-box"></span></b></span><br style="box-sizing:border-box">
  <span style="box-sizing:border-box;font-size:14px">PLACEHOLDER_ADDRESS<br style="box-sizing:border-box">
  </span><span style="box-sizing:border-box;font-size:14px">T&nbsp;</span><span>&nbsp;</span><a href="tel:06%2003%2004%2046%2046" style="box-sizing:border-box;text-decoration:none;background-color:transparent;font-family:Helvetica,Arial,sans-serif;font-size:14px" target="_blank">PLACEHOLDER_MOBILE</a><span>&nbsp;</span><span id="m_-5237335378490344134x_tPhonesSeparator" style="box-sizing:border-box;font-size:14px">/<span>&nbsp;</span></span><span id="m_-5237335378490344134x_tMobilePhoneLabel" style="box-sizing:border-box;font-size:14px">M&nbsp;</span><span>&nbsp;</span><a id="m_-5237335378490344134x_tMobilePhone" href="tel:01%2075%2077%2058%2052" style="box-sizing:border-box;text-decoration:none;background-color:transparent;font-family:Helvetica,Arial,sans-serif;font-size:14px" target="_blank">PLACEHOLDER_PHONE</a></td>
  </tr>
  <tr style="box-sizing:border-box">
  <td style="box-sizing:border-box;padding-top:2px">
  <table cellpadding="5" style="box-sizing:border-box;border-collapse:collapse">
  <tbody style="box-sizing:border-box">
  <tr style="box-sizing:border-box">
  <td style="box-sizing:border-box;padding-left:0px"><a href="https://www.facebook.com/MamaShelterOfficial" style="box-sizing:border-box;text-decoration:none;background-color:transparent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/MamaShelterOfficial&amp;source=gmail&amp;ust=1624203516206000&amp;usg=AFQjCNEE_1hDXh2Qog3W795Spky7EWy6ng"><img alt="" height="34" src="https://ci4.googleusercontent.com/proxy/oCPvWDgVhZGL8hPDnf0k4O2lUUAowAWzsXSZZQ6OUFBluPYHWBFrKOPvPZi5xk2JEv_9JbNgdlubvlJI-zBMObQ8MnMsiQ8BwPwRc3ExIih0BImLtxU7jem4n1QlrBvKhhCbNg=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/facebook-black.png" width="34" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
  <td style="box-sizing:border-box"><a href="https://twitter.com/mama_shelter/" style="box-sizing:border-box;text-decoration:none;background-color:transparent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/mama_shelter/&amp;source=gmail&amp;ust=1624203516206000&amp;usg=AFQjCNExcT5lQw7J-tivQ8MZIGAjCYGzFQ"><img alt="" height="34" src="https://ci5.googleusercontent.com/proxy/W7alO37vsuKzXMicZiXxkJEn08D0DgSrT14Di9GnMlRtBkjQk9dGbINvFT2nCGQI5DE7huAHTM2ACBBQx-hI2zeA39mSxwVDL_A9I-uusGo72UQkfOmZKGb38jyrxKbqC5rH=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/twitter-black.png" width="34" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
  <td style="box-sizing:border-box"><a href="https://www.instagram.com/mamashelter" style="box-sizing:border-box;text-decoration:none;background-color:transparent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/mamashelter&amp;source=gmail&amp;ust=1624203516206000&amp;usg=AFQjCNFOMohNOls4erQPEAwCi12OYq8vXw"><img alt="" height="34" src="https://ci5.googleusercontent.com/proxy/-U-bQCqroemAzS99CLlBDcnmZRqCCOeJh_MPEZSrJCsZgHZaXNTagoKO3J8NNx4t60COBKLoguivuLyDe4zI2ttQNNV6eb_3O2KZbU_gh4N64Us2TzATXeuJ8w94WpdfWd6CEzE=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/instagram-black.png" width="34" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
  <td style="box-sizing:border-box"><a href="https://www.linkedin.com/company/mama-shelter" style="box-sizing:border-box;text-decoration:none;background-color:transparent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/mama-shelter&amp;source=gmail&amp;ust=1624203516206000&amp;usg=AFQjCNE_SKuzdqtgpSMpSS7sq-MqYgTabQ"><img alt="" height="34" src="https://ci3.googleusercontent.com/proxy/BT-N6dupxE906oucUGf1sq0CU8JzBgn5KQZg-wNUkescXVYCZXevQWy3G7Mi7AGd0FOtNDpJz-owUBych0ez8bB1BRmSIm4J0WNFznL6SugpGDAOvQRZFUnJ9DTM4eIbTbPVrA=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/linkedin-black.png" width="34" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
  <td style="box-sizing:border-box"></td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  <tr style="box-sizing:border-box">
  <td style="box-sizing:border-box"><span style="box-sizing:border-box;font-family:helvetica,sans-serif,arial;color:rgb(109,110,113);font-size:11px;line-height:14px"></span></td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </div>
  <table style="box-sizing:border-box;border-collapse:collapse;color:rgb(33,37,41);font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:left;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial;margin-top:20px">
  <tbody style="box-sizing:border-box">
  <tr style="box-sizing:border-box">
  <td style="box-sizing:border-box"><a href="https://mamalovesyou.com/collections/by-mama" style="box-sizing:border-box;text-decoration:none;background-color:transparent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://mamalovesyou.com/collections/by-mama&amp;source=gmail&amp;ust=1624203516206000&amp;usg=AFQjCNGladbfr2apf9IitpWAJwL4-crEhA"><img id="m_-5237335378490344134x_tBanner" src="https://ci3.googleusercontent.com/proxy/HSfXzDGxGnUIUvnTtn-jbv2A8ao__6psTBbrtCuJ2pPwZ4QMix3Zhrjn8GCJCJWEtHb93p7XuI-bg1mPiOqXIM3eqEQCqGAB3j1B_fMYguCK3flbwONvz4Fe3UxNMpx6CTlLzYBEZew=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/banner-eshop-masks.png" width="400" height="31" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
  </tr>
  </tbody>
  </table><div class="yj6qo"></div><div class="adL">
  </div></div><div class="adL">
  </div></div>`,
      `<div style="font-family:Helvetica,Arial,sans-serif;">
  <table>
      <tr>
          <table style="margin-bottom: 12px; margin-top: 0; box-sizing: border-box; border-collapse: collapse;">
              <tbody>
                  <tr style="box-sizing: border-box;">
                      <td style="box-sizing: border-box;">
                          <img style="margin: 0 4px 0 0; padding: 0; width: 108px; height: 108px;" src='PLACEHOLDER_COMPANY_ICON'
                              alt='PLACEHOLDER_COMPANY' />
                      </td>
                      <td
                          style="background-color: #FCE750; border-radius: 4px; width: 264px; height: 108px; box-sizing: border-box; padding: 12px;">
                          <p
                              style="line-height: 0px; font-size:11px; font-weight:600; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;">
                              <span>PLACEHOLDER_FIRST_NAME</span>
                              <span>PLACEHOLDER_LAST_NAME</span>
                          </p>
                          <p
                              style="line-height: 0px; font-size:11px; font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;">
                              PLACEHOLDER_POSTE</p>
                          <p
                              style="line-height: 0px; margin: 0; margin-top: 7px; font-size:11px; font-weight:600; line-height:14px; padding: 0; letter-spacing:normal;">
                              PLACEHOLDER_COMPANY</p>
                          <p
                              style="line-height: 0px; font-size:11px; font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;">
                              PLACEHOLDER_ADDRESS</p>
                          <p style="line-height: 0px; margin: 0; padding: 0;">
                              <span
                                  style="font-size:11px; font-weight:600; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;">T</span>
                              <span
                                  style="font-size:11px; font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;">+33
                                  PLACEHOLDER_MOBILE</span>
                              <span
                                  style="font-size:11px; font-weight:600; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;">M</span>
                              <span
                                  style="font-size:11px; font-weight:200; line-height:14px; padding: 0; margin: 0; letter-spacing:normal;">+33
                                  PLACEHOLDER_PHONE</span>
                          </p>
                      </td>
                  </tr>
              </tbody>
          </table>
      </tr>
      <tr>
          <table style="margin-top: 0; box-sizing: border-box; border-collapse: collapse;">
              <tbody>
                  <tr style="box-sizing: border-box;">
                      <td style="box-sizing: border-box;">
                          <img style="border-radius: 4px; margin-bottom: 12px; width: 380px;" src='PLACEHOLDER_EVENT_BANNER'
                              alt='banner' />
                      </td>
                  </tr>
                  <tr style="box-sizing: border-box;">
                      <td style="background-color: #000; border-radius: 4px; padding: 12px; height: 38px; width: 380px; box-sizing: border-box;">
                      <div style="margin-top: 2px;">
                          <span style="color: #FFF; font-size: 13px; font-weight: 400;vertical-align:super">Follow us</span>
                          <a href="https://facebook.com/MamaShelterOfficial/"><img style="width: 22px; height: 22px;" src="https://images.signally.io/edc03474ffce5393c3ae4c9f41644ae308f47589a5f" alt="facebook" /></a>
                          <a href="https://www.instagram.com/mamashelter/"><img style="width: 22px; height: 22px;" src="https://images.signally.io/edbfaae920ace429a72d544d821c8b75da78dc4c9ed" alt="instagram" /></a>
                          <a href="https://www.linkedin.com/company/mama-shelter"><img style="width: 22px; height: 22px;" src="https://images.signally.io/edbfab0005df1154f814c95baf8879479b4cb8e5eb0" alt="linkedin" /></a>
                          <a href="https://www.pinterest.fr/mamashelter/"><img style="width: 22px; height: 22px;" src="https://images.signally.io/edbfab2a476d6472c6c67fd6046cdb1e9d4575cd714" alt="pinterest" /></a>
                          <a href="https://www.snapchat.com/"><img style="width: 22px; height: 22px;" src="https://images.signally.io/edbfabbfb42883d3386eccee0993a0fa471f88b5d43" alt="snapchat" /></a>
                          <a href="https://twitter.com/mama_shelter/"><img style="width: 22px; height: 22px;" src="https://images.signally.io/edbfab48f4d887780c7e44ed495e3eadfbe311fbd52" alt="twitter" /></a>
                          <a href="https://fr.mamashelter.com/"><img src="https://images.signally.io/edbfe35188fc8bd33897cb1517a91b0bb6f4d791bae" alt="mama shelter" style="margin-left: 65px; height:22px;" /></a>
                        </div>
                      </td>
                  </tr>
              </tbody>
          </table>
      </tr>
  </table>
</div>`])
  }, [displaySocials, socialColor, socialBgColor])
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
    await axios.get(`${API}user/${JSON.parse(localStorage.getItem("user")).id}?access_token=${localStorage.getItem("token")}`).then((res) => {
      setFirstName(res.data.first_name)
      setLastName(res.data.last_name)
      setPoste(res.data.position)
      setMobile(res.data.phone_number)
    })
  }, [])

  useEffect(() => {
    setSelectedSignature(renderToString(<RenderHTML template={signatureAPI[checked]} data={{
      banner: bannerImgHosted,
      firstName: "PLACEHOLDER_FIRST_NAME",
      firstNameStyle: `color:${firstNameColor};font-family:${firstNameFont};`,
      lastName: "PLACEHOLDER_LAST_NAME",
      lastNameStyle: `color:${lastNameColor};font-family:${lastNameFont};`,
      poste: "PLACEHOLDER_POSTE",
      posteStyle: `color:${posteColor};font-family:${posteFont};`,
      company: "PLACEHOLDER_COMPANY",
      companyStyle: `color:${companyColor};font-family:${companyFont};`,
      companyLogo: "PLACEHOLDER_COMPANY_ICON",
      address: "PLACEHOLDER_ADDRESS",
      addressStyle: `color:${addressColor};font-family:${addressFont};`,
      mobile: "PLACEHOLDER_MOBILE",
      mobileStyle: `color:${mobileColor};font-family:${mobileFont};`,
      phone: "PLACEHOLDER_PHONE",
      phoneStyle: `color:${phoneColor};font-family:${phoneFont};`,
      facebook: companyDetails.facebook,
      twitter: companyDetails.twitter,
      instagram: companyDetails.instagram,
      linkedin: companyDetails.linkedin,
      eventBanner: event
    }} />))
    setSignature(signatureAPI?.map((signature, index) => {
      if (animation === classes["tab2"] && checked !== index) return;
      return <div><input
        onChange={(e) => {
          e.target.checked && setChecked(index); setSelectedSignature(renderToString(<RenderHTML template={signature} data={{
            banner: bannerImgHosted,
            firstName: "PLACEHOLDER_FIRST_NAME",
            firstNameStyle: `color:${firstNameColor};font-family:${firstNameFont};`,
            lastName: "PLACEHOLDER_LAST_NAME",
            lastNameStyle: `color:${lastNameColor};font-family:${lastNameFont};`,
            poste: "PLACEHOLDER_POSTE",
            posteStyle: `color:${posteColor};font-family:${posteFont};`,
            company: "PLACEHOLDER_COMPANY",
            companyStyle: `color:${companyColor};font-family:${companyFont};`,
            companyLogo: "PLACEHOLDER_COMPANY_ICON",
            address: "PLACEHOLDER_ADDRESS",
            addressStyle: `color:${addressColor};font-family:${addressFont};`,
            mobile: "PLACEHOLDER_MOBILE",
            mobileStyle: `color:${mobileColor};font-family:${mobileFont};`,
            phone: "PLACEHOLDER_PHONE",
            phoneStyle: `color:${phoneColor};font-family:${phoneFont};`,
            facebook: companyDetails.facebook,
            twitter: companyDetails.twitter,
            instagram: companyDetails.instagram,
            linkedin: companyDetails.linkedin,
            eventBanner: event
          }} />));
        }}
        type="radio"
        className={classes.signInput}
        name="signature"
        defaultChecked={index === 0 && !checked && true}
      /><RenderHTML template={signature} data={{
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
      }} /></div>
    }))

  }, [signatureAPI, animation, banner, bannerImgHosted, checked, firstName, firstNameFont, firstNameColor, lastName, lastNameFont, lastNameColor, companyFont, companyColor, uploadedMedia, poste, posteFont, posteColor, address, addressFont, addressColor, mobile, mobileFont, mobileColor, phone, phoneFont, phoneColor, event])
  const [signature, setSignature] = useState(
    signatureAPI?.map((signature, index) => {
      if (animation === classes["tab2"] && checked !== index) return;
      return <div><input
        onChange={(e) => e.target.checked && setChecked(index)}
        type="radio"
        className={classes.signInput}
        name="signature"
        defaultChecked={index === 0 && !checked && true}
      /><RenderHTML template={signature} data={{
        banner: bannerImgHosted,
        firstName: firstName,
        firstNameStyle: `color:${firstNameColor};font-family:${firstNameFont};`,
        lastName: lastName,
        lastNameStyle: `color:${lastNameColor};font-family:${lastNameFont};`,
        poste: poste,
        posteStyle: `color:${posteColor};font-family:${posteFont};`,
        company: company,
        // companyLogo: uploadedMedia,
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
      }} /></div>
    })
  );

  return (
    <div className={classes.container}>
      <div
        className={`${classes.topContainer} ${animation === classes["tab2"] && classes.bigPreview
          }`}
      >
        <form>
          <div className={classes.signaturePreviewList}>{signature}</div>
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
            </div>
          </>
        ) : animation === classes["tab1"] ? (
          <>
            <br />
            <br />
            <br />
            <div className={classes.iconsContainer}>
              <input
                type="text"
                className={`${classes.input} ${classes.signatureName}`}
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                placeholder="Nom de la signature"
              />
            </div>
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
              {/* <div className={classes.iconsContainer}>
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
              </div> */}
              <br />
              <div className={classes.fileUpload}>
                <div className={classes.rangeUpload}>
                  {bannerName.length > 0 ? (
                    <>
                      <div className={classes.uploadedFile}>
                        <span>{bannerName}</span>{" "}
                        <IoMdClose
                          onClick={() => {
                            setBannerName("");
                            setBanner("");
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
                        Importer une image
                      </span>
                    </>
                  )}
                </div>
              </div>
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
                  </>
                ) : null}
              </div>
              {/* <div className={classes.inputContainer}>
                <label>Bannière</label>
              </div>
              <div className={classes.iconsContainer}>
                <label htmlFor="event">Activer évènement</label>
                <label className={classes.switch}>
                  <input
                    type="checkbox"
                    id="event"
                    onChange={(e) =>
                      e.target.checked && banner
                        ? setFooterBanner(banner)
                        : setFooterBanner("")
                    }
                  />
                  <span className={`${classes.slider} ${classes.round}`}></span>
                </label>
                {footerBanner.length > 0 && (
                  <>
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
                              borderRadius: "50px",
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
                              boxShadow: "1px 1px 3px #FF795488",
                            }}
                          />
                        )}
                      />
                    </div>
                  </>
                )}
              </div> */}
              {/* <div className={classes.inputContainer}>
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
              /> */}
            </div>
          </>
        ) : null}
        <div className={classes.CTAcontainer}>
          <Link to="/signatures">
            <button className={`${classes.btn} ${classes.outlineBtn}`}>
              Retour
            </button>
          </Link>
          <button
            className={`${classes.btn} ${animation !== classes["tab1"] && classes.outlineBtn} ${loading && classes.deactivated}`}
            onClick={() => animation === classes["tab1"] ? handleCreation() : setAnimation(classes["tab1"])}
          >
            Valider ma signature
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSignatureComponent;
