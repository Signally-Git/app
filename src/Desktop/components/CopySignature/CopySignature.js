import Button from 'Utils/Button/btn'
import classes from './CopySignature.module.css'
import parse from 'html-react-parser'
import React from 'react';
const { ClipboardItem } = window;

export default function CopySignature({ signature }) {
    const [btnText, setBtnText] = React.useState('Copier la signature')

    const handleCopy = async (e) => {
        e.preventDefault()
        var type = "text/html";
        var blob = new Blob([signature], { type });
        var data = [new ClipboardItem({ [type]: blob })];
    
        navigator.clipboard.write(data).then(
            function () {
            /* success */
            setBtnText('Copié !')
            },
            function () {
            /* failure */
            }
        );
    }
    
    return (<>
        <div className={classes.container}>
            {signature?.length > 0 && parse(signature)}
            <Button onClick={(e) => handleCopy(e)} color="orange">{btnText}</Button>
        </div>
    </>)
}