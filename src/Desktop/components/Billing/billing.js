import BillingDetails from "./BillingDetails/BillingDetails";
import BillingHistory from "./BillingHistory/billinghistory";
import BillingInfos from "./BillingInfos/billinginfos";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import classes from "./billing.module.css";

export default function Billing() {
    return (
        <div className={classes.container}>
            <h1>Abonnement</h1>
            <div className={classes.row}>
                <div className={classes.leftCol}>
                    <BillingInfos />
                    <PaymentMethod />
                    <BillingHistory />
                </div>
                <div className={classes.rightCol}>
                    <BillingDetails />
                </div>
            </div>
        </div>
    );
}
