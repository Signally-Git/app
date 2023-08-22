import { AiOutlineLoading3Quarters } from "react-icons/ai";
import classes from "./loading.module.css";

const Loading = () => {
    return (
        <div className={classes.loading}>
            <AiOutlineLoading3Quarters />
        </div>
    );
};

export default Loading;
