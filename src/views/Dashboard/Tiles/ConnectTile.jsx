import { Tile } from "./Tile";
import { FcGoogle } from "react-icons/fc";
import { MdCloudSync } from "react-icons/md";
import Outlook from "assets/icons/outlook.svg";
import { request, TokenService, useNotification } from "utils";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, CustomCheckbox } from "components";
import classes from "./tiles.module.css";

export const ConnectTile = ({ organisation }) => {
    const [connectionStatus, setConnectionStatus] = useState(null);
    const [importStatus, setImportStatus] = useState(null);
    const user = TokenService.getUser();
    const intl = useIntl();

    const importUsersGoogle = async () => {
        setImportStatus(<FormattedMessage id="import.pending" />);
        await request
            .get("/google/importusers")
            .catch(() => {
                setImportStatus(<FormattedMessage id="import.failed" />);
            })
            .then(({ data }) => {
                switch (data.error) {
                    case false:
                        setImportStatus(<FormattedMessage id="import.success" />);
                        break;
                    case true: {
                        setImportStatus(<FormattedMessage id="import.failed" />);
                        break;
                    }
                    default:
                        break;
                }
            });
    };
    const fetchGoogleStatus = async () => {
        await request
            .get(`/connect/google/checkConnection`)
            .catch(() => {
                setConnectionStatus(<FormattedMessage id="google.connection.none" />);
            })
            .then(({ data }) => {
                switch (data.error) {
                    case false:
                        setConnectionStatus(<FormattedMessage id="google.connection.connected" />);
                        break;
                    case true: {
                        setConnectionStatus(<FormattedMessage id="google.connection.none" />);
                        break;
                    }
                    default:
                        break;
                }
            });
    };
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(organisation?.enableAzureSync || false);
    const notification = useNotification();
    const handleCheckboxChange = async (e) => {
        const checked = e.target.checked;
        setIsCheckboxChecked(checked);

        try {
            await request.get(`/organisation/token/${user?.signallyToken}/azure/sync`).then(({ data }) => {
                if (data.status === false)
                    notification({
                        content: (
                            <FormattedMessage id="message.success.auto_sync_inactive" />
                        ),
                        status: "valid",
                    })
                else
                    notification({
                        content: (
                            <FormattedMessage id="message.success.auto_sync_active" />
                        ),
                        status: "valid",
                    })
            });
            
        } catch (error) {
            notification({
                content: (
                    <FormattedMessage id="message.error.auto_sync" />
                ),
                status: "invalid",
            })
        }
    };


    const importUsersAzure = async () => {
        const windowFeatures = "left=100,top=100,width=600,height=600";

        window.open(`https://login.microsoftonline.com/${organisation?.tenantId}/oauth2/v2.0/authorize?client_id=${process.env.REACT_APP_AZURE_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_API_URL}/azure/importusers&state=${user.signallyToken}&response_mode=query&scope=User.Read.All`, "mozillaWindow", windowFeatures);
    };

    if (organisation?.google === true) {
        !connectionStatus && fetchGoogleStatus();
        return (<Tile
                link={"#"}
                title={<>
                    <FcGoogle /> Gmail <span></span>
                    {importStatus || (<button
                            style={{
                                cursor: "pointer", border: "none", background: "none"
                            }}
                            title={intl.formatMessage({
                                id: "import.title"
                            })}
                            onClick={importUsersGoogle}
                        >
                            <MdCloudSync
                                style={{ verticalAlign: "bottom" }}
                                fontSize={"1.5rem"}
                            />
                        </button>)}
                </>}
                leftCorner={connectionStatus ? (<span>{connectionStatus}</span>) : (<span
                        style={{ cursor: "pointer" }}
                        onClick={fetchGoogleStatus}
                    >
                            <FormattedMessage id="google.connection.check" />
                        </span>)}
            />);
    }

    if (organisation?.office365 === true) return (<Tile
            title={<><div className={classes.deployTileTitle}>
                <div className={classes.outlookContainer}>
                    <img alt="Microsoft Outlook" src={Outlook} />
                </div>
                {importStatus || (<Button
                        color="primaryLink"
                        title={intl.formatMessage({
                            id: "import.title"
                        })}
                        onClick={importUsersAzure}
                    >
                        <FormattedMessage id="office.sync_now" />
                        <MdCloudSync
                            style={{ verticalAlign: "bottom" }}
                            fontSize={"1.5rem"}
                        />
                    </Button>)}
            </div>
                </>
    } leftCorner={<div className={classes.autoSyncContainer}>
        <CustomCheckbox checked={isCheckboxChecked} id="autoDeploy" onChange={handleCheckboxChange} />
        <label htmlFor="autoDeploy">
            <FormattedMessage id="office.sync_auto" />
        </label>
    </div>}
        />);
    return (<Tile
            link={"#"}
            title={<FormattedMessage id="office.connection.none" />}
            leftCorner={<>
                <a
                    style={{ marginRight: "1rem" }}
                    target="_blank"
                    rel="noreferrer"
                    href={`${process.env.REACT_APP_API_URL}/google/downloadapp`}
                >
                    <FcGoogle />
                </a>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${process.env.REACT_APP_API_URL}/azure/downloadapp`}
                >
                    <img
                        style={{ width: "35px" }}
                        alt="Microsoft Outlook"
                        src={Outlook}
                    />
                </a>
            </>}
        />);
};
