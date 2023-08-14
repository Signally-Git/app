import classes from "./SignaturePreview.module.css";
import { useEffect, useState } from "react";
import { Loading } from "components";

const SignaturePreview = () => {
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
                    <div className={classes.signaturePreview}></div>
                )}
            </section>
        </aside>
    );
};
export default SignaturePreview;
