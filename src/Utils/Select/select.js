import classes from "./select.module.css";

export default function Select({ onChange, onSubmit, items, defaultValue }) {
    return (
        <form onChange={(e) => onChange(e)} onSubmit={(e) => onSubmit(e)}>
            <select className={classes.select}>
                {items.map((item) => {
                    return (
                        <option
                            value={item["@id"]}
                            key={item.id}
                            selected={
                                defaultValue === item["@id"] ? "selected" : ""
                            }
                        >
                            {item.name}
                        </option>
                    );
                })}
            </select>
        </form>
    );
}
