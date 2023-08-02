import React, { useEffect } from "react";
import { useEyeDrop } from "react-eyedrop";
import { Button } from "components";

const Eye = () => {
    const [colors, pickColor, cancelPickColor] = useEyeDrop({
        once: false,
        pickRadius: 1,
        cursorActive: "crosshair",
        cursorInactive: "default",
    });

    useEffect(() => {
        console.log(colors?.hex);
    }, [colors]);

    return (
        <div>
            <div
                style={{
                    border: "1px solid #000",
                    display: "block",
                    height: "25px",
                    width: "25px",
                    borderRadius: "50%",
                    backgroundColor: colors.hex,
                }}
            ></div>
            <Button onClick={() => pickColor()} color="primary">
                Pick color
            </Button>
        </div>
    );
};

export default Eye;
