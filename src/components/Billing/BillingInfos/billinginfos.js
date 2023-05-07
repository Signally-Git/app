import classes from "./billinginfos.module.css";

const API = {
    companyName: "Mama Shelter",
    billingName: "Jérémie Trigano",
    billingAddress: "2 rue de Bagnolet, Paris 75020, FRANCE",
    billingMail: "jeremie.trigano@mamashelter.com",
};

export default function BillingInfos() {
    return (
        <div className={classes.container}>
            <h4>Informations de paiement</h4>
            <div>
                <ul>
                    <li>
                        <h5>Société :</h5>
                        <span>{API.companyName}</span>
                    </li>
                    <li>
                        <h5>Nom :</h5>
                        <span>{API.billingName}</span>
                    </li>
                    <li>
                        <h5>Adresse :</h5>
                        <span>{API.billingAddress}</span>
                    </li>
                    <li>
                        <h5>Email :</h5>
                        <span>{API.billingMail}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
