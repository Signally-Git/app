import Button from 'Utils/Button/btn'
import classes from './CopySignature.module.css'
import parse from 'html-react-parser'
import React from 'react';
import { useParams } from 'react-router-dom';
import request from 'Utils/Request/request';
const { ClipboardItem } = window;

export default function CopySignature() {
    const [btnText, setBtnText] = React.useState('Copier')
    const [signature, setSignature] = React.useState('')
    const { token } = useParams()

    React.useEffect(() => {
        async function getSignature() {
            await request.get(`/connect/token/check?token=${token}`).then((res) => setSignature(res.compiledSignature))
        }
        getSignature()
    }, [])

    const handleCopy = async (e) => {
        e.preventDefault()
        var type = "text/html";
        var blob = new Blob([signature], { type });
        var data = [new ClipboardItem({ [type]: blob })];
    
        navigator.clipboard.write(data).then(
            function () {
            /* success */
            setBtnText('Signature copiée')
            setTimeout(() => {
                setBtnText("Copier")
            }, 2000);
            },
            function () {
            /* failure */
            }
        );
    }
    
    return (<>
        <div className={classes.container}>
            {signature?.length > 0 && parse(signature)}
            <Button onClick={(e) => handleCopy(e)} disabled={btnText === 'Signature copiée'} color={btnText === 'Signature copiée' ? "orangeFill" : "orange"}>{btnText}</Button>
        </div>
    </>)
}