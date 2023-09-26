import React, { useState, useRef, useEffect } from "react";
import styles from "./Menu.module.scss";

const Menu = ({ isTemplateSelected, onTabSelect }) => {
    const tabs = ["Templates", "Details", "Images", "Social", "Addons"];
    const [selectedTab, setSelectedTab] = useState("Templates");
    const tabsRef = useRef([]);
    tabsRef.current = [];

    const sliderRef = useRef(null);

    const addToRefs = (el) => {
        if (el && !tabsRef.current.includes(el)) {
            tabsRef.current.push(el);
        }
    };

    useEffect(() => {
        const activeTab = tabsRef.current.find(
            (tab) => tab.textContent === selectedTab
        );
        if (activeTab && sliderRef.current) {
            const slider = sliderRef.current;
            slider.style.left = `${activeTab.offsetLeft}px`;
            slider.style.width = `${activeTab.offsetWidth}px`;
        }
    }, [selectedTab]);

    return (
        <>
            <ul className={styles.menuContainer}>
                <div ref={sliderRef} className={styles.slider}></div>
                {tabs.map((tabName) => (
                    <li
                        ref={addToRefs}
                        key={tabName}
                        onClick={() => {
                            if (isTemplateSelected) {
                                // Ajoutez cette vérification
                                setSelectedTab(tabName);
                                onTabSelect(tabName);
                            }
                        }}
                        className={`${styles.menuItem} ${
                            tabName !== selectedTab &&
                            !isTemplateSelected &&
                            tabName !== "Templates"
                                ? styles.disabledTab
                                : ""
                        }`}
                    >
                        {tabName}
                    </li>
                ))}
            </ul>
        </>
    );
};

export { Menu };
