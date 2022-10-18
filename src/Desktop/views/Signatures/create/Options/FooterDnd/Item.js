import React, { forwardRef } from "react";

export const Item = forwardRef(({ content, id, ...props }, ref) => {
    const handleInput = () => {
        switch (content) {
            case "Disclaimer":
                return (
                    <div>
                        {props.data?.footer.disclaimerEnabled ? (
                            <>
                                <input
                                    type="text"
                                    autoFocus
                                    onChange={(e) => {
                                        props.setData({
                                            ...props.data,
                                            footer: {
                                                ...props.data?.footer,
                                                disclaimerValue: e.target.value,
                                            },
                                        });
                                    }}
                                    defaultValue={
                                        props.data?.footer.disclaimerValue
                                    }
                                />
                            </>
                        ) : (
                            <label htmlFor="disclaimer">Disclaimer</label>
                        )}
                        <label>
                            <input
                                type="checkbox"
                                autoFocus
                                id="disclaimer"
                                defaultChecked={
                                    props.data?.footer.disclaimerEnabled
                                }
                                onChange={(e) => {
                                    props.setData({
                                        ...props.data,
                                        footer: {
                                            ...props.data?.footer,
                                            disclaimerEnabled: e.target.checked,
                                        },
                                    });
                                }}
                            />
                            <span></span>
                        </label>
                    </div>
                );
            case "Eco":
                return (
                    <div>
                        {props.data?.footer.ecoEnabled ? (
                            <>
                                <input
                                    type="text"
                                    autoFocus
                                    onChange={(e) => {
                                        props.setData({
                                            ...props.data,
                                            footer: {
                                                ...props.data?.footer,
                                                ecoValue: e.target.value,
                                            },
                                        });
                                    }}
                                    defaultValue={props.data?.footer.ecoValue}
                                />
                            </>
                        ) : (
                            <label htmlFor="eco">Ecoresponsability</label>
                        )}
                        <label>
                            <input
                                type="checkbox"
                                autoFocus
                                id="eco"
                                defaultChecked={props.data?.footer.ecoEnabled}
                                onChange={(e) => {
                                    props.setData({
                                        ...props.data,
                                        footer: {
                                            ...props.data?.footer,
                                            ecoEnabled: e.target.checked,
                                        },
                                    });
                                }}
                            />
                            <span></span>
                        </label>
                    </div>
                );
            default:
                break;
        }
    };
    return (
        <div ref={ref}>
            <button {...props}>|||</button>
            {handleInput()}
        </div>
    );
});
