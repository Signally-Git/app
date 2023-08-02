import { useHistory } from "react-router-dom";
import { TokenService } from "utils";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import classes from "./SignatureItem.module.css";
import { Fragment } from "react";

const ROLE_RH = "ROLE_RH";
const EDIT_SIGNATURE_PATH = "/edit-signature/";

export function SignatureItem({
    signature,
    key,
    search,
    isSelected,
    onPreview,
    onDelete,
}) {
    const history = useHistory();
    const user = TokenService.getUser();

    const handleEdit = () => {
        if (user?.roles[1] !== ROLE_RH) {
            history.push(EDIT_SIGNATURE_PATH + signature.id);
        }
    };

    const handleMouseEnter = () => {
        onPreview(signature["@id"]);
    };

    const isSearchMatch =
        !search || signature?.name.toLowerCase().includes(search.toLowerCase());

    if (isSearchMatch) {
        return (
            <li
                onMouseEnter={handleMouseEnter}
                key={key}
                className={isSelected ? classes.selected : ""}
            >
                <span onClick={handleEdit}>{signature.name}</span>
                {user?.roles[1] !== ROLE_RH && (
                    <div className={classes.actionsContainer}>
                        <AiOutlineEdit onClick={handleEdit} />
                        <FiTrash onClick={() => onDelete(signature.id)} />
                    </div>
                )}
            </li>
        );
    }

    return <Fragment key={key}></Fragment>;
}
