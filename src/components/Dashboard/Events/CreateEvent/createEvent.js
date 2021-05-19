import { useState } from 'react'
import CreateEventImage from '../../../../assets/img/create-event.png'
import classes from './createEvent.module.css'
import Select from 'react-select'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range'
import * as locales from 'react-date-range/dist/locale';

import { Range } from 'react-range';

function CreateEvent() {
    const [step, setStep] = useState(1)
    const [range, setRange] = useState([50])
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);
    
    const colorsText = [
        { value: '#000000', label: '#000000' },
        { value: '#FFFFF', label: '#FFFFFF' },
        { value: 'red', label: 'red' }
      ]
      const colorsTheme = [
        { value: '#000000', label: '#000000' },
        { value: '#FFFFF', label: '#FFFFFF' },
        { value: 'red', label: 'red' }
      ]
    if (step === 1)
        return (<div className={classes.container}>
            <div className={classes.subcontainer}>
                <h1>Créer un évènement</h1>
                <img src={CreateEventImage} alt="Stopwatch" />
                <p>Agrémentez votre signature d’une bannière évènementielle : Mettez en avant un webinar, une nouvelle offre ...</p>
            </div>
            <button className={classes.button} onClick={() => setStep(2)}>Suivant</button>
        </div>)
    else if (step === 2)
        return (<div className={classes.container}>
            <div className={classes.subcontainerShort}>
                <h1>Nom de l'évènement</h1>
                <input className={classes.input} type="text" placeholder="Nom de l'évènement" />
            </div>
            <button className={classes.button} onClick={() => setStep(step + 1)}>Suivant</button>
        </div>)
    else if (step >= 3)
        return (<div className={classes.container}>
                                <DateRange
                    editableDateinput className={classes.calendar}s={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    locale={locales['fr']}
                    ranges={state}
                    weekdayDisplayFormat={"EEEEE"}
                    weekStartsOn={0}
                    showMonthAndYearPickers={false}
                    />
                    <span className={classes.span}>Image</span>
                <label htmlFor="url">Lien URL</label>
                <input className={classes.input} type="text" id="url" placeholder="https://exemple.fr/image" />
                <span className={`${classes.span} ${classes.or}`}>OU</span>
                <button className={classes.button}>Télécharger une image</button>
                <hr />
                <span className={classes.span}>Redirection de la bannière</span>
                <label htmlFor="bannerUrl">Lien URL</label>
                <input className={classes.input} id="bannerUrl" type="text" placeholder="https://mon_evenement.fr/" />
                <span>Créer un évènement personnalisé </span>
                <span className={classes.span}>Informations</span>
                <input className={classes.input} type="text" placeholder="Titre" />
                <textarea className={classes.textarea} placeholder="Message" />
                <span className={classes.span}>Colorimétrie</span>
                <label htmlFor="themeColor">Couleur du thème</label>
                <Select options={colorsText} className={classes.select} placeholder="#000000" />
                <label htmlFor="textColor">Couleur du texte</label>
                <select className={classes.select} id="textColor">
                    <option>#000000</option>
                    <option>#000000</option>
                    <option>#000000</option>
                    <option>#000000</option>
                </select>
                <span className={classes.span}>Typographie</span>
                <label htmlFor="fontFamily">Police</label>
                <select id="fontFamily" className={classes.select}>
                    <option>Roboto</option>
                    <option>Arial</option>
                    <option>Times New Roman</option>
                </select>
                <label htmlFor ="fontSize">Taille de la police</label>
                <span className={`${classes.span} ${classes.or}`}>{range[0] === 0 ? "Petite" : range[0] === 50 ? "Normale" : "Grande"}</span>
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
              height: '6px',
              width: '100%',
              backgroundColor: '#FFF',
                margin: '1rem 0'
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
              height: '25px',
              width: '25px',
              backgroundColor: '#FF7954',
              border: '3px solid #FFF',
              borderRadius: '50%',
              outline: 'none'
            }}
          />
        )}
      />
                
            <button className={classes.button} onClick={() => setStep(step + 1)}>Suivant</button>
        </div>)
}

export default CreateEvent