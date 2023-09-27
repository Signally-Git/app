import classes from "./signatures.module.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Button, Loading, Modal } from "components";
import parse from "html-react-parser";
import { TokenService, useNotification, request } from "utils";
import { FormattedMessage, useIntl } from "react-intl";
import { SignatureItem } from "./list/SignatureItem";

function Signatures() {
    const [templates, setTemplates] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(null);
    const [preview, setPreview] = useState("");
    const [search, setSearch] = useState("");
    const history = useHistory();
    const intl = useIntl();
    const notification = useNotification();
    const user = TokenService.getUser();

    const fetchData = async () => {
        setLoading(true);
        try {
            let signatures = TokenService.getOrganisation().signatures || [];
            const response = await request.get("signatures");
            signatures = response.data["hydra:member"];
            if (!signatures.length) {
                history.push("/create-signature");
                return;
            }

            const signatureData = await Promise.all(
                signatures.map(fetchSignature)
            );
            setTemplates(signatureData.filter(Boolean));
        } catch (error) {
            notifyError();
        } finally {
            setLoading(false);
        }
    };

    const fetchSignature = async (signature) => {
        try {
            const response = await request.get(signature["@id"]);
            return response.data;
        } catch (error) {
            return null;
        }
    };

    const notifyError = () => {
        notification({
            content: <FormattedMessage id="message.error.generic" />,
            status: "invalid",
        });
    };

    useEffect(() => {
        fetchData();
    }, [deleted]);

    const handleModal = (id) => {
        setModal(
            <Modal
                title={
                    <span>
                        <FormattedMessage id="message.warning.delete" /> <br />
                        <span>{preview.name}</span>
                    </span>
                }
                cancel={<FormattedMessage id="buttons.placeholder.cancel" />}
                validate={<FormattedMessage id="buttons.placeholder.delete" />}
                onCancel={() => setModal(null)}
                onConfirm={() => handleDelete(id)}
            />
        );
    };

    const handleDelete = async (id) => {
        try {
            await request.delete(`signatures/${id}`);
            notification({
                content: (
                    <FormattedMessage id="message.success.signature.delete" />
                ),
                status: "valid",
            });
            setPreview("");
            setDeleted(id);
        } catch {
            notifyError();
        } finally {
            setModal(null);
        }
    };

    return (
        <div>
            <div className={classes.container}>
                <FormattedMessage tagName="h1" id="signatures" />
                <div className={classes.row}>
                    <div className={classes.teamsContainer}>
                        {modal && modal}
                        <div>
                            {!user?.roles.includes("ROLE_RH") && (
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
                            {loading ? (
                                <Loading />
                            ) : (
                                <ul className={classes.itemsList}>
                                    {templates.map((signature) => (
                                        <SignatureItem
                                            key={signature.id}
                                            search={search}
                                            signature={signature}
                                            isSelected={selected === signature}
                                            onPreview={() =>
                                                handlePreview(signature)
                                            }
                                            onDelete={handleModal}
                                            onEdit={() => handleEdit(signature)}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    {preview && (
                        <div className={classes.signaturePreview}>
                            <ul>
                                <li>
                                    <h5>
                                        <FormattedMessage id="signature.title" />
                                        <span className={classes.primaryTxt}>
                                            {" "}
                                            {preview?.name}
                                        </span>
                                    </h5>
                                    {parse(preview?.html || "")}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    function handlePreview(signature) {
        setSelected(signature);
        request
            .get(`/compile_for_listing_signature/${signature.id}`)
            .then(({ data }) => setPreview({ ...signature, html: data }))
            .catch(notifyError);
    }

    function handleEdit(signature) {
        setSelected(signature);
        request
            .get(`/compile_for_listing_signature/${signature.id}`)
            .then(({ data }) => setPreview({ ...signature, html: data }))
            .catch(notifyError);
    }
}

export default Signatures;
