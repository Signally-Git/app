import { useEffect, useState } from "react";
import CreateEventImage from "../../../../assets/img/create-event.png";
import classes from "./createEvent.module.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
// import { Range } from "react-range";
import CrossIcon from "../../../../assets/icons/cross.svg";
import Event from "../../../../assets/icons/event.svg";
// import { HexColorInput, HexColorPicker } from "react-colorful";
import TimeInput from 'react-time-input';

function CreateEvent(props) {
  const [isNameFilled, setIsNameFilled] = useState("")
  // const [colorPicker, setColorPicker] = useState(false)
  // const [colorTextPicker, setColorTextPicker] = useState(false)
  // const [colorText, setColorText] = useState("#000000");
  // const [color, setColor] = useState("#000000");
  // const [isCollapsed, setIsCollapsed] = useState(false)
  // const [range, setRange] = useState([50])
  const [isClosed, setIsClosed] = useState(false)
  const [step, setStep] = useState(1)
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    if (isNameFilled.length > 0) {
       setStep(step + 1)
       console.log('yes')
    }
  }

  const handleTimer = (e) => {
    console.log(e)
  }

  useEffect(() => {
    props.handleHeader("")
  }, [])
  if (step === 1) {
    return (
      <div className={classes.smallContainer}>
        <div className={classes.subcontainer}>
          <h1>Créer un évènement</h1>
          <img src={CreateEventImage} alt="Stopwatch" />
          <p>
            Agrémentez votre signature d’une bannière évènementielle : Mettez en
            avant un webinar, une nouvelle offre ...
          </p>
        </div>
        <button className={`${classes.button} ${classes.enabledBtn} ${classes.fixed}`} onClick={() => setStep(2)}>
          Suivant
        </button>
      </div>
    );
  }
  else if (step === 2) {
    return (
      <div className={classes.smallContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={classes.subcontainerShort}>
            <h1>Nom de l'évènement</h1>

            <input
              onChange={(e) => setIsNameFilled(e.target.value)}
              className={classes.input}
              type="text"
              placeholder="Nom de l'évènement"
            />
          </div>
          <button className={`${classes.button} ${classes.fixed} ${isNameFilled.length > 0 ? classes.enabledBtn : ""}`}>
            Suivant
        </button>
        </form>
      </div>
    );
  }
  else if (step >= 3)
    props.handleHeader(isNameFilled)
  return (
    <div className={classes.container}>
      {isClosed &&
        <div className={classes.backgroundCalendar}></div>}
      <div className={classes.dateContainer}>
        <img src={Event} alt="starting-date" />
        <div className={classes.fullDate}>
          <input
            value={state[0].startDate?.toLocaleDateString('fr-FR')}
            type="text"
            placeholder="Date de début"
            onFocus={() => setIsClosed(true)}
          />
          <TimeInput
            placeholder="00:00"
            useRef="TimeInputWrapper"
            className={classes.hourInput}
            onTimeChange={(e) => handleTimer(e)}
          />
        </div>
        <div className={classes.vr}></div>
        <div className={classes.fullDate}>
          <input
            value={state[0].endDate?.toLocaleDateString('fr-FR')}
            type="text"
            placeholder="Date de fin"
            onFocus={() => setIsClosed(true)}
          />
          <TimeInput
            placeholder="00:00"
            useRef="TimeInputWrapper"
            className={classes.hourInput}
            onTimeChange={(e) => handleTimer(e)}
          />
        </div>
      </div>
      {isClosed && <>
        <div className={classes.calendarContainer}>
          <img src={CrossIcon} alt="close" onClick={() => setIsClosed(false)} />
          <DateRange
            editableDateinput
            startDatePlaceholder="Date de début"
            className={classes.calendar}
            s={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            locale={locales["fr"]}
            ranges={state}
            weekdayDisplayFormat={"EEEEE"}
            weekStartsOn={0}
            color={"#E27D67"}
            rangeColors={"#FDF8F7"}
            showSelectionPreview={false}
            showMonthAndYearPickers={false}
          />
        </div>
      </>}
      <span className={classes.span}>Image</span>
      <label htmlFor="url">Lien URL</label>
      <input
        className={classes.input}
        type="text"
        id="url"
        placeholder="https://exemple.fr/image"
      />
      <span className={`${classes.span} ${classes.or}`}>OU</span>
      <button className={classes.button}>Télécharger une image</button>
      <hr />
      <span className={classes.span}>Redirection de la bannière</span>
      <label htmlFor="bannerUrl">Lien URL</label>
      <input
        className={classes.input}
        id="bannerUrl"
        type="text"
        placeholder="https://mon_evenement.fr/"
      />
      {/* <span className={classes.collapsibleTitle} onClick={() => setIsCollapsed(!isCollapsed)}>Créer un évènement personnalisé</span> */}
      {/* {isCollapsed && */}
      <div className={classes.collapsibleDiv}>
        <span className={classes.span}>Informations</span>
        <input className={classes.input} type="text" placeholder="Titre" />
        <textarea className={classes.textarea} placeholder="Message" />
        {/* <span className={classes.span}>Colorimétrie</span>
          <label htmlFor="themeColor">Couleur du thème</label>
          <div className={classes.colorContainer} >
            <div className={classes.colorPreview} style={{ background: color }}></div>
            <HexColorInput className={classes.input} color={color} onChange={setColor} onClick={() => setColorPicker(!colorPicker)} />
          </div>
          {
            colorPicker &&
            <HexColorPicker className={classes.colorPick} color={color} onChange={setColor} />
          }
          <label htmlFor="textColor">Couleur du texte</label>
          <div className={classes.colorContainer} >
            <div className={classes.colorPreview} style={{ background: colorText }}></div>
            <HexColorInput className={classes.input} color={colorText} onChange={setColorText} onClick={() => setColorTextPicker(!colorTextPicker)} />
          </div>
          {
            colorTextPicker &&
            <HexColorPicker className={classes.colorPick} color={colorText} onChange={setColorText} />
          }
          <br />
          <span className={classes.span}>Typographie</span>
          <label htmlFor="fontFamily">Police</label>
          <select id="fontFamily" className={classes.select}>
            <option>Roboto</option>
            <option>Arial</option>
            <option>Times New Roman</option>
          </select>
          <label htmlFor="fontSize">Taille de la police</label>
          <span className={`${classes.span} ${classes.or}`}>
            {range[0] === 0 ? "Petite" : range[0] === 50 ? "Normale" : "Grande"}
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
                  height: "25px",
                  width: "25px",
                  backgroundColor: "#FF7954",
                  border: "3px solid #FFF",
                  borderRadius: "50%",
                  outline: "none",
                }}
              />
            )}
          /> */}
      </div>
      {/* } */}

      <button className={`${classes.fixed} ${classes.button} ${classes.enabledBtn}`} onClick={() => setStep(step + 1)}>
        Suivant
        </button>
    </div>
  );
}

export default CreateEvent;
