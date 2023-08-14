import { Templates } from "./Templates/Templates";
import { Details } from "./Details/Details";

const Custom = ({ tab }) => {
    if (tab === "Templates") return <Templates />;
    if (tab === "Details") return <Details />;
    return <></>;
};

export default Custom;
