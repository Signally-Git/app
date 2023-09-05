import React from "react";
import { CustomCheckbox, Input } from "components";

const ImagePropertyEditor = ({
    isVisible,
    width,
    height,
    onVisibilityChange,
    onWidthChange,
    onHeightChange,
}) => {
    return (
        <div>
            <CustomCheckbox
                title="Visible"
                checked={isVisible.value}
                onChange={(e) => {
                    onVisibilityChange({
                        id: isVisible.id,
                        value: e.target.checked,
                    });
                }}
            />
            <Input
                type="number"
                min={0}
                value={width.value}
                placeholder={"Width"}
                onChange={(e) => {
                    onWidthChange({
                        id: width.id,
                        value: parseFloat(e.target.value),
                    });
                }}
            />
            <Input
                type="number"
                min={0}
                value={height.value}
                placeholder={"Height"}
                onChange={(e) => {
                    onHeightChange({
                        id: height.id,
                        value: parseFloat(e.target.value),
                    });
                }}
            />
        </div>
    );
};

export default ImagePropertyEditor;
