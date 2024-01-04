import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheck, FiTrash } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { Button, CustomCheckbox, CustomSelect, Input, Popup, UploadFile } from "components";
import { FormattedMessage, useIntl } from "react-intl";
import {
    TokenService,
    validateEmail,
    useNotification,
    request,
    dataURItoBlob,
    fileToBase64,
} from "utils";
import classes from "./tab.module.css";

function ListUsers({
    selected,
    users,
    setUsers,
    setSelected,
    edit,
    setEdit,
    editInfo,
    setEditInfo,
    modal,
    setModal,
}) {
    const [user, setUser] = React.useState({});
    const [selectedRole, setSelectedRole] = useState(
        user && user.roles && user.roles.length > 0 ? user.roles[0] : "ROLE_USER");
    const [search, setSearch] = React.useState("");
    const [changed, setChanged] = React.useState(false);
    const [usersList, setUsersList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [uploadedMedia, setUploadedMedia] = useState();
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(user?.picture || "");
    const [croppedImage, setCroppedImage] = useState(null);
    const toFocus = React.useRef(null);
    const notification = useNotification();
    const intl = useIntl();
    const [roles] = useState([
        { name: intl.formatMessage({ id: "roles.user" }), value: "ROLE_USER" },
        { name: intl.formatMessage({ id: "roles.rh" }), value: "ROLE_RH" },
        {
            name: intl.formatMessage({ id: "roles.administrator" }),
            value: "ROLE_ADMIN",
        },
    ]);

    const sortUsers = (usersList) => {
        let admin;
        usersList.map((user, index) => {
            if (user["@id"] === TokenService.getUser()["@id"])
                admin = usersList.splice(index, 1);
        });
        setUsersList(
            usersList?.sort(function (a, b) {
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
                    return -1;
                }
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
        );
        usersList.unshift(admin[0]);
        setUsers(usersList);
    };

    const getDataUser = async () => {
        await request
            .get(`users`)
            .then((res) => sortUsers(res.data["hydra:member"]))
            .finally(() => {
                setLoading(false);
            });
    };

    React.useMemo(() => {
        getDataUser();
    }, [modal, edit]);
    const handleChange = (e, data) => {
        setChanged(true);
        setUser({ ...user, [data]: e });
    };
    const handleRoleChange = (e) => {
        setChanged(true);
        const newRole = e.target.value;
        setSelectedRole(newRole); 
        setUser(prevUser => ({
            ...prevUser,
            roles: [newRole]
        }));
        console.log(users)
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        const oldUser = Object?.values(users)?.find((obj) => {
            return obj["@id"] == id;
        });

        if (!validateEmail(user.email)) {
            notification({
                content: <FormattedMessage id="message.error.invalid_email" />,
                status: "invalid",
            });
            return;
        }
        const req = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            position: user.position,
            linkPicture: user.linkPicture,
            email: user.email,
            synchronizable: user.synchronizable,
            urlAgenda: user.urlAgenda,
            roles: [selectedRole]
        };

        if (uploadedMedia) {
            const img = new FormData();
            img.append("file", dataURItoBlob(croppedImage));
            await request
                .post(`import/file?destination=profile_picture`, img)
                .then(async (res) => {
                    req.picture = res.data.url;
                })
                .catch(() =>
                    notification({
                        content: <FormattedMessage id="message.error.logo" />,
                        status: "invalid",
                    })
                );
        }

        await request
            .patch(id, req, {
                headers: { "Content-Type": "application/merge-patch+json" },
            })
            .then(() => {
                setEdit();
                setEditInfo();
                getDataUser();
                setChanged(false);
                notification({
                    content: (
                        <>
                            <span className={classes.colorPrimary}>
                                {oldUser?.firstName} {oldUser?.lastName}
                            </span>{" "}
                            <FormattedMessage id="message.success.edit" />
                        </>
                    ),
                });
            })
            .catch(
                (err) =>
                    err["hydra:description"] ===
                        "email: This value is already used." &&
                    notification({
                        content: (
                            <FormattedMessage id="message.error.user_already_created" />
                        ),
                        status: "invalid",
                    })
            );
    };

    useEffect(() => {
        if (!uploadedMedia) {
            setPreview(user?.picture || null);
            return;
        }
        const objectUrl = URL.createObjectURL(uploadedMedia);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedMedia]);

    useEffect(() => {
        setPreview(user?.picture ?? "");
    }, [user?.picture]);

    const handleUploadImage = async (image) => {
        if (image?.type === "image/gif") {
            setUploadedMedia(image);
            const imgBase64 = await fileToBase64(image);
            handleCroppedImage(imgBase64);
        } else {
            setUploadedMedia(image);
            setOpen(true);
        }
    };

    const handleCroppedImage = (image) => {
        setCroppedImage(image);
        setPreview(image);
        setOpen(false);
    };

    return (
        <div className={classes.mh100}>
            <Link to="create-user">
                <Button style={{ width: "15rem" }} color="primary" arrow={true}>
                    <FormattedMessage id="buttons.placeholder.add" />{" "}
                    {
                        JSON.parse(
                            localStorage.getItem("configuration")
                        ).filter((item) => item.key === "USER_NAME")[0]?.value
                    }
                </Button>
            </Link>
            <div className={classes.searchInput}>
                <HiOutlineSearch />
                <input
                    className={classes.search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder={`${intl.formatMessage({ id: "search" })} ${
                        JSON.parse(
                            localStorage.getItem("configuration")
                        ).filter((item) => item.key === "USER_NAME")[0]?.value
                    }`}
                />
            </div>

            <div className={classes.colheader}>
                <span className={classes.totalNumber}>
                    {usersList.length}{" "}
                    {
                        JSON.parse(
                            localStorage.getItem("configuration")
                        ).filter((item) => item.key === "USER_NAME")[0]?.value
                    }
                </span>
                <button
                    onClick={() =>
                        setModal({ type: "allusers", items: usersList })
                    }
                >
                    <FormattedMessage id="buttons.placeholder.delete_all" />
                </button>
            </div>
            <ul className={`${classes.itemsList} ${classes.usersList}`}>
                <form
                    onChange={(e) =>
                        e.target.type === "radio" &&
                        setSelected(JSON.parse(e.target.value))
                    }
                >
                    {loading ? (
                        <AiOutlineLoading3Quarters
                            className={classes.loading}
                        />
                    ) : (
                        usersList.map((user) => {
                            const fullName =
                                user.firstName.toLowerCase() +
                                " " +
                                user.lastName.toLowerCase();
                            if (fullName.search(search.toLowerCase()) !== -1)
                                return (
                                    <li
                                        onMouseMove={() => {
                                            if (!edit) {
                                                setSelected(user);
                                            }
                                        }}
                                        key={user.id}
                                        className={`${
                                            editInfo === user &&
                                            user?.id !==
                                                JSON.parse(
                                                    localStorage.getItem("user")
                                                )?.id
                                                ? classes.editing
                                                : ""
                                        } ${
                                            selected?.id === user.id &&
                                            selected?.name === user.name
                                                ? classes.selected
                                                : ""
                                        }`}
                                    >
                                        <input
                                            className={classes.checkbox}
                                            onChange={(e) => {
                                                setEdit(user);
                                                setSelected(user);
                                            }}
                                            checked={
                                                edit?.id === user.id &&
                                                edit?.name === user.name
                                            }
                                            type="radio"
                                            name="user"
                                            value={JSON.stringify(user)}
                                        />
                                        {editInfo === user &&
                                        user?.id !==
                                            TokenService.getUser()?.id ? (
                                            <>
                                                <div
                                                    className={
                                                        classes.renameContainer
                                                    }
                                                >
                                                    <input
                                                        placeholder={intl.formatMessage(
                                                            { id: "firstname" }
                                                        )}
                                                        className={
                                                            classes.rename
                                                        }
                                                        ref={toFocus}
                                                        type="text"
                                                        defaultValue={`${user.firstName}`}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e.target.value,
                                                                "firstName"
                                                            )
                                                        }
                                                    />
                                                    <input
                                                        placeholder={intl.formatMessage(
                                                            { id: "lastname" }
                                                        )}
                                                        className={
                                                            classes.rename
                                                        }
                                                        ref={toFocus}
                                                        type="text"
                                                        defaultValue={`${user.lastName}`}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e.target.value,
                                                                "lastName"
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <input
                                                className={classes.rename}
                                                disabled
                                                type="text"
                                                value={`${user.firstName} ${user.lastName}`}
                                            />
                                        )}
                                        <span></span>
                                        {user?.id ===
                                        TokenService.getUser()?.id ? (
                                            <div
                                                className={
                                                    classes.actionsContainerAdmin
                                                }
                                            >
                                                <Link to="/account/user">
                                                    <AiOutlineEdit />
                                                </Link>
                                            </div>
                                        ) : (
                                            <div
                                                className={`${
                                                    classes.actionsContainer
                                                } ${
                                                    changed === true
                                                        ? classes.btnReady
                                                        : ""
                                                }`}
                                            >
                                                {editInfo === user ? (
                                                    <FiCheck
                                                        className={
                                                            classes.checkmark
                                                        }
                                                        strokeWidth={"4"}
                                                        onClick={(e) => {
                                                            handleSubmit(
                                                                e,
                                                                user["@id"]
                                                            );
                                                        }}
                                                    />
                                                ) : (
                                                    <AiOutlineEdit
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setEditInfo(user);
                                                            setUser(user);
                                                        }}
                                                    />
                                                )}
                                                <FiTrash
                                                    onClick={() =>
                                                        setModal({
                                                            name: `${user.firstName} ${user.lastName}`,
                                                            id: user.id,
                                                            type: "users",
                                                        })
                                                    }
                                                />
                                            </div>
                                        )}
                                        {editInfo === user &&
                                        user?.id !==
                                            TokenService.getUser()?.id ? (
                                            <>
                                                <div
                                                    className={classes.editDiv}
                                                >
                                                    <label
                                                        className={
                                                            classes.deployContainer
                                                        }
                                                        htmlFor="isDeployed"
                                                    >
                                                        <FormattedMessage id="deploy.cta" />
                                                        <CustomCheckbox
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e.target
                                                                        .checked,
                                                                    "synchronizable"
                                                                )
                                                            }
                                                            name="isDeployed"
                                                            id="isDeployed"
                                                            type="checkbox"
                                                            defaultChecked={
                                                                user.synchronizable
                                                            }
                                                        />
                                                    </label>
                                                    <select value={selectedRole} onChange={handleRoleChange}>
                                                        {roles.map((role, index) => (
                                                            <option key={index} value={role.value}>
                                                                {role.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <Input
                                                        type="text"
                                                        placeholder={intl.formatMessage(
                                                            { id: "email" }
                                                        )}
                                                        defaultValue={
                                                            user.email
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e.target.value,
                                                                "email"
                                                            )
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            classes.inputsContainer
                                                        }
                                                    >   
                                                        <Input
                                                            type="text"
                                                            placeholder={intl.formatMessage(
                                                                {
                                                                    id: "position",
                                                                }
                                                            )}
                                                            defaultValue={
                                                                user.position
                                                            }
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e.target
                                                                        .value,
                                                                    "position"
                                                                )
                                                            }
                                                        />
                                                        <Input
                                                            type="tel"
                                                            placeholder={intl.formatMessage(
                                                                { id: "mobile" }
                                                            )}
                                                            defaultValue={
                                                                user.phone
                                                            }
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e.target
                                                                        .value,
                                                                    "phone"
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <Input
                                                        type="text"
                                                        placeholder={intl.formatMessage(
                                                            { id: "url_agenda" }
                                                        )}
                                                        defaultValue={
                                                            user.urlAgenda
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e.target.value,
                                                                "urlAgenda"
                                                            )
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            classes.profilePictureContainer
                                                        }
                                                    >
                                                        {preview && (
                                                            <img
                                                                alt={`${user.firstName} ${user.lastName}`}
                                                                className={
                                                                    classes.logoPreview
                                                                }
                                                                src={preview}
                                                            />
                                                        )}
                                                        <UploadFile
                                                            file={uploadedMedia}
                                                            setFile={(e) => {
                                                                handleUploadImage(
                                                                    e
                                                                );
                                                            }}
                                                            removeFile={() => {
                                                                setUploadedMedia(
                                                                    null
                                                                );
                                                                setPreview(
                                                                    null
                                                                );
                                                            }}
                                                            placeholder={
                                                                <FormattedMessage
                                                                    id={
                                                                        preview
                                                                            ? "buttons.placeholder.import.replace_profile_picture"
                                                                            : "buttons.placeholder.import.profile_picture"
                                                                    }
                                                                />
                                                            }
                                                            style={{
                                                                paddingTop:
                                                                    ".8rem",
                                                                paddingBottom:
                                                                    ".8rem",
                                                            }}
                                                            type="image/*"
                                                        />
                                                    </div>
                                                    <Input
                                                        type="text"
                                                        placeholder={intl.formatMessage(
                                                            {
                                                                id: "buttons.placeholder.import.profile_picture_link",
                                                            }
                                                        )}
                                                        defaultValue={
                                                            user.linkPicture
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e.target.value,
                                                                "linkPicture"
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <Popup
                                                    open={open}
                                                    image={preview}
                                                    handleClose={() =>
                                                        setOpen(false)
                                                    }
                                                    getCroppedFile={
                                                        handleCroppedImage
                                                    }
                                                    aspectRatios={["1:1"]}
                                                />
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </li>
                                );
                        })
                    )}
                </form>
            </ul>
        </div>
    );
}

export default ListUsers;
