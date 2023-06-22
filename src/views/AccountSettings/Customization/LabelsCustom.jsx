import classes from "./customization.module.scss";
import { Input } from "components";
import { FormattedMessage, useIntl } from "react-intl";

function CompanyCustomization({
    handleSubmit,
    wpName,
    setWP,
    teamName,
    setTeam,
    userName,
    setUser,
}) {
    const intl = useIntl();
    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <div className={classes.inputsContainer}>
                    <div>
                        <FormattedMessage id="custom" tagName="label" />
                    </div>
                    <div className={classes.inputContainer}>
                        <FormattedMessage id="workplaces" tagName="label" />
                        <Input
                            value={wpName}
                            onChange={(e) => setWP(e.target.value)}
                            type="text"
                            placeholder={intl.formatMessage({
                                id: "workplaces",
                            })}
                        />
                    </div>
                    <div className={classes.inputContainer}>
                        <FormattedMessage id="teams" tagName="label" />
                        <Input
                            value={teamName}
                            onChange={(e) => setTeam(e.target.value)}
                            type="text"
                            placeholder={intl.formatMessage({ id: "teams" })}
                        />
                    </div>
                    <div className={classes.inputContainer}>
                        <FormattedMessage id="employees" tagName="label" />
                        <Input
                            value={userName}
                            onChange={(e) => setUser(e.target.value)}
                            type="text"
                            placeholder={intl.formatMessage({
                                id: "employees",
                            })}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CompanyCustomization;
