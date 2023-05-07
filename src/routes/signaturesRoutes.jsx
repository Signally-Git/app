import PrivateRoute from "../Utils/PrivateRoute/privateRoute";
import CreateSignature from "../containers/CreateSignature";
import EditSignatureComponent from "../views/Signatures/edit/editSignature";
import Users from "../views/Users/users";

export const signaturesRoutes = [
    <PrivateRoute path="/user/:userId" component={Users} />,

    <PrivateRoute path="/create-signature" component={CreateSignature} />,
    <PrivateRoute
        path="/edit-signature/:signatureId"
        component={EditSignatureComponent}
    />,
];
