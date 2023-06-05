import { useEffect, useRef, useState } from "react";
import Button from "Utils/Button/btn";
import Input from "Utils/Input/input";
import classes from "../create.module.css";

import { useHistory } from "react-router-dom";
import request from "Utils/Request/request";
import { useNotification } from "Utils/Notifications/notifications";
import CustomSelect from "Utils/CustomSelect/customselect";
import { FormattedMessage, useIntl } from "react-intl";

export default function CreateTeam({ setDone }) {
    const slide = useRef(null);
    const focus = useRef(null);
    const width = "12rem";
    const [workplaces, setWorkplaces] = useState([]);
    const [workplace, setWorkplace] = useState("");
    const [teamName, setTeamName] = useState("");
    const [hide, setHide] = useState(false);
    const history = useHistory();
    const notification = useNotification();

    const intl = useIntl();

    const handleSave = async () => {
        if (!teamName) return;
        const req =
            workplace !== "Aucun groupe" && workplace !== ""
                ? {
                      workplace: workplace,
                      name: teamName,
                  }
                : { name: teamName };
        const create = await request.post("teams", req).catch(() =>
            notification({
                content: (
                    <>
                        <FormattedMessage id="message.error.teams.part1" />
                        <span className={classes.primaryColor}>
                            {" "}
                            {teamName}{" "}
                        </span>
                        <FormattedMessage id="message.error.teams.part2" />
                    </>
                ),
                status: "invalid",
            })
        );
        if (create.data) {
            notification({
                content: (
                    <>
                        <FormattedMessage id="message.success.teams.edit_part1" />
                        <span className={classes.primaryColor}>{teamName}</span>
                        <FormattedMessage id="message.success.teams.edit_part2" />
                    </>
                ),
                status: "valid",
            });
            history.push("/teams/teams");
        }
        setDone(true);
    };

    const handleSlide = async (e, multiple) => {
        e.preventDefault();
        slide.current.scrollTo({
            top: 0,
            left: slide.current.offsetWidth * multiple,
            behavior: "smooth",
        });
    };

    const getWorkplaces = async () => {
        const wps = await request.get("workplaces");
        if (wps.data["hydra:member"].length > 0) {
            wps.data["hydra:member"].unshift({
                "@id": "Aucun groupe",
                name: <FormattedMessage id="no_workplace" />,
            });
            setWorkplace(wps.data["hydra:member"][1]["@id"]);
            setWorkplaces(wps.data["hydra:member"]);
        }
    };

    useEffect(() => {
        getWorkplaces();
    }, []);

    const handleAccept = async (e) => {
        handleSlide(e, 1);
        setTimeout(() => {
            setHide(true);
            slide.current.scrollTo({
                top: 0,
                left: 0,
            });
        }, 1000);
        localStorage.setItem("understand_team", true);
    };

    return (
        <div className={classes.container}>
            <div className={classes.slidesContainer} ref={slide}>
                {!localStorage.getItem("understand_team") && hide === false ? (
                    <div className={`${classes.slide} ${classes.space}`}>
                        <FormattedMessage id="teams_description" tagName="p" />
                        <Button
                            width="15rem"
                            color="primary"
                            arrow={true}
                            onClick={(e) => {
                                handleAccept(e);
                            }}
                        >
                            <FormattedMessage id="buttons.placeholder.confirm" />
                        </Button>
                    </div>
                ) : (
                    ""
                )}
                <div className={classes.slide}>
                    <form>
                        {workplaces.length > 0 && (
                            <CustomSelect
                                display="name"
                                getValue="@id"
                                styleList={{
                                    maxHeight: "15rem",
                                    paddingTop: "2.5rem",
                                }}
                                items={workplaces}
                                defaultValue={workplace}
                                onChange={(e) => {
                                    setWorkplace(e);
                                    focus.current.focus();
                                }}
                            />
                        )}
                        <Input
                            style={{ width: "100%" }}
                            ref={focus}
                            onChange={(e) => setTeamName(e.target.value)}
                            type="text"
                            placeholder={intl.formatMessage({
                                id: "team_name",
                            })}
                        />

                        <div className={classes.btnsContainer}>
                            <Button
                                width={width}
                                disabled={teamName.length < 1}
                                color="primaryFill"
                                color={
                                    teamName.length < 1
                                        ? "primary"
                                        : "primaryFill"
                                }
                                onClick={(e) => {
                                    handleSave();
                                    handleSlide(e, 3);
                                }}
                            >
                                <FormattedMessage id="buttons.placeholder.save" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
