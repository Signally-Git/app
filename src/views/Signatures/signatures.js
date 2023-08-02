import classes from "./signatures.module.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Button, Modal } from "components";
import parse from "html-react-parser";
import { TokenService, useNotification, request } from "utils";
import { FormattedMessage, useIntl } from "react-intl";
import { SignatureItem } from "./list/SignatureItem";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Signatures() {
    const [templates, setTemplates] = useState([]);
    const notification = useNotification();
    const [deleted, setDeleted] = useState(false);
    const [selected, setSelected] = useState(null);
    const user = TokenService.getUser();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(null);
    const [preview, setPreview] = useState("");
    const [search, setSearch] = useState("");

    const intl = useIntl();

    const history = useHistory();

    const getData = async () => {
        setLoading(true);
        try {
            const organisationSignatures =
                TokenService.getOrganisation().signatures;

            let signatures = [];
            if (organisationSignatures && organisationSignatures.length > 0) {
                signatures = organisationSignatures;
            } else {
                const response = await request.get("signatures");
                signatures = response.data["hydra:member"];

                if (signatures.length === 0) {
                    history.push("/create-signature");
                    return;
                }
            }

            const signaturePromises = signatures.map((signature) =>
                request.get(signature["@id"])
            );
            const signatureResponses = await Promise.all(signaturePromises);

            const signatureData = signatureResponses.map(
                (response) => response.data
            );
            setTemplates(signatureData);
        } catch (error) {
            notification({
                content: <FormattedMessage id="message.error.generic" />,
                status: "invalid",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [deleted]);

    useEffect(() => {
        console.log(preview);
    }, [preview]);

    const handleModal = (id) => {
        setModal(
            <Modal
                title={
                    <span>
                        <FormattedMessage id="message.warning.delete" /> <br />
                        <span>{preview.name}</span>
                    </span>
                }
                content={``}
                cancel={<FormattedMessage id="buttons.placeholder.cancel" />}
                validate={<FormattedMessage id="buttons.placeholder.delete" />}
                onCancel={() => setModal(null)}
                onConfirm={() => handleDelete(id)}
            />
        );
    };

    const handleDelete = async (id) => {
        await request
            .delete(`signatures/${id}`)
            .then(() => {
                notification({
                    content: (
                        <FormattedMessage id="message.success.signature.delete" />
                    ),
                    status: "valid",
                });
                setPreview([]);
                setDeleted(id);
            })
            .catch(() =>
                notification({
                    content: (
                        <>
                            <FormattedMessage id="message.error.delete" />
                            <span className={classes.primaryColor}>
                                {" "}
                                {preview.name}
                            </span>
                        </>
                    ),
                    status: "invalid",
                })
            );
        setModal(null);
    };

    return (
        <div>
            <div className={classes.container}>
                <FormattedMessage tagName="h1" id="signatures" />
                <div className={classes.row}>
                    {modal && (
                        <div className={classes.modalContainer}>{modal}</div>
                    )}
                    <div className={classes.teamsContainer}>
                        <div>
                            {user?.roles.includes("ROLE_RH") && (
                                <Link to="create-signature">
                                    <Button color="primary" arrow={true}>
                                        <FormattedMessage id="add_signature" />
                                    </Button>
                                </Link>
                            )}
                            <div className={classes.searchInput}>
                                <HiOutlineSearch />
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={classes.search}
                                    type="text"
                                    placeholder={intl.formatMessage({
                                        id: "search_signature",
                                    })}
                                />
                            </div>
                            <span>
                                <FormattedMessage
                                    id="signature.number"
                                    values={{ count: templates.length }}
                                />
                            </span>
                            {loading && (
                                <div className={classes.loading}>
                                    <AiOutlineLoading3Quarters />
                                </div>
                            )}
                            <ul className={classes.itemsList}>
                                {templates.map((signature) => (
                                    <SignatureItem
                                        key={signature.id}
                                        search={search}
                                        signature={signature}
                                        isSelected={selected === signature}
                                        onPreview={() => {
                                            setSelected(signature);
                                            request
                                                .get(
                                                    `/compile_for_listing_signature/${signature.id}`
                                                )
                                                .then(({ data }) => {
                                                    setPreview(data);
                                                });
                                        }}
                                        onDelete={handleModal}
                                        onEdit={() => {
                                            setSelected(signature);
                                            request
                                                .get(
                                                    `/compile_for_listing_signature/${signature.id}`
                                                )
                                                .then(({ data }) =>
                                                    setPreview(data)
                                                );
                                        }}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    {preview && (
                        <div className={classes.signaturePreview}>
                            <ul>
                                <li>
                                    <h5>
                                        <FormattedMessage id="signature.title" />{" "}
                                        <span className={classes.primaryTxt}>
                                            {preview?.name}
                                        </span>
                                    </h5>
                                    {parse(preview)}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signatures;
