import React, { useState, useEffect, useRef } from "react";
import styles from "./customConsole.module.scss";
import ObjectDisplay from "./ObjectDisplay/ObjectDisplay";

function CustomConsole() {
    const [messages, setMessages] = useState([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const [position, setPosition] = useState({ x: 0, y: 400 });
    const [isFixed, setIsFixed] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const consoleRef = useRef();
    const lastMessageRef = useRef(null);

    useEffect(() => {
        const originalLog = console.log;
        const originalError = console.error;

        console.log = (...args) => {
            if (args.length === 1 && typeof args[0] === "object") {
                setMessages((prev) => [
                    ...prev,
                    { type: "log", content: args[0] },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { type: "log", content: args.join(" ") },
                ]);
            }
            originalLog(...args);
        };

        console.error = (...args) => {
            if (args.length === 1 && typeof args[0] === "object") {
                setMessages((prev) => [
                    ...prev,
                    { type: "error", content: args[0] },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { type: "error", content: args.join(" ") },
                ]);
            }
            originalError(...args);
        };

        return () => {
            console.log = originalLog;
            console.error = originalError;
        };
    }, []);

    const renderLogContent = (content) => {
        if (typeof content === "object" && content !== null) {
            return <ObjectDisplay data={content} />;
        }
        return content;
    };

    const handleMouseDown = (e) => {
        if (isFixed) return;
        isDragging.current = true;

        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (isDragging.current) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const toggleFixed = () => {
        setIsFixed((prevFixed) => !prevFixed);
    };

    const filteredMessages = messages.filter((msg) =>
        JSON.stringify(msg.content).includes(searchTerm)
    );

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [filteredMessages]);

    return (
        <div
            className={styles["custom-console"]}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                opacity: isFixed ? 1 : 0.5,
            }}
            ref={consoleRef}
        >
            <div
                className={`${styles["console-header"]} ${
                    isFixed && styles["fixed"]
                }`}
                onMouseDown={handleMouseDown}
            >
                <button onClick={() => setMessages([])}>Clear</button>
                Console
                <div>
                    <input
                        type="text"
                        placeholder="Recherche..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <label> {filteredMessages.length} résultats</label>
                </div>
                <button onClick={toggleFixed}>
                    {isFixed ? "Unlock" : "Lock"}
                </button>
            </div>
            <div className={styles["console-content"]}>
                <ul>
                    {filteredMessages.map((msg, index) => (
                        <li
                            key={index}
                            className={styles[msg.type]}
                            ref={
                                index === filteredMessages.length - 1
                                    ? lastMessageRef
                                    : null
                            }
                        >
                            {renderLogContent(msg.content)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CustomConsole;
