import React, { useRef, useCallback, useState, useEffect } from "react";
import { useDndZone, SOURCES, TRIGGERS } from "react-dnd-action";
import classes from './options.module.css'
import { GiHamburgerMenu } from "react-icons/gi";

const DRAG_HANDLES_SELECTOR_CLASS = "drag-handle-marker";
export function Options(props) {
    const [items, onItemsChange] = useState([
        { id: "eco", title: "eco-resp" },
        { id: "disclaimer", title: "Disclaimer" }
    ]);
    const listRef = useRef();
    const elToPointerStartListener = useRef(new WeakMap());
    const elToKeyboardStartListener = useRef(new WeakMap());
    const [dragDisabled, setDragDisabled] = useState(true);
    props.setOrder(items)
    const handleConsider = useCallback(
        function (e) {
            const {
                items: newItems,
                info: { source, trigger }
            } = e;
            onItemsChange(newItems);
            // Ensure dragging is stopped on drag finish via keyboard
            if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
                setDragDisabled(true);
            }
        },
        [onItemsChange]
    );

    const handleFinalize = useCallback(
        function (e) {
            const {
                items: newItems,
                info: { source }
            } = e;
            onItemsChange(newItems);
            // Ensure dragging is stopped on drag finish via pointer (mouse, touch)
            if (source === SOURCES.POINTER) {
                setDragDisabled(true);
            }
            props.setOrder(items)
        },
        [onItemsChange]
    );
    function handlePointerDragStart(e) {
        console.error("hello!");
        // preventing default to prevent lag on touch devices (because of the browser checking for screen scrolling)
        e.preventDefault();
        setDragDisabled(false);
    }
    function handleKeyDownDragStart(e) {
        if ((e.key === "Enter" || e.key === " ") && dragDisabled) {
            setDragDisabled(false);
        }
    }

    // We cannot use React's build in event listeners because the synthetic event handler gets triggered after the original event has propagated, which is too late for us
    useEffect(function wireUpDragHandles() {
        if (!listRef.current) return;
        listRef.current
            .querySelectorAll(`.${DRAG_HANDLES_SELECTOR_CLASS}`)
            .forEach((handleEl) => {
                if (elToPointerStartListener.current.has(handleEl)) {
                    handleEl.removeEventListener(
                        "mousedown",
                        elToPointerStartListener.current.get(handleEl)
                    );
                    handleEl.removeEventListener(
                        "touchstart",
                        elToPointerStartListener.current.get(handleEl)
                    );
                    handleEl.removeEventListener(
                        "keydown",
                        elToKeyboardStartListener.current.get(handleEl)
                    );
                }
                handleEl.addEventListener("mousedown", handlePointerDragStart);
                handleEl.addEventListener("touchstart", handlePointerDragStart);
                elToPointerStartListener.current.set(handleEl, handlePointerDragStart);
                handleEl.addEventListener("keydown", handleKeyDownDragStart);
                elToKeyboardStartListener.current.set(handleEl, handleKeyDownDragStart);
            });
    });

    useDndZone(listRef, { items, dragDisabled }, handleConsider, handleFinalize);
    return (<ul ref={listRef} className={classes.optionsContainer}>
        {items.map((item, index) => {
            return (
                <li key={item.id} style={{ border: "none", outline: "none" }}>
                    <GiHamburgerMenu className={DRAG_HANDLES_SELECTOR_CLASS} />
                    <div className={classes.iconsContainer}>
                        {props.eco.length > 0 && item.id === "eco" ? <input type="text" className={classes.input} value={props.ecoValue}
                            onChange={(e) => props.setEcoValue(e.target.value)} placeholder={props.eco} /> : props.disclaimer.length > 0 && item.id === "disclaimer" ? <input type="text" className={classes.input} value={props.disclaimerValue}
                                onChange={(e) => props.setDisclaimerValue(e.target.value)} placeholder={props.disclaimer} /> :
                            <label htmlFor={item.id}>{item.title}</label>}
                        <label className={classes.switch}>
                            <input type="checkbox" id={item.id}
                                defaultChecked={item.id === "eco" ? props.eco.length > 0 : props.disclaimer.length > 0}
                                onChange={(e) => item.id === "eco" ? (e.target.checked ? props.setEco("Eco-responsable") : props.setEco("")) :
                                    (e.target.checked ? props.setDisclaimer("Disclaimer") : props.setDisclaimer(""))} />
                            <span
                                className={`${classes.slider} ${classes.round}`}
                            ></span>
                        </label>
                    </div>
                </li>
            )
        }
        )}
    </ul>)
}

export default Options

// import { useCallback, useEffect, useRef, useState } from "react";
// import { useDndZone } from "react-dnd-action";

// const DRAG_HANDLES_SELECTOR_CLASS = "drag-handle-marker";
// function Options(props) {
//     const listRef = useRef();
//     const [items, setItems] = useState([
//         { id: "eco", title: "Message eco-responsable" },
//         { id: "disclaimer", title: "Disclaimer" }
//     ]);

//     const handleSort = useCallback(function ({ items, info }) {
//         setItems(items);
//         props.setOrder(items)
//     }, []);

//     useDndZone(listRef, { items }, handleSort);
//     return (<ul ref={listRef} className={classes.optionsContainer}>
//         {items.map((item, index) => {
//             return (
//                 <li key={item.id} style={{ border: "none", outline: "none" }}>
//                     <GiHamburgerMenu className={DRAG_HANDLES_SELECTOR_CLASS} />
//                     <div className={classes.iconsContainer}>
//                         {props.eco.length > 0 && item.id === "eco" ? <input type="text" className={classes.input} value={props.ecoValue} 
//                         onChange={(e) => props.setEcoValue(e.target.value)} placeholder={props.eco} /> : props.disclaimer.length > 0 && item.id === "disclaimer" ? <input type="text" className={classes.input} value={props.disclaimerValue} 
//                         onChange={(e) => props.setDisclaimerValue(e.target.value)} placeholder={props.disclaimer} /> :
//                         <label htmlFor={item.id}>{item.title}</label>}
//                         <label className={classes.switch}>
//                             <input type="checkbox" id={item.id} 
//                             defaultChecked={item.id === "eco" ? props.eco.length > 0 : props.disclaimer.length > 0}
//                              onChange={(e) => item.id === "eco" ? ( e.target.checked ? props.setEco("Eco-responsable") : props.setEco("") ) :
//                              ( e.target.checked ? props.setDisclaimer("Disclaimer") : props.setDisclaimer("") )  } />
//                             <span
//                                 className={`${classes.slider} ${classes.round}`}
//                             ></span>
//                         </label>
//                     </div>
//                 </li>
//             )
//         }
//         )}
//     </ul>)
// }

// export default Options