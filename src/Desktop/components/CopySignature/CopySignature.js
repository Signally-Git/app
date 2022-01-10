import Button from 'Utils/Button/btn'
import classes from './CopySignature.module.css'
import parse from 'html-react-parser'
const { ClipboardItem } = window;

export default function CopySignature({ signature }) {
    const handleCopy = async (e) => {
        e.preventDefault()
        var type = "text/html";
        var blob = new Blob([signature], { type });
        var data = [new ClipboardItem({ [type]: blob })];
    
        navigator.clipboard.write(data).then(
            function () {
            /* success */
            },
            function () {
            /* failure */
            }
        );
    }
    
    return (<>
        <div className={classes.container}>
            {parse(signature)}
            <Button onClick={(e) => handleCopy(e)} color="orange">Copier la signature</Button>
        </div>
    </>)
}