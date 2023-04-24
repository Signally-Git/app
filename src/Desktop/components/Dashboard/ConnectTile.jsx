import { Tile } from "./Tile";
import { FcGoogle } from "react-icons/fc";
import Outlook from "../../../Assets/icons/outlook.svg";
import request from "../../../Utils/Request/request";
import { useState } from "react";

export const ConnectTile = ({ organisation }) => {
    const [connectionStatus, setConnectionStatus] = useState(null);
    const [importStatus, setImportStatus] = useState(null)
    
    const importUsers = async () => {
        setImportStatus("Import en cours")
        await request.get('/google/importusers').catch(() => {
            setImportStatus("Echec de l'import");
        })
            .then(({ data }) => {
                switch (data.error) {
                    case false:
                        setImportStatus("Importé");
                        break;
                    case true: {
                        setImportStatus("Echec de l'import");
                        break;
                    }
                    default: break
                }
            });
    }
    const fetchGoogleStatus = async () => {
        await request
            .get(`/connect/google/checkConnection`)
            .catch(() => {
                setConnectionStatus("Non connecté");
            })
            .then(({ data }) => {
                switch (data.error) {
                    case false:
                        setConnectionStatus("Connecté");
                        break;
                    case true: {
                        setConnectionStatus("Non connecté");
                        break;
                    }
                    default: break
                }
            });
    };

    if (organisation?.google === true) {
        return (
            <Tile
                link={"#"}
                title={
                    <>
                        <FcGoogle /> Gmail <span></span>
                        {importStatus || <button onClick={importUsers}>Import</button>}
                    </>
                }
                leftCorner={
                    connectionStatus ? (
                        <span>{connectionStatus}</span>
                    ) : (
                        <span style={{cursor: 'pointer'}} onClick={fetchGoogleStatus}>
                            Vérifier connexion
                        </span>
                    )
                }
            />
        );
    }

    if (organisation?.office365 === true)
        return (
            <Tile
                link={"#"}
                title={
                    <>
                        <img alt="Microsoft Outlook" src={Outlook} /> Outlook{" "}
                        <span></span>
                    </>
                }
                leftCorner={<span>Déployé</span>}
            />
        );
    return (
        <Tile
            link={"#"}
            title={<>Non connecté</>}
            leftCorner={
                <>
                    <a
                        style={{ marginRight: "1rem" }}
                        target="_blank"
                        href={`${process.env.REACT_APP_API_URL}/google/downloadapp`}
                    >
                        <FcGoogle />
                    </a>
                    <a
                        target="_blank"
                        href={`${process.env.REACT_APP_API_URL}/azure/downloadapp`}
                    >
                        <img
                            style={{ width: "35px" }}
                            alt="Microsoft Outlook"
                            src={Outlook}
                        />
                    </a>
                </>
            }
        />
    );
};
