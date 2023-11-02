import classes from "./tab.module.css";
import { Link } from "react-router-dom";
import { Button, CustomCheckbox, Input, UploadFile } from "components";
import { FormattedMessage, useIntl } from "react-intl";
import { HiOutlineSearch } from "react-icons/hi";
import { FiCheck, FiTrash } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { request, TokenService, useNotification } from "utils";

export const getDataWorkplaces = (setWorkplaces) => {
    request
        .get("workplaces")
        .then(({ data }) => {
            setWorkplaces(data["hydra:member"]);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const ListWorkplaces = ({
    modal,
    modalContent,
    setModal,
    changed,
    setChanged,
    edit,
    setEdit,
    editInfo,
    selected,
    setSelected,
    setEditInfo,
    workplaces,
    setWorkplaces,
    addedWorkplace,
    toFocus,
    time,
}) => {
    const [searchWorkplace, setSearchWorkplace] = useState("");
    const [workplaceName, setWorkplaceName] = useState(editInfo?.name || "");
    const [file, setFile] = useState();
    const [isDeployed, setIsDeployed] = useState(
        editInfo?.synchronizable || false
    );
    const [street, setStreet] = useState(editInfo?.address?.street || "");
    const [city, setCity] = useState(editInfo?.address?.city || "");
    const [zipCode, setZipCode] = useState(editInfo?.address?.zipCode || "");
    const [country, setCountry] = useState(editInfo?.address?.country || "");
    const [mobile, setMobile] = useState(
        editInfo?.digitalAddress?.mobile || ""
    );
    const [fax, setFax] = useState(editInfo?.digitalAddress?.fax || "");
    const [websiteUrl, setWebsiteUrl] = useState(editInfo?.websiteUrl || "");
    const configuration = TokenService.getConfig();
    const intl = useIntl();
    const notification = useNotification();

    useEffect(() => {
        setWorkplaceName(editInfo?.name || "");
        setStreet(editInfo?.address?.street || "");
        setCity(editInfo?.address?.city || "");
        setZipCode(editInfo?.address?.zipCode || "");
        setCountry(editInfo?.address?.country || "");
        setMobile(editInfo?.digitalAddress?.mobile || "");
        setFax(editInfo?.digitalAddress?.fax || "");
        setWebsiteUrl(editInfo?.websiteUrl || "");
        setIsDeployed(editInfo?.synchronizable || false);
    }, [editInfo]);

    useEffect(() => {
        console.log(edit);
    }, [edit]);

    const handleChangeWP = async (e, workplace) => {
        const img = new FormData();
        img.append("file", file);
        if (file)
            await request.post(`import/file`, img).then(async (res) => {
                const requestLogo = {
                    name: file.name,
                    path: res.data.path,
                    workplace: workplace["@id"],
                };
                await request.post("logos", requestLogo).then(() => {
                    setFile();
                });
            });
        e.preventDefault();
        const req = {
            name: workplaceName,
            websiteUrl: websiteUrl,
            address: {
                street: street,
                city: city,
                zipCode: zipCode,
                country: country,
            },
            digitalAddress: {
                mobile: mobile,
                fax: fax,
            },
            synchronizable: isDeployed,
        };
        await request
            .patch(workplace["@id"], req, {
                headers: { "Content-Type": "application/merge-patch+json" },
            })
            .then(({ data }) => {
                notification({
                    content: (
                        <>
                            <span className={classes.primaryColor}>
                                {workplace.name}
                            </span>{" "}
                            <FormattedMessage id="message.success.edit" />
                        </>
                    ),
                    status: "valid",
                });
                setChanged(false);
                getDataWorkplaces(setWorkplaces);
            });
        setEditInfo();
    };

    return (
        <div className={classes.container}>
            {modal.type ? modalContent : ""}
            <Link to="create-workplace">
                <Button style={{ width: "15rem" }} color="primary" arrow={true}>
                    <FormattedMessage id="buttons.placeholder.add" />{" "}
                    {
                        configuration.filter(
                            (item) => item.key === "WORKPLACE_NAME"
                        )[0].value
                    }
                </Button>
            </Link>
            <div className={classes.searchInput}>
                <HiOutlineSearch />
                <input
                    onChange={(e) =>
                        setSearchWorkplace(e.target.value.toLowerCase())
                    }
                    className={classes.search}
                    type="text"
                    placeholder={`${intl.formatMessage({ id: "search" })} ${
                        configuration.filter(
                            (item) => item.key === "WORKPLACE_NAME"
                        )[0].value
                    }`}
                />
            </div>
            <div className={classes.colheader}>
                <span
                    className={`${classes.totalNumber} ${
                        addedWorkplace.length > 0 ? classes.primaryTxt : ""
                    }`}
                >
                    {addedWorkplace.length > 0
                        ? addedWorkplace
                        : `${workplaces.length} ${
                              configuration.filter(
                                  (item) => item.key === "WORKPLACE_NAME"
                              )[0].value
                          }`}
                </span>
                <button onClick={() => setModal({ type: "allworkplaces" })}>
                    <FormattedMessage id="buttons.placeholder.delete_all" />
                </button>
            </div>

            <ul className={classes.itemsList}>
                <form
                    onChange={(e) =>
                        e.target.type === "radio" &&
                        setSelected(JSON.parse(e.target.value))
                    }
                >
                    {workplaces.map((workplace) => {
                        if (
                            workplace?.name
                                ?.toLowerCase()
                                .search(searchWorkplace) !== -1
                        )
                            return (
                                <li
                                    onMouseMove={() => {
                                        if (!edit) {
                                            clearTimeout(time);
                                            console.log(edit, editInfo);
                                            time = setTimeout(() => {
                                                setSelected(workplace);
                                            }, 100);
                                        }
                                    }}
                                    key={workplace.id}
                                    className={`${
                                        editInfo === workplace
                                            ? classes.editing
                                            : ""
                                    } ${
                                        selected?.id === workplace.id &&
                                        selected?.name === workplace?.name
                                            ? classes.selected
                                            : ""
                                    }`}
                                >
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setEdit(workplace);
                                                setSelected(workplace);
                                            }
                                        }}
                                        className={classes.checkbox}
                                        checked={
                                            edit?.id === workplace.id &&
                                            edit?.name === workplace?.name
                                        }
                                        type="radio"
                                        name="workplaces"
                                        value={JSON.stringify(workplace)}
                                    />
                                    {editInfo === workplace ? (
                                        <input
                                            className={classes.rename}
                                            ref={toFocus}
                                            type="text"
                                            value={workplaceName}
                                            onChange={(e) => {
                                                setWorkplaceName(
                                                    e.target.value
                                                );
                                                setChanged(true);
                                            }}
                                        />
                                    ) : (
                                        <input
                                            className={classes.rename}
                                            disabled
                                            type="text"
                                            defaultValue={
                                                workplaceName || workplace?.name
                                            }
                                        />
                                    )}
                                    <span></span>
                                    <div
                                        className={`${
                                            classes.actionsContainer
                                        } ${
                                            changed === true
                                                ? classes.btnReady
                                                : ""
                                        }`}
                                    >
                                        {/* <BsCreditCard2Front /> */}
                                        {/* <GrUserSettings onClick={(e) => { setEdit('assign-workplace') }} /> */}
                                        {editInfo === workplace ? (
                                            <FiCheck
                                                className={classes.checkmark}
                                                strokeWidth={"4"}
                                                onClick={(e) => {
                                                    handleChangeWP(
                                                        e,
                                                        workplace
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <AiOutlineEdit
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setEditInfo(workplace);
                                                }}
                                            />
                                        )}
                                        <FiTrash
                                            onClick={() =>
                                                setModal({
                                                    name: workplace?.name,
                                                    id: workplace?.id,
                                                    type: "workplaces",
                                                })
                                            }
                                        />
                                    </div>
                                    {editInfo === workplace ? (
                                        <>
                                            <div className={classes.editDiv}>
                                                <label
                                                    className={
                                                        classes.deployContainer
                                                    }
                                                    htmlFor="isDeployed"
                                                >
                                                    <FormattedMessage id="deploy.cta" />
                                                    <CustomCheckbox
                                                        onChange={(e) =>
                                                            setIsDeployed(
                                                                e.target.checked
                                                            )
                                                        }
                                                        name="isDeployed"
                                                        id="isDeployed"
                                                        type="checkbox"
                                                        checked={isDeployed}
                                                    />
                                                </label>
                                                <div
                                                    className={
                                                        classes.inputsContainer
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes.wpLogoContainer
                                                        }
                                                    >
                                                        {workplace?.logo
                                                            ?.url && (
                                                            <img
                                                                className={
                                                                    classes.logoPreview
                                                                }
                                                                src={
                                                                    workplace
                                                                        ?.logo
                                                                        ?.url
                                                                }
                                                                alt={
                                                                    workplace
                                                                        ?.logo
                                                                        ?.name
                                                                }
                                                            />
                                                        )}
                                                        <UploadFile
                                                            file={file}
                                                            setFile={setFile}
                                                            placeholder={
                                                                workplace?.logo
                                                                    ?.name
                                                                    ? "Remplacer " +
                                                                      workplace
                                                                          ?.logo
                                                                          ?.name
                                                                    : "Importer un logo"
                                                            }
                                                            style={{
                                                                background:
                                                                    "#FFF",
                                                                marginBottom:
                                                                    ".2rem",
                                                                width: "100%",
                                                            }}
                                                        />
                                                    </div>

                                                    <Input
                                                        onChange={(e) => {
                                                            setWebsiteUrl(
                                                                e.target.value
                                                            );
                                                            setChanged(true);
                                                        }}
                                                        type="string"
                                                        placeholder="Lien du site"
                                                        defaultValue={
                                                            workplace.websiteUrl
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes.inputsContainer
                                                    }
                                                >
                                                    <Input
                                                        onChange={(e) => {
                                                            setStreet(
                                                                e.target.value
                                                            );
                                                            setChanged(true);
                                                        }}
                                                        type="text"
                                                        placeholder="Adresse"
                                                        defaultValue={
                                                            workplace.address
                                                                .street
                                                        }
                                                    />
                                                    <Input
                                                        onChange={(e) => {
                                                            setZipCode(
                                                                e.target.value
                                                            );
                                                            setChanged(true);
                                                        }}
                                                        type="text"
                                                        placeholder="ZIP Code"
                                                        defaultValue={
                                                            workplace.address
                                                                .zipCode
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes.inputsContainer
                                                    }
                                                >
                                                    <Input
                                                        onChange={(e) => {
                                                            setCity(
                                                                e.target.value
                                                            );
                                                            setChanged(true);
                                                        }}
                                                        type="text"
                                                        placeholder="City"
                                                        defaultValue={
                                                            workplace.address
                                                                .city
                                                        }
                                                    />
                                                    <Input
                                                        onChange={(e) => {
                                                            setCountry(
                                                                e.target.value
                                                            );
                                                            setChanged(true);
                                                        }}
                                                        type="text"
                                                        placeholder="Country"
                                                        defaultValue={
                                                            workplace.address
                                                                .country
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes.inputsContainer
                                                    }
                                                >
                                                    <Input
                                                        onChange={(e) => {
                                                            setMobile(
                                                                e.target.value
                                                            );
                                                            setChanged(true);
                                                        }}
                                                        type="tel"
                                                        placeholder="Téléphone"
                                                        defaultValue={
                                                            workplace
                                                                .digitalAddress
                                                                .mobile
                                                        }
                                                    />
                                                    <Input
                                                        onChange={(e) => {
                                                            setFax(
                                                                e.target.value
                                                            );
                                                            setChanged(true);
                                                        }}
                                                        type="tel"
                                                        placeholder="Fax"
                                                        defaultValue={
                                                            workplace
                                                                .digitalAddress
                                                                .fax
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </li>
                            );
                    })}
                </form>
            </ul>
        </div>
    );
};
