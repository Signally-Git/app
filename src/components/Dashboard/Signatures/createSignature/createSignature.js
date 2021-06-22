import classes from "./createSignature.module.css";
import SignaturePreviewImg from "../../../../assets/img/signallypreview.svg";
import { useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import Input from "./Infos/Input";
import Options from "./Options/options";
import { Range } from "react-range";
import { Link } from "react-router-dom";
import { HexColorInput, HexColorPicker } from "react-colorful";
import ReactDOMServer from "react-dom/server";
import RenderHTML from "./RenderHTML/RenderHTML";

const signatureHTML = `<div style="word-wrap:break-word;line-break:after-white-space"><div>
</div><div><div>
</div><div style="box-sizing:border-box;color:rgb(33,37,41);font-size:16px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:left;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:rgb(255,255,255);text-decoration-style:initial;text-decoration-color:initial"><div>
</div><div id="m_-5237335378490344134x_header" style="box-sizing:border-box"><img width="200" height="38" src="https://ci5.googleusercontent.com/proxy/QXZSw6A6f150gI0aQsUqyqTWOH_zCAylL3mRUawJY2YQxfY67x4TW03waX8kCEnBeB86qrTQ59iP1QsFik8fLTm5R_8wOQ8n3UKn3Pt9otybNs5pcQ8ypO81SBVRoCM=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/mama-kiss.gif" style="box-sizing:border-box;vertical-align:middle;border-style:none;width:200px;height:38px" class="CToWUd"><br style="box-sizing:border-box">
<br style="box-sizing:border-box">
</div>
<table style="box-sizing:border-box;border-collapse:collapse;margin-bottom:7px;line-height:1">
<tbody style="box-sizing:border-box">
<tr style="box-sizing:border-box">
<td valign="top" style="box-sizing:border-box;vertical-align:top"><img id="m_-5237335378490344134x_tCity" alt="" src="https://ci4.googleusercontent.com/proxy/CtWYtaitHT4sqaIOT7ygmVfaKKIFTde4gqXnkO-V5BfossoaIvZoaDCCaIfWwjhBXW7qwAN_qZe0EK3KEOtMdPzF1aPlVa_kSv5z8zXHZay-3LsCnMQhySrmRX53xNNto5S5vQWHn9rkL_E=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/mamashelter-black-egg.png" width="107" height="140" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></td>
<td valign="top" style="box-sizing:border-box;vertical-align:top;padding-left:34px">
<table border="0" cellpadding="0" style="box-sizing:border-box;border-collapse:collapse">
<tbody style="box-sizing:border-box">
<tr style="box-sizing:border-box">
<td style="box-sizing:border-box;font-family:Helvetica,Arial,sans-serif;line-height:15px;padding-top:5px;padding-bottom:9px">
<span style="box-sizing:border-box;font-size:14px;font-weight:bold"><b id="m_-5237335378490344134x_tName" style="box-sizing:border-box;font-weight:bolder">PLACEHOLDER_FIRST_NAME PLACEHOLDER_LAST_NAME</b></span><br style="box-sizing:border-box">
<span id="m_-5237335378490344134x_job-and-adress" style="box-sizing:border-box;font-size:14px"><span id="m_-5237335378490344134x_tJob" style="box-sizing:border-box">PLACEHOLDER_POSTE</span></span></td>
</tr>
<tr style="box-sizing:border-box">
<td id="m_-5237335378490344134x_tContact" style="box-sizing:border-box;font-family:Helvetica,Arial,sans-serif;line-height:16px;padding-bottom:0px">
<span style="box-sizing:border-box;font-size:14px;font-weight:bold"><b style="box-sizing:border-box;font-weight:bolder">PLACEHOLDER_COMPANY<span id="m_-5237335378490344134x_tCityName" style="box-sizing:border-box"></span></b></span><br style="box-sizing:border-box">
<span id="m_-5237335378490344134x_tAddress" style="box-sizing:border-box;font-size:14px">PLACEHOLDER_ADDRESS<br style="box-sizing:border-box">
</span><span id="m_-5237335378490344134x_tPhoneLabel" style="box-sizing:border-box;font-size:14px">T&nbsp;</span><span>&nbsp;</span><a id="m_-5237335378490344134x_tPhone" href="tel:06%2003%2004%2046%2046" style="box-sizing:border-box;text-decoration:none;background-color:transparent;font-family:Helvetica,Arial,sans-serif;font-size:14px" target="_blank">PLACEHOLDER_MOBILE</a><span>&nbsp;</span><span id="m_-5237335378490344134x_tPhonesSeparator" style="box-sizing:border-box;font-size:14px">/<span>&nbsp;</span></span><span id="m_-5237335378490344134x_tMobilePhoneLabel" style="box-sizing:border-box;font-size:14px">M&nbsp;</span><span>&nbsp;</span><a id="m_-5237335378490344134x_tMobilePhone" href="tel:01%2075%2077%2058%2052" style="box-sizing:border-box;text-decoration:none;background-color:transparent;font-family:Helvetica,Arial,sans-serif;font-size:14px" target="_blank">PLACEHOLDER_PHONE</a></td>
</tr>
<tr style="box-sizing:border-box">
<td style="box-sizing:border-box;padding-top:2px">
<table cellpadding="5" style="box-sizing:border-box;border-collapse:collapse">
<tbody style="box-sizing:border-box">
<tr style="box-sizing:border-box">
<td style="box-sizing:border-box;padding-left:0px"><a id="m_-5237335378490344134x_tFacebook" href="https://www.facebook.com/MamaShelterOfficial" style="box-sizing:border-box;color:rgb(0,123,255);text-decoration:none;background-color:transparent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/MamaShelterOfficial&amp;source=gmail&amp;ust=1624203516206000&amp;usg=AFQjCNEE_1hDXh2Qog3W795Spky7EWy6ng"><img alt="" height="34" src="https://ci4.googleusercontent.com/proxy/oCPvWDgVhZGL8hPDnf0k4O2lUUAowAWzsXSZZQ6OUFBluPYHWBFrKOPvPZi5xk2JEv_9JbNgdlubvlJI-zBMObQ8MnMsiQ8BwPwRc3ExIih0BImLtxU7jem4n1QlrBvKhhCbNg=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/facebook-black.png" width="34" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
<td style="box-sizing:border-box"><a id="m_-5237335378490344134x_tTwitter" href="https://twitter.com/mama_shelter/" style="box-sizing:border-box;color:rgb(0,123,255);text-decoration:none;background-color:transparent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/mama_shelter/&amp;source=gmail&amp;ust=1624203516206000&amp;usg=AFQjCNExcT5lQw7J-tivQ8MZIGAjCYGzFQ"><img alt="" height="34" src="https://ci5.googleusercontent.com/proxy/W7alO37vsuKzXMicZiXxkJEn08D0DgSrT14Di9GnMlRtBkjQk9dGbINvFT2nCGQI5DE7huAHTM2ACBBQx-hI2zeA39mSxwVDL_A9I-uusGo72UQkfOmZKGb38jyrxKbqC5rH=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/twitter-black.png" width="34" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
<td style="box-sizing:border-box"><a id="m_-5237335378490344134x_tInstagram" href="https://www.instagram.com/mamashelter" style="box-sizing:border-box;color:rgb(0,123,255);text-decoration:none;background-color:transparent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/mamashelter&amp;source=gmail&amp;ust=1624203516206000&amp;usg=AFQjCNFOMohNOls4erQPEAwCi12OYq8vXw"><img alt="" height="34" src="https://ci5.googleusercontent.com/proxy/-U-bQCqroemAzS99CLlBDcnmZRqCCOeJh_MPEZSrJCsZgHZaXNTagoKO3J8NNx4t60COBKLoguivuLyDe4zI2ttQNNV6eb_3O2KZbU_gh4N64Us2TzATXeuJ8w94WpdfWd6CEzE=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/instagram-black.png" width="34" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
<td style="box-sizing:border-box"><a id="m_-5237335378490344134x_tLinkedin" href="https://www.linkedin.com/company/mama-shelter" style="box-sizing:border-box;color:rgb(0,123,255);text-decoration:none;background-color:transparent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/mama-shelter&amp;source=gmail&amp;ust=1624203516206000&amp;usg=AFQjCNE_SKuzdqtgpSMpSS7sq-MqYgTabQ"><img alt="" height="34" src="https://ci3.googleusercontent.com/proxy/BT-N6dupxE906oucUGf1sq0CU8JzBgn5KQZg-wNUkescXVYCZXevQWy3G7Mi7AGd0FOtNDpJz-owUBych0ez8bB1BRmSIm4J0WNFznL6SugpGDAOvQRZFUnJ9DTM4eIbTbPVrA=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/linkedin-black.png" width="34" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
<td style="box-sizing:border-box"></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="box-sizing:border-box">
<td style="box-sizing:border-box"><span id="m_-5237335378490344134x_bottom-signature" style="box-sizing:border-box;font-family:helvetica,sans-serif,arial;color:rgb(109,110,113);font-size:11px;line-height:14px"></span></td>
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
<td style="box-sizing:border-box"><a id="m_-5237335378490344134x_tLinkBanner" href="https://mamalovesyou.com/collections/by-mama" style="box-sizing:border-box;color:rgb(0,123,255);text-decoration:none;background-color:transparent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://mamalovesyou.com/collections/by-mama&amp;source=gmail&amp;ust=1624203516206000&amp;usg=AFQjCNGladbfr2apf9IitpWAJwL4-crEhA"><img id="m_-5237335378490344134x_tBanner" src="https://ci3.googleusercontent.com/proxy/HSfXzDGxGnUIUvnTtn-jbv2A8ao__6psTBbrtCuJ2pPwZ4QMix3Zhrjn8GCJCJWEtHb93p7XuI-bg1mPiOqXIM3eqEQCqGAB3j1B_fMYguCK3flbwONvz4Fe3UxNMpx6CTlLzYBEZew=s0-d-e1-ft#https://s3-eu-west-1.amazonaws.com/static.mamashelter.com/sign/banner-eshop-masks.png" width="400" height="31" style="box-sizing:border-box;vertical-align:middle;border-style:none" class="CToWUd"></a></td>
</tr>
</tbody>
</table><div class="yj6qo"></div><div class="adL">
</div></div><div class="adL">
</div></div>`;
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
  const [displaySocials, setDisplaySocials] = useState(true);
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

  const [company, setCompany] = useState("MAMA SHELTER");
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
  // let test = ReactDOMServer.renderToStaticMarkup(<div style={{borderColor: "red"}}>test</div>);
  const [signature, setSignature] = useState(
    signatureAPI.map((signature, index) => {
      if (animation === classes["tab2"] && checked !== index) return;
      return (
        <li key={index} className={classes.signature}>
          {animation === classes["tab0"] && (
            <input
              onChange={(e) => e.target.checked && setChecked(index)}
              type="radio"
              className={classes.signInput}
              name="signature"
              defaultChecked={index === 0 && !checked && true}
            />
          )}
          <div className={`${classes.previewContainer}`}>
            {animation === classes["tab2"] && (
              <p className={classes.polite}>
                {politesseValue && politesse && politesseValue}
              </p>
            )}

            {banner.length > 0 && animation === classes["tab2"] ? (
              <img
                src={banner}
                className={classes.banner}
                style={{ marginRight: 100 - bannerRange + "%" }}
              />
            ) : (
              <div className={classes.placeholderImg}></div>
            )}
            <img
              className={classes.companyImg}
              src={img.length > 0 ? img : SignaturePreviewImg}
              alt="Signature preview"
            />
            <div className={classes.signText}>
              <h3>
                {firstName.length > 0 ? (
                  <>
                    <span
                      style={{
                        color: firstNameColor,
                        fontFamily: firstNameFont,
                        fontSize:
                          firstNameFontSize[0] === 0
                            ? ".8rem"
                            : firstNameFontSize[0] === 50
                            ? "1rem"
                            : "1.2rem",
                      }}
                    >
                      {" "}
                      {firstName}
                    </span>{" "}
                    <span
                      style={{
                        color: lastNameColor,
                        fontFamily: lastNameFont,
                        fontSize:
                          lastNameFontSize[0] === 0
                            ? ".8rem"
                            : lastNameFontSize[0] === 50
                            ? "1rem"
                            : "1.2rem",
                      }}
                    >
                      {lastName}
                    </span>
                  </>
                ) : (
                  signature.name
                )}
              </h3>
              <p
                style={{
                  color: posteColor,
                  fontFamily: posteFont,
                  fontSize:
                    posteFontSize[0] === 0
                      ? ".8rem"
                      : posteFontSize[0] === 50
                      ? "1rem"
                      : "1.2rem",
                }}
              >
                {poste.length > 0 ? `${poste}` : signature.poste}
              </p>

              <h4
                style={{
                  color: companyColor,
                  fontFamily: companyFont,
                  fontSize:
                    companyFontSize[0] === 0
                      ? ".8rem"
                      : companyFontSize[0] === 50
                      ? "1rem"
                      : "1.2rem",
                }}
              >
                {signature.company}
              </h4>

              <p
                style={{
                  color: addressColor,
                  fontFamily: addressFont,
                  fontSize:
                    addressFontSize[0] === 0
                      ? ".8rem"
                      : addressFontSize[0] === 50
                      ? "1rem"
                      : "1.2rem",
                }}
              >
                {address.length > 0 ? `${address}` : signature.address}
              </p>

              <p
                style={{
                  color: companyColor,
                  fontWeight: "bold",
                  fontSize:
                    mobileFontSize[0] === 0
                      ? ".8rem"
                      : mobileFontSize[0] === 50
                      ? "1rem"
                      : "1.2rem",
                }}
              >
                T{" "}
                <span
                  className={classes.orangeTxt}
                  style={{
                    color: mobileColor,
                    fontWeight: "normal",
                    fontFamily: mobileFont,
                    fontSize:
                      mobileFontSize[0] === 0
                        ? ".8rem"
                        : mobileFontSize[0] === 50
                        ? "1rem"
                        : "1.2rem",
                  }}
                >
                  {mobile.length > 0 ? `${mobile}` : signature.mobile}
                </span>{" "}
                <span
                  style={{
                    color: companyColor,
                    fontSize:
                      phoneFontSize[0] === 0
                        ? ".8rem"
                        : phoneFontSize[0] === 50
                        ? "1rem"
                        : "1.2rem",
                  }}
                >
                  {" M "}
                </span>
                <span
                  className={classes.orangeTxt}
                  style={{
                    color: phoneColor,
                    fontFamily: phoneFont,
                    fontWeight: "normal",
                    fontSize:
                      phoneFontSize[0] === 0
                        ? ".8rem"
                        : phoneFontSize[0] === 50
                        ? "1rem"
                        : "1.2rem",
                  }}
                >
                  {phone.length > 0 ? `${phone}` : signature.fix}
                </span>
              </p>
              {signature.img1 ? <img src={signature.img1} /> : null}
              {displaySocials && (
                <ul className={classes.socials}>
                  <li>
                    <FaFacebookF
                      color={socialColor}
                      style={{ background: socialBgColor }}
                    />
                  </li>
                  <li>
                    <FaTwitter
                      color={socialColor}
                      style={{ background: socialBgColor }}
                    />
                  </li>
                  <li>
                    <FaInstagram
                      color={socialColor}
                      style={{ background: socialBgColor }}
                    />
                  </li>
                  <li>
                    <FaLinkedinIn
                      color={socialColor}
                      style={{ background: socialBgColor }}
                    />
                  </li>
                </ul>
              )}
              <p>
                {animation === classes["tab2"] &&
                  (optionOrder[0]?.id === "eco"
                    ? ecoRes.length > 0 && ecoValue
                    : disclaimer.length > 0 && disclaimerValue)}
              </p>
              <p>
                {animation === classes["tab2"] &&
                  (optionOrder[1]?.id === "eco"
                    ? ecoRes.length > 0 && ecoValue
                    : disclaimer.length > 0 && disclaimerValue)}
              </p>
            </div>
            {footerBanner.length > 0 && animation === classes["tab2"] ? (
              <img
                src={footerBanner}
                className={classes.banner}
                style={{ width: footerRange + "%" }}
              />
            ) : (
              <div className={classes.placeholderBanner}></div>
            )}
          </div>
        </li>
      );
    })
  );
  console.log(ReactDOMServer.renderToStaticMarkup(signature[0]));

  return (
    <div className={classes.container}>
      <div
        className={`${classes.topContainer} ${
          animation === classes["tab2"] && classes.bigPreview
        }`}
      >
        <form>
          <ul className={classes.signaturePreviewList}>{signature}</ul>
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
            <RenderHTML
              template={signatureHTML}
              data={{
                firstName: firstName,
                lastName: lastName,
                poste: poste,
                company: company,
                address: address,
                mobile: mobile,
                phone: phone,
              }}
            />
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
                )}
                <label className={classes.switch}>
                  <input
                    type="checkbox"
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
                          }}
                        />
                      </div>
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
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
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
              <div className={classes.inputContainer}>
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
            className={`${classes.btn} ${classes.outlineBtn}`}
            onClick={() => setAnimation(classes["tab1"])}
          >
            Valider ma signature
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSignatureComponent;
