import classes from "./createSignature.module.css";
import SignaturePreviewImg from "../../../../assets/img/signallypreview.svg";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Range } from "react-range";
import ImageUploader from "react-images-upload";
import { IoText } from "react-icons/io5";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { GiHamburgerMenu } from 'react-icons/gi'
import ReactDragListView from "react-drag-listview";

const signatureAPI = [
  {
    name: "Benjamin Morgaine",
    poste: "CEO",
    company: "Signally",
    address: "44 Boulevard Hausmann 75009 Paris",
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
  const [animation, setAnimation] = useState(classes["tab0"]);
  const [img, setImg] = useState([]);
  const data = [
    { id: "polite", title: "Formule de politesse" },
    { id: "eco", title: "Message eco-responsable" },
    { id: "video", title: "Vidéo conférence" },
  ];

  const [state, setState] = useState({ data: data });
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const data = [...state.data];
      const item = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
      setState({ data });
    },
    nodeSelector: "li",
    handleSelector: "a",
  };

  const onDrop = (picture) => {
    setImg(img.concat(picture));
  };

  const [option, setOption] = useState("");
  const [colorFirstName, setColorFirstName] = useState("#000000");
  const [fontFirstName, setFontFirstName] = useState("Trebuchet MS");
  const [firstName, setFirstName] = useState("");
  const [range, setRange] = useState([50]);
  console.log(animation);

  return (
    <div className={classes.container}>
      <form>
        <ul className={classes.signaturePreviewList}>
          {signatureAPI.map((signature, index) => {
            return (
              <li key={index}>
                <input
                  type="radio"
                  className={classes.signInput}
                  name="signature"
                  defaultChecked={index === 0 && true}
                />
                <div className={`${classes.previewContainer}`}>
                  <img src={SignaturePreviewImg} alt="Signature preview" />
                  <div className={classes.signText}>
                    <h3
                      style={{
                        color: colorFirstName,
                        fontFamily: fontFirstName,
                        fontSize:
                          range[0] === 0
                            ? ".8rem"
                            : range[0] === 50
                            ? "1rem"
                            : "1.2rem",
                      }}
                    >
                      {firstName ? firstName : signature.name}
                    </h3>
                    <p>{signature.poste}</p>
                    <h4>{signature.company}</h4>
                    <p>{signature.address}</p>
                    <p>
                      T{" "}
                      <span className={classes.orangeTxt}>
                        {signature.mobile}
                      </span>{" "}
                      / M{" "}
                      <span className={classes.orangeTxt}>{signature.fix}</span>
                    </p>
                    {signature.img1 ? <img src={signature.img1} /> : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </form>
      <ul className={classes.tabs}>
        <li onClick={() => setAnimation(`${classes["tab0"]}`)}>
          <div className={`${classes.selectedTab} ${animation}`}></div>
          <input type="radio" name="tabs" />
          <div className={classes.tabContainer}>Infos</div>
        </li>
        <li onClick={() => setAnimation(`${classes["tab1"]}`)}>
          <input type="radio" name="tabs" />
          <div className={classes.tabContainer}>Style</div>
        </li>
        <li onClick={() => setAnimation(`${classes["tab2"]}`)}>
          <input type="radio" name="tabs" />
          <div className={classes.tabContainer}>Image</div>
        </li>
        <li onClick={() => setAnimation(`${classes["tab3"]}`)}>
          <input type="radio" name="tabs" />
          <div className={classes.tabContainer}>Options</div>
        </li>
      </ul>
      <div className={classes.tabContent}>
        {animation === classes["tab0"] ? (
          <>
            <div className={classes.inputsContainer}>
              <div className={classes.inputContainer}>
                <label>Informations personnelles</label>
                <div className={classes.inputColorSize}>
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onClick={() => setOption("")}
                  />
                  <div className={classes.inputOptions}>
                    <IoText
                      size="1.5rem"
                      onClick={() => setOption(option === "text" ? "" : "text")}
                    />
                    <div
                      className={classes.colorPreview}
                      style={{ background: colorFirstName }}
                      onClick={() =>
                        setOption(option === "color" ? "" : "color")
                      }
                    ></div>
                  </div>
                </div>
                <div>
                  {option === "color" ? (
                    <>
                      <HexColorInput
                        className={classes.input}
                        color={colorFirstName}
                        onChange={setColorFirstName}
                      />
                      <HexColorPicker
                        className={classes.colorPick}
                        color={colorFirstName}
                        onChange={setColorFirstName}
                      />{" "}
                    </>
                  ) : (
                    option === "text" && (
                      <>
                        <select
                          id="fontFamily"
                          className={classes.select}
                          value={fontFirstName}
                          onChange={(e) => setFontFirstName(e.target.value)}
                        >
                          <option
                            value={"Arial"}
                            style={{ fontFamily: "Arial" }}
                          >
                            Arial
                          </option>
                          <option
                            value={"Arial Black"}
                            style={{ fontFamily: "Arial Black" }}
                          >
                            Arial Black
                          </option>
                          <option
                            value={"Comic Sans MS"}
                            style={{ fontFamily: "Comic Sans MS" }}
                          >
                            Comic Sans MS
                          </option>
                          <option
                            value={"Courier New"}
                            style={{ fontFamily: "Courier New" }}
                          >
                            Courier New
                          </option>
                          <option
                            value={"Georgia"}
                            style={{ fontFamily: "Georgia" }}
                          >
                            Georgia
                          </option>
                          <option
                            value={"Impact"}
                            style={{ fontFamily: "Impact" }}
                          >
                            Impact
                          </option>
                          <option
                            value={"Lucida Console"}
                            style={{ fontFamily: "Lucida Console" }}
                          >
                            Lucida Console
                          </option>
                          <option
                            value={"Lucida sans Unicode"}
                            style={{ fontFamily: "Lucida sans Unicode" }}
                          >
                            Lucida sans Unicode
                          </option>
                          <option
                            value={"Palatino Linotype"}
                            style={{ fontFamily: "Palatino Linotype" }}
                          >
                            Palatino Linotype
                          </option>
                          <option
                            value={"Tahoma"}
                            style={{ fontFamily: "Tahoma" }}
                          >
                            Tahoma
                          </option>
                          <option
                            value={"Times New Roman"}
                            style={{ fontFamily: "Times New Roman" }}
                          >
                            Times New Roman
                          </option>
                          <option
                            value={"Trebuchet MS"}
                            style={{ fontFamily: "Trebuchet MS" }}
                          >
                            Trebuchet MS
                          </option>
                          <option
                            value={"Verdana"}
                            style={{ fontFamily: "Verdana" }}
                          >
                            Verdana
                          </option>
                        </select>
                        <span className={`${classes.span} ${classes.or}`}>
                          {range[0] === 0
                            ? "Petite"
                            : range[0] === 50
                            ? "Normale"
                            : "Grande"}
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
                                width: "100%",
                                backgroundColor: "#FFF",
                                margin: "1rem 0",
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
                              }}
                            />
                          )}
                        />
                      </>
                    )
                  )}
                </div>
              </div>
              <div className={classes.inputContainer}>
                <input type="text" placeholder="Nom" />
              </div>
              <div className={classes.inputContainer}>
                <input type="text" placeholder="Poste / Fonction" />
              </div>
              <div className={classes.inputContainer}>
                <input type="mail" placeholder="Email" />
              </div>
              <div className={classes.inputContainer}>
                <input type="tel" placeholder="Téléphone mobile" />
              </div>
              <div className={classes.inputContainer}>
                <input type="tel" placeholder="Téléphone fixe" />
              </div>
            </div>
          </>
        ) : animation === classes["tab1"] ? (
          <>
            <span className={classes.span}>Réseaux sociaux</span>
            <div className={classes.iconsContainer}>
              <label htmlFor="socials">Icônes</label>
              <label className={classes.switch}>
                <input type="checkbox" id="socials" />
                <span className={`${classes.slider} ${classes.round}`}></span>
              </label>
            </div>
            <ul className={classes.iconsList}>
              <li>
                <FaFacebookF />
              </li>
              <li>
                <FaTwitter />
              </li>
              <li>
                <FaLinkedinIn />
              </li>
              <li>
                <FaInstagram />
              </li>
            </ul>
          </>
        ) : animation === classes["tab2"] ? (
          <>
            <div className={classes.imgUploader}>
              <ImageUploader
                withIcon={true}
                withPreview={true}
                buttonText="Choose images"
                onChange={(e) => onDrop(e)}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />
            </div>
          </>
        ) : animation === classes["tab3"] ? (
          <>
            <span className={classes.span}>Options</span>
            <div className={classes.dragContainer}>
            <ReactDragListView {...dragProps} lineClassName={classes.lineDrag}>
              <ul className={classes.optionsContainer}>
                {state.data.map((item, index) => (
                  <li key={index}>
                    <a href="#"><GiHamburgerMenu /></a>
                    <div className={classes.iconsContainer}>
                      <label htmlFor={item.id}>{item.title}</label>
                      <label className={classes.switch}>
                        <input type="checkbox" id={item.id} />
                        <span
                          className={`${classes.slider} ${classes.round}`}
                        ></span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </ReactDragListView>
            </div>
          </>
        ) : null}
        <button className={classes.btn}>Valider ma signature</button>
      </div>
    </div>
  );
}

export default CreateSignatureComponent;
