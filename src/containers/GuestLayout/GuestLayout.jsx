import { Header, Footer } from "components";

export const GuestLayout = ({ children, ...rest }) => {
    return (
        <>
            <Header {...rest} />
            {children}
            <Footer />
        </>
    );
};
