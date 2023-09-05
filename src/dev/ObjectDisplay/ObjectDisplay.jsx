import React, { useState, useRef } from "react";
import styles from "./ObjectDisplay.module.scss";

function ObjectDisplay({ data }) {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [copied, setCopied] = useState(false);
    const pressTimer = useRef();
    const justCopied = useRef(false); // Ajout de ce ref

    const toggleKey = (e, key) => {
        e.stopPropagation();
        // Vérifiez si une copie a été faite avant d'expand/collapse
        if (justCopied.current) return;

        setExpandedKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const handleMouseDown = (key, value) => {
        pressTimer.current = setTimeout(() => {
            const toCopy = `${key}: ${JSON.stringify(value)}`;
            copyToClipboard(toCopy);
            setCopied(true);
            justCopied.current = true; // Marquez comme copié
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }, 1000);
    };

    const handleMouseUp = () => {
        clearTimeout(pressTimer.current);
        setTimeout(() => {
            justCopied.current = false; // Réinitialisez après un bref délai
        }, 100);
    };
    const copyToClipboard = (str) => {
        const el = document.createElement("textarea");
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    };

    const renderValue = (key, value) => {
        if (typeof value === "undefined") {
            return <span>undefined</span>;
        } else if (typeof value === "object" && value !== null) {
            const isExpanded = expandedKeys.includes(key);
            return (
                <div
                    className={styles.objectWrapper}
                    onClick={(e) => toggleKey(e, key)}
                    onMouseDown={() => handleMouseDown(key, value)}
                    onMouseUp={handleMouseUp}
                >
                    {isExpanded ? (
                        <ObjectDisplay data={value} />
                    ) : (
                        <span className={styles.expandableText}>{"{...}"}</span>
                    )}
                </div>
            );
        }
        return <span>{value?.toString() || String(value)}</span>;
    };

    return (
        <div className={styles.objectDisplay}>
            {copied && <div className={styles.copiedMessage}>Copié!</div>}
            {Object.keys(data).map((key) => (
                <div key={key} className={styles.entry}>
                    <strong>{key}:</strong> {renderValue(key, data[key])}
                </div>
            ))}
        </div>
    );
}

export default ObjectDisplay;
