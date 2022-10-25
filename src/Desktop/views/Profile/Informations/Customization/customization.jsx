import classes from "./customization.module.scss";
import Input from "../../../../../Utils/Input/input";

function CompanyCustomization({
    handleSubmit,
    wpName,
    setWP,
    teamName,
    setTeam,
    userName,
    setUser,
}) {
    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <div className={classes.inputsContainer}>
                    <div>
                        <label>Personnalisation</label>
                    </div>
                    <div className={classes.inputContainer}>
                        <label>Bureaux</label>
                        <Input
                            value={wpName}
                            onChange={(e) => setWP(e.target.value)}
                            type="text"
                            placeholder="Bureaux"
                        />
                    </div>
                    <div className={classes.inputContainer}>
                        <label>Équipes</label>
                        <Input
                            value={teamName}
                            onChange={(e) => setTeam(e.target.value)}
                            type="text"
                            placeholder="Équipes"
                        />
                    </div>
                    <div className={classes.inputContainer}>
                        <label>Collaborateurs</label>
                        <Input
                            value={userName}
                            onChange={(e) => setUser(e.target.value)}
                            type="text"
                            placeholder="Collaborateurs"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CompanyCustomization;
