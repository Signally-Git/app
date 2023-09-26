import { useRef, useState } from "react";
import { Button, Input, UploadFile } from "components";
import classes from "./create.module.css";
import { useHistory } from "react-router-dom";
import { request, useNotification } from "utils";
import { FormattedMessage, useIntl } from "react-intl";

// todo: add crop
export default function CreateWorkplace({ setDone }) {
    const intl = useIntl();
    const number = !localStorage.getItem("understand_workplace") ? 0 : 1;
    const slide = useRef(null);
    const [hide, setHide] = useState(false);
    const [file, setFile] = useState();
    const width = "12rem";
    const [workplace, setWorkplace] = useState({
        logos: [],
        name: "",
        websiteUrl: "",
        address: {
            street: "",
            city: "",
            zipCode: "",
            country: "",
        },
        digitalAddress: { mobile: "" },
    });
    const history = useHistory();
    const notification = useNotification();

    const handleCSV = async (file) => {
        const csv = new FormData();
        const url = `import/workplaces`;

        csv.append("file", file);

        await request
            .post(url, csv)
            .then((res) => {
                // props.setState(`${res.data["hydra:totalItems"]} ${props.fill.type} ajoutés`)
                setDone(true);
                history.push(`/teams/workplaces`);
            })
            .catch(() =>
                notification({
                    content: <FormattedMessage id="import.failed" />,
                    status: "invalid",
                })
            );
    };

    const handleSave = async () => {
        const req = {
            ...workplace,
        };
        const create = await request.post("workplaces", req).catch(() =>
            notification({
                content: (
                    <>
                        <FormattedMessage id="message.error.add" />
                        <span className={classes.primaryColor}>
                            {workplace.name}
                        </span>
                    </>
                ),
                status: "invalid",
            })
        );
        create?.data &&
            notification({
                content: (
                    <>
                        <span className={classes.primaryColor}>
                            {workplace.name}
                        </span>{" "}
                        <FormattedMessage id="message.success.created" />
                    </>
                ),
                status: "valid",
            });
        const img = new FormData();
        img.append("file", file);
        if (file)
            await request.post(`import/file`, img).then(async (res) => {
                const requestLogo = {
                    name: file.name,
                    path: res?.data.path,
                    workplace: create?.data["@id"],
                };
                await request.post("logos", requestLogo);
            });
        setDone(true);
        history.push("/teams/workplaces");
    };

    const handleSlide = async (e, multiple) => {
        e.preventDefault();
        slide.current.scrollTo({
            top: 0,
            left: slide.current.offsetWidth * (multiple - number),
            behavior: "smooth",
        });
    };

    const handleAccept = async (e) => {
        handleSlide(e, 1);
        setTimeout(() => {
            setHide(true);
            slide.current.scrollTo({
                top: 0,
                left: 0,
            });
        }, 1000);
        localStorage.setItem("understand_workplace", true);
    };

    return (
        <div className={classes.container}>
            <div className={classes.slidesContainer} ref={slide}>
                {!localStorage.getItem("understand_workplace") &&
                hide === false ? (
                    <div className={`${classes.slide} ${classes.space}`}>
                        <FormattedMessage
                            id="workplaces_description"
                            tagName="p"
                        />
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
                    <Button
                        width={width}
                        color="primaryFill"
                        arrow={true}
                        className={classes.btn}
                        onClick={(e) => handleSlide(e, 2)}
                    >
                        <FormattedMessage id="buttons.placeholder.manual" />
                    </Button>
                    <Button
                        width={width}
                        color="secondary"
                        className={classes.btn}
                    >
                        {" "}
                        <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => {
                                // handleSave()
                                handleCSV(e.target.files[0]);
                            }}
                        />
                        <FormattedMessage id="buttons.placeholder.from_csv" />
                    </Button>
                </div>
                <form
                    onSubmit={(e) => handleSlide(e, 4)}
                    className={classes.slide}
                >
                    <div className={classes.inputsContainer}>
                        <Input
                            style={{ width: "100%", marginBottom: "1rem" }}
                            onChange={(e) =>
                                setWorkplace({
                                    ...workplace,
                                    name: e.target.value,
                                })
                            }
                            type="text"
                            placeholder={intl.formatMessage({
                                id: "workplace_name",
                            })}
                        />
                        <UploadFile
                            placeholder={intl.formatMessage({
                                id: "buttons.placeholder.import.logo",
                            })}
                            file={file}
                            setFile={setFile}
                        />
                        <Input
                            style={{ width: "100%" }}
                            onChange={(e) =>
                                setWorkplace({
                                    ...workplace,
                                    websiteUrl: e.target.value,
                                })
                            }
                            type="text"
                            placeholder={intl.formatMessage({ id: "link" })}
                        />
                        <div className={classes.btnsContainer}>
                            <Button
                                disabled={workplace.name.length < 1}
                                width={width}
                                color={
                                    workplace.name.length < 1
                                        ? "primary"
                                        : "primaryFill"
                                }
                                arrow={true}
                                type="submit"
                                className={`${classes.btn}`}
                            >
                                <FormattedMessage id="buttons.placeholder.confirm" />
                            </Button>
                            <Button
                                width={width}
                                color="primary"
                                className={`${classes.btn}`}
                                onClick={(e) => handleSlide(e, 1)}
                            >
                                <FormattedMessage id="buttons.placeholder.cancel" />
                            </Button>
                        </div>
                    </div>
                </form>
                <form
                    onSubmit={(e) => {
                        handleSave();
                        handleSlide(e, 3);
                    }}
                    className={classes.slide}
                >
                    <div className={classes.inputsContainer}>
                        <div className={classes.row}>
                            <Input
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                    setWorkplace({
                                        ...workplace,
                                        address: {
                                            ...workplace.address,
                                            street: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                placeholder={intl.formatMessage({
                                    id: "address",
                                })}
                            />
                            <Input
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                    setWorkplace({
                                        ...workplace,
                                        address: {
                                            ...workplace.address,
                                            zipCode: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                placeholder={intl.formatMessage({
                                    id: "zipcode",
                                })}
                            />
                        </div>
                        <div className={classes.row}>
                            <Input
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                    setWorkplace({
                                        ...workplace,
                                        address: {
                                            ...workplace.address,
                                            city: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                placeholder={intl.formatMessage({ id: "city" })}
                            />
                            <Input
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                    setWorkplace({
                                        ...workplace,
                                        address: {
                                            ...workplace.address,
                                            country: e.target.value,
                                        },
                                    })
                                }
                                type="text"
                                placeholder={intl.formatMessage({
                                    id: "country",
                                })}
                            />
                        </div>
                        <Input
                            style={{ width: "100%" }}
                            onChange={(e) =>
                                setWorkplace({
                                    ...workplace,
                                    digitalAddress: { mobile: e.target.value },
                                })
                            }
                            type="text"
                            placeholder={intl.formatMessage({ id: "phone" })}
                        />
                        <div className={classes.btnsContainer}>
                            <Button
                                width={width}
                                color={
                                    workplace.address.street.length < 5 ||
                                    workplace.digitalAddress.mobile.length < 9
                                        ? "primary"
                                        : "primaryFill"
                                }
                                type="submit"
                                className={`${classes.btn} ${
                                    workplace.name < 1 ? classes.disabled : ""
                                }`}
                            >
                                <FormattedMessage id="buttons.placeholder.confirm" />
                            </Button>
                            <Button
                                width={width}
                                color="primary"
                                className={`${classes.btn}`}
                                onClick={(e) => handleSlide(e, 2)}
                            >
                                <FormattedMessage id="buttons.placeholder.cancel" />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
