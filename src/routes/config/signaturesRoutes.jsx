import PrivateRouteHelper from "../PrivateRoute.helper";
import Users from "../../views/Teams/ManageTeams";
import Studio from "../../views/Signatures/Studio/Studio";

export const signaturesRoutes = [
    <PrivateRouteHelper path="/user/:userId" component={Users} />,

    <PrivateRouteHelper
        path="/edit-signature/:signatureId"
        component={Studio}
    />,
];
