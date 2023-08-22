import classes from "./SignaturePreviewContainer.module.css";
import { useEffect, useState } from "react";
import { Loading } from "components";
import { SignatureBuildPreview } from "./SignatureBuildPreview";

const SignaturePreviewContainer = ({ templateId, templateStyles }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <aside className={classes.container}>
            <section>
                <div className={classes.browserHeader}>
                    <ul className={classes.btnsContainer}>
                        <li className={classes.close}></li>
                        <li className={classes.reduce}></li>
                        <li className={classes.fullscreen}></li>
                    </ul>
                </div>
                <div className={classes.lazyLoadingLong}></div>
                <div className={classes.lazyLoadingShort}></div>
                <div className={classes.lazyLoadingMedium}></div>
                <br />
                {loading ? (
                    <Loading />
                ) : (
                    <div className={classes.signaturePreview}>
                        <SignatureBuildPreview
                            id={templateId}
                            styles={templateStyles}
                        />
                    </div>
                )}
            </section>
        </aside>
    );
};
export default SignaturePreviewContainer;
