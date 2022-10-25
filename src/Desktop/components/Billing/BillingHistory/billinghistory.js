import classes from "./billinghistory.module.css";

const APIHistory = {
    rows: [
        {
            date: "01/02/22",
            description: "Signature Studio",
            montant: "2 500€",
            statut: "Payé",
            facture: "",
        },
        {
            date: "01/02/22",
            description: "Signatures",
            montant: "200€",
            statut: "Payé",
            facture: "",
        },
    ],
};
// Displays every payment made for this organization
// With date, product bought, status, and download receipt option

export default function BillingHistory() {
    return (
        <div className={classes.container}>
            <h4>Historique des paiements</h4>
            <table>
                <thead>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Facture</th>
                </thead>
                <tbody>
                    {APIHistory.rows.map((row) => {
                        return (
                            <tr>
                                <td>{row.date}</td>
                                <td>{row.description}</td>
                                <td>{row.montant}</td>
                                <td>{row.statut}</td>
                                <td>
                                    <a href={row.facture}>Télécharger</a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
