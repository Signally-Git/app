import { useEffect, useState } from "react";
import CreateEventImage from "Assets/img/create-event.png";
import classes from "./createEvent.module.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import { IoMdClose } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
// import { Range } from "react-range";
import CrossIcon from "Assets/icons/cross.svg";
import Event from "Assets/icons/event.svg";
// import { HexColorInput, HexColorPicker } from "react-colorful";
import TimeInput from 'react-time-input';
import axios from "axios";
import { API } from "config";

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
  const [uploadedMedia, setUploadedMedia] = useState()
  const [autofocus, setAutofocus] = useState(false)
  const [timeStartAF, setTimeStartAF] = useState(false)
  const [timeEndAF, setTimeEndAF] = useState(false)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [imgName, setImgName] = useState("")
  const [url, setUrl] = useState("")
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
  const handleSave = async () => {
    var start = new Date(Date.UTC(state[0].startDate.getUTCFullYear(), state[0].startDate.getUTCMonth(), state[0].startDate.getUTCDate() + 1, parseInt(startTime.substring(0, 2)) - 2, parseInt(startTime.substring(3, 6)), 0))
    var end = new Date(Date.UTC(state[0].endDate.getUTCFullYear(), state[0].endDate.getUTCMonth(), state[0].endDate.getUTCDate() + 1, parseInt(endTime.substring(0, 2)) - 2, parseInt(endTime.substring(3, 6)), 0))
    start = start.getTime()
    end = end.getTime()

    const img = new FormData()
    img.append('file', uploadedMedia)
    if (uploadedMedia)
      await axios.post(`${API}media`, img).then(async (res) => {
        const req = {
          banner_id: res.data.id,
          name: isNameFilled,
          start_date: start,
          end_date: end,
          expire: end,
          active: true
        }
        console.log(req, res.data)
        await axios.post(`${API}organisation/${JSON.parse(localStorage.getItem("user")).organisation_id}/campaigns?access_token=${localStorage.getItem("token")}`, req).then((res) => {
          console.log(res)
        })
      })
      else
      console.log("Vous devez d'abord importer une image pour l'évènement.")
    console.log(start, end)
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
            onChange={() => { setTimeStartAF(true) }}
            onFocus={() => setIsClosed(true)}
          />
          <TimeInput
            placeholder="00:00"
            autoFocus={timeStartAF}
            useRef="TimeInputWrapper"
            className={classes.hourInput}
            onTimeChange={(e) => setStartTime(e)}
          />
        </div>
        <div className={classes.vr}></div>
        <div className={classes.fullDate}>
          <input
            value={state[0].endDate?.toLocaleDateString('fr-FR')}
            type="text"
            onChange={() => { setTimeEndAF(true) }}
            placeholder="Date de fin"
            onFocus={() => setIsClosed(true)}
          />
          <TimeInput
            placeholder="00:00"
            autoFocus={timeEndAF}
            useRef="TimeInputWrapper"
            className={classes.hourInput}
            onTimeChange={(e) => setEndTime(e)}
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
      <div className={classes.inputContainer}>
        <span className={classes.span}>Image</span>
        <div className={classes.fileUpload}>
          {imgName.length > 0 ? (
            <div className={classes.uploadedFile}>
              <span>{imgName}</span>{" "}
              <IoMdClose
                onClick={() => {
                  setImgName("");
                }}
              />
            </div>
          ) : (
            <>
              <input
                type="file"
                onChange={(e) => {
                  setImgName(e.target.files[0].name);
                  setUploadedMedia(e.target.files[0])
                  setAutofocus(true)
                }}
              />
              <span>
                <BsUpload />
                Importer une image
              </span>
            </>
          )}
        </div>
        <input autoFocus={autofocus} value={url} onChange={(e) => setUrl(e.target.value)} className={classes.input} type="text" placeholder="URL" />
      </div>
      {/* <label htmlFor="bannerUrl">Lien URL</label>
      <div className={classes.collapsibleDiv}>
        <span className={classes.span}>Informations</span>
        <input className={classes.input} type="text" placeholder="Titre" />
        <textarea className={classes.textarea} placeholder="Message" />
      </div> */}
      <button className={`${classes.fixed} ${classes.button} ${classes.enabledBtn}`} onClick={() => handleSave()}>
        Suivant
      </button>
    </div>
  );
}

export default CreateEvent;
