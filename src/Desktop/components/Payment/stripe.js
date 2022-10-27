import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import classes from "./payment.module.css";

const useOptions = () => {
    const fontSize = "1rem";
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Montserrat",
                    "::placeholder": {
                        color: "#aab7c4",
                    },
                },
                invalid: {
                    color: "#9e2146",
                },
            },
        }),
        [fontSize]
    );

    return options;
};

const CardForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const [isFocus, setFocus] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        console.log("[PaymentMethod]", payload);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`${classes.form} ${isFocus && classes.focused}`}
        >
            <label>
                <CardElement
                    options={options}
                    onReady={() => {
                        console.log("CardElement [ready]");
                    }}
                    onChange={(event) => {
                        console.log("CardElement [change]", event);
                    }}
                    onBlur={() => {
                        setFocus(false);
                    }}
                    onFocus={() => {
                        setFocus(true);
                    }}
                />
            </label>
            <button
                type="submit"
                disabled={!stripe}
                className={classes.activated}
            >
                Payer
            </button>
        </form>
    );
};

export default CardForm;
