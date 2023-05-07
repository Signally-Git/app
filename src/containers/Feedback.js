import { useEffect, useState } from "react";
import Input from "Utils/Input/input";
import UploadFile from "Utils/Upload/uploadFile";
import classes from "components/Report/report.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Noting from "Assets/img/noting.png";
import request from "Utils/Request/request";
import { useNotification } from "Utils/Notifications/notifications";
import CustomSelect from "Utils/CustomSelect/customselect";
import Buttons from "Utils/Btns/buttons";
import { FormattedMessage } from "react-intl";

export default function Report() {
    const [file, setFile] = useState();
    const [bug, setBug] = useState("");
    const history = useHistory();
    const [select, setSelect] = useState("SIGNALLY_APP");
    const table = [
        { key: "SIGNALLY_APP", name: "Problème rencontré sur l'application" },
        {
            key: "OUTLOOK_DISPLAY",
            name: "Affichage de la signature dans Outlook",
        },
        { key: "COMMENTS", name: "Commentaire" },
        { key: "RECOMMENDATIONS", name: "Suggestion" },
    ];
    const notification = useNotification();

    const handleSubmit = async (e) => {
        let req = {};
        e.preventDefault();
        const img = new FormData();
        if (file) {
            img.append("file", file, { type: file.type });
            await request
                .post(`import/file`, img, {
                    headers: { "Content-Type": file.type },
                })
                .then((res) => {
                    req = { fileUrl: res.data.path };
                    console.log(res.data.headers["Content-Type"]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        if (bug.length > 3) {
            req = {
                ...req,
                subject: select,
                description: bug,
            };
            const feedback = await request.post("feedback", req).catch(() =>
                notification({
                    content: <FormattedMessage id="message.error.report" />,
                    status: "invalid",
                })
            );
            if (feedback?.data) {
                notification({
                    content: <FormattedMessage id="message.success.report" />,
                    status: "valid",
                });
                history.goBack();
            }
        } else {
            notification({
                content: <FormattedMessage id="message.warning.report" />,
                status: "invalid",
            });
        }
    };

    useEffect(() => {
        // console.log(select);
    }, [select]);

    return (
        <>
            <h1>
                <FormattedMessage id="feedback.title" />
            </h1>
            <div className={classes.row}>
                <div className={classes.container}>
                    <div className={classes.tagLine}>
                        <h3>
                            <FormattedMessage id="feedback.tagline" />
                        </h3>
                        <p>
                            <FormattedMessage id="feedback.text1" />
                            <br />
                            <br />
                            <FormattedMessage id="feedback.text2" />
                            <br />
                            <FormattedMessage id="feedback.formHeader" />
                            <br />
                            <br />
                            <FormattedMessage id="feedback.formDescription" />
                            <br />
                            <br />
                            <FormattedMessage id="feedback.thanks" />
                        </p>
                        <br />
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h4>
                            <FormattedMessage id="feedback.formHeader" />
                        </h4>
                        <CustomSelect
                            onChange={(e) => setSelect(e)}
                            display="name"
                            getValue="key"
                            items={table}
                            defaultValue={table[0].key}
                            placeholder={
                                <FormattedMessage id="feedback.selectPlaceholder" />
                            }
                        />
                        <br />
                        <h4>
                            {
                                table.filter((entry) => entry.key === select)[0]
                                    .name
                            }
                        </h4>
                        <Input
                            placeholder={
                                table.filter((entry) => entry.key === select)[0]
                                    .key === "SIGNALLY_APP" ? (
                                    <FormattedMessage id="feedback.bugPlaceholder" />
                                ) : (
                                    ""
                                )
                            }
                            style={{
                                height: "4.5rem",
                                resize: "none",
                                width: "100%",
                                marginBottom: "1.5rem",
                            }}
                            onChange={(e) => setBug(e.target.value)}
                            type="textarea"
                        />
                        <br />
                        <h4>
                            <FormattedMessage id="feedback.attachmentHeader" />
                        </h4>
                        <UploadFile
                            file={file}
                            setFile={setFile}
                            placeholder={
                                <FormattedMessage id="feedback.attachmentPlaceholder" />
                            }
                        />
                        <Buttons
                            onConfirm={() => {}}
                            confirmTxt={
                                <FormattedMessage id="feedback.submitButton" />
                            }
                            onCancel={(e) => {
                                e.preventDefault();
                                history.goBack();
                            }}
                        />
                    </form>
                </div>
                <img alt="Send your feedback" src={Noting} />
            </div>
        </>
    );
}
