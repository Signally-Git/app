import { BsUpload } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import classes from "./uploadFile.module.css";

export default function UploadFile({
    file,
    setFile,
    type,
    placeholder,
    ...props
}) {
    return (
        <div className={classes.container} {...props}>
            {file?.name?.length > 0 ? (
                <div className={classes.uploadedFile}>
                    <span>{file.name}</span>{" "}
                    <IoMdClose onClick={() => setFile()} />
                </div>
            ) : (
                <>
                    <input
                        accept={type}
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <span>
                        <BsUpload />
                        {placeholder}
                    </span>
                </>
            )}
        </div>
    );
}
