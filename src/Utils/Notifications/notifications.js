import { ImCheckmark, ImCross } from 'react-icons/im'
import classes from './notifications.module.css'
import * as React from 'react'

const NotificationContext = React.createContext()

function NotificationProvider({ children }) {
    const [message, setMessage] = React.useState()

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage((a) => ({ ...a, disappear: true }));
        }, 5500);

        return () => clearTimeout(timeout);
    }, [message])

    return <NotificationContext.Provider value={setMessage}>
        {message && <div className={`${classes[message.status]} ${classes.container} ${message.disappear ? classes.fadeOut : ""}`}>
            <p>{message.content}</p>
            {message.status === "valid" ?
                <ImCheckmark /> :
                <ImCross />}
        </div>}{children}</NotificationContext.Provider>
}

function useNotification() {
    const context = React.useContext(NotificationContext)
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
}

export { NotificationProvider, useNotification }