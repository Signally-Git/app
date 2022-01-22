import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";

export default function ResetPassword() {
    return (<>
        <h1>Réinitialisez votre mot de passe</h1>
        <Input type="password" placeholder="Nouveau mot de passe" />
        <Input type="password" placeholder="Confirmer mot de passe" />
        <Button color="orange">Réinitialiser</Button>
    </>)
}