import { useEffect, useState } from "react";
import { getEntityList } from "./Stats.utils";
import { TokenService } from "Utils";
import classes from "./Stats.module.css";
import EventStatistic from "./EventStatistic.module";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Input from "Utils/Input/input";
import Statistic from "./Statistic.module";
import { FormattedMessage, useIntl } from "react-intl";

function StatsPage() {
    const intl = useIntl();
    const organisation = TokenService.getOrganisation();
    const configuration = TokenService.getConfig();
    const [isLoading, setLoading] = useState(false);
    const [type, setType] = useState("organisation");
    const [entities, setEntities] = useState([]);
    const [entity, setEntity] = useState(organisation);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchEntityData = () => {
            setLoading(true);
            setSearch("");
            if (type === "organisation") {
                setLoading(false);
                setEntities([]);
                return;
            }
            getEntityList(type).then((res) => {
                setEntities(res);
                setLoading(false);
            });
        };
        fetchEntityData();
    }, [type]);

    return (
        <div>
            <FormattedMessage id="statistics" tagName="h1" />
            <FormattedMessage id="event" tagName="h3" />
            <div>
                {organisation?.events?.length > 0 ? (
                    <EventStatistic
                        eventType={"event"}
                        entities={organisation.events}
                        entityType={entity?.["@type"]}
                        entityId={entity?.id}
                    />
                ) : (
                    <FormattedMessage id="statistic.no_event" tagName="span" />
                )}
            </div>
            <FormattedMessage id="vcard" tagName="h3" />
            <div>
                {organisation?.signatures?.length > 0 ? (
                    <Statistic
                        statisticType={"signature"}
                        eventType={"VCARD_CLICK"}
                        entities={organisation.signatures}
                        entityType={entity?.["@type"]}
                        entityId={entity?.id}
                    />
                ) : (
                    <FormattedMessage
                        id="statistic.no_signature"
                        tagName="span"
                    />
                )}
            </div>
            <FormattedMessage id="socials.title" tagName="h3" />
            <div>
                {organisation?.signatures?.length > 0 ? (
                    <Statistic
                        statisticType={"signature"}
                        eventType={"EVENT_SN_CLICK"}
                        entities={organisation.signatures}
                        entityType={entity?.["@type"]}
                        entityId={entity?.id}
                    />
                ) : (
                    <FormattedMessage
                        id="statistic.no_signature"
                        tagName="span"
                    />
                )}
            </div>
            <FormattedMessage id="calendar" tagName="h3" />
            <div>
                {organisation?.signatures?.length > 0 ? (
                    <Statistic
                        statisticType={"signature"}
                        eventType={"CALENDLY_CLICK"}
                        entities={organisation.signatures}
                        entityType={entity?.["@type"]}
                        entityId={entity?.id}
                    />
                ) : (
                    <FormattedMessage
                        id="statistic.no_signature"
                        tagName="span"
                    />
                )}
            </div>
            <FormattedMessage id="logo" tagName="h3" />
            <div>
                {organisation?.signatures?.length > 0 ? (
                    <Statistic
                        statisticType={"signature"}
                        eventType={"LOGO_CLICK"}
                        entities={organisation.signatures}
                        entityType={entity?.["@type"]}
                        entityId={entity?.id}
                    />
                ) : (
                    <FormattedMessage
                        id="statistic.no_signature"
                        tagName="span"
                    />
                )}
            </div>
            <FormattedMessage id="email" tagName="h3" />
            <div>
                {organisation?.signatures?.length > 0 ? (
                    <Statistic
                        statisticType={"signature"}
                        eventType={"EMAIL_OPEN"}
                        entities={organisation.signatures}
                        entityType={entity?.["@type"]}
                        entityId={entity?.id}
                    />
                ) : (
                    <FormattedMessage
                        id="statistic.no_signature"
                        tagName="span"
                    />
                )}
            </div>
            <div className={classes.entitySelectContainer}>
                <form>
                    <ul>
                        <li>
                            <input
                                id={organisation["@id"]}
                                value="organisation"
                                type="radio"
                                name="entityType"
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
                                defaultChecked={true}
                            />
                            <label htmlFor={organisation["@id"]}>
                                <FormattedMessage id="company" />
                            </label>
                        </li>
                        <li>
                            <input
                                id={
                                    configuration.filter(
                                        (item) => item.key === "WORKPLACE_NAME"
                                    )[0].value
                                }
                                value="workplace"
                                name="entityType"
                                type="radio"
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
                            />
                            <label
                                htmlFor={
                                    configuration.filter(
                                        (item) => item.key === "WORKPLACE_NAME"
                                    )[0].value
                                }
                            >
                                {
                                    configuration.filter(
                                        (item) => item.key === "WORKPLACE_NAME"
                                    )[0].value
                                }
                            </label>
                        </li>
                        <li>
                            <input
                                id={
                                    configuration.filter(
                                        (item) => item.key === "TEAM_NAME"
                                    )[0].value
                                }
                                value="team"
                                name="entityType"
                                type="radio"
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
                            />
                            <label
                                htmlFor={
                                    configuration.filter(
                                        (item) => item.key === "TEAM_NAME"
                                    )[0].value
                                }
                            >
                                {
                                    configuration.filter(
                                        (item) => item.key === "TEAM_NAME"
                                    )[0].value
                                }
                            </label>
                        </li>
                        <li>
                            <input
                                id={
                                    configuration.filter(
                                        (item) => item.key === "USER_NAME"
                                    )[0].value
                                }
                                value="user"
                                name="entityType"
                                type="radio"
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
                            />
                            <label
                                htmlFor={
                                    configuration.filter(
                                        (item) => item.key === "USER_NAME"
                                    )[0].value
                                }
                            >
                                {
                                    configuration.filter(
                                        (item) => item.key === "USER_NAME"
                                    )[0].value
                                }
                            </label>
                        </li>
                    </ul>
                </form>
                {isLoading ? (
                    <div className={classes.loadingContainer}>
                        <AiOutlineLoading3Quarters />
                    </div>
                ) : (
                    <div className={classes.entitiesContainer}>
                        {!entities || entities.length === 0 ? (
                            <></>
                        ) : (
                            <div>
                                <Input
                                    type="text"
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={`${intl.formatMessage({
                                        id: "search",
                                    })} ${
                                        configuration.filter(
                                            (item) =>
                                                item.key ===
                                                `${entities[0]?.[
                                                    "@type"
                                                ]?.toUpperCase()}_NAME`
                                        )[0]?.value
                                    }`}
                                />
                                <ul>
                                    {entities.map((entity) => {
                                        if (
                                            entity.name
                                                ?.toLowerCase()
                                                ?.search(
                                                    search.toLowerCase()
                                                ) !== -1
                                        )
                                            return (
                                                <li key={entity.id}>
                                                    <input
                                                        id={entity.id}
                                                        name="entity"
                                                        type="radio"
                                                        onChange={() =>
                                                            setEntity(entity)
                                                        }
                                                    />
                                                    <label htmlFor={entity.id}>
                                                        {entity?.name ||
                                                            `${entity?.firstName} ${entity?.lastName}`}
                                                    </label>
                                                </li>
                                            );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default StatsPage;
