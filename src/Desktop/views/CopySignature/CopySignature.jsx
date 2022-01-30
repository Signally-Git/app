import CopySignatureComponent from 'Desktop/components/CopySignature/CopySignature';
import classes from './CopySignature.module.css'
import Logo from 'Utils/Logo/logo';

const signature = `<table class="MsoNormalTable" style="caret-color:rgb(0, 0, 0);font-family:Helvetica;orphans:auto;widows:auto;border-collapse:collapse"><tbody><tr style="height:81pt"><td width="380" valign="top" style="width:285pt;padding:0cm;height:81pt"><table class="MsoNormalTable" style="border-collapse:collapse"><tbody><tr><td width="108" valign="top" style="width:81pt;padding:0cm 6pt 0cm 0cm"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:8.5pt;font-family:Helvetica"><img width="108" height="108" src="https://api.staging.signally.io/images/Mama-EggLogo-700-61e7e8ba0ddd9.png" alt="Mama Shelter Head Office" style="width:1.125in;height:1.125in"><o:p></o:p></span></p></td><td style="padding:0cm"><table class="MsoNormalTable" style="border-collapse:collapse"><tbody><tr style="height:70.5pt"><td width="12" style="width:9pt;background-color:rgb(252, 231, 80);padding:0cm;height:70.5pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-family:Helvetica;color:black"><img src="https://api.staging.signally.io/images/yellow-left-61d32efd2cec8.png"></span><span style="font-family:Helvetica"><o:p></o:p></span></p></td><td width="272" style="width:204pt;background-color:rgb(252, 231, 80);padding:0cm;height:70.5pt"><table class="MsoNormalTable" style="border-collapse:collapse"><tbody><tr style="height:0.75pt"><td style="padding:0cm;height:0.75pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><b><span style="font-size:8.5pt;font-family:Helvetica;color:black">Signally</span></b><span style="font-size:8pt;font-family:Helvetica"><span class="Apple-converted-space">&nbsp;</span></span><b><span style="font-size:8.5pt;font-family:Helvetica;color:black">Mail</span></b><span style="font-size:8pt;font-family:Helvetica"><o:p></o:p></span></p></td></tr><tr style="height:0.75pt"><td style="padding:0cm;height:0.75pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><span lang="EN-US" style="font-size:8.5pt;font-family:Helvetica;color:black">The future of Email Signatures</span><span lang="EN-US" style="font-size:8pt;font-family:Helvetica"><o:p></o:p></span></p></td></tr><tr style="height:3.75pt"><td style="padding:0cm;height:3.75pt"></td></tr><tr><td style="padding:0cm"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><b><span style="font-size:8.5pt;font-family:Helvetica;color:black">Mama Shelter Head Office</span></b><span style="font-size:8pt;font-family:Helvetica"><o:p></o:p></span></p></td></tr><tr><td style="padding:0cm"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:8.5pt;font-family:Helvetica;color:black">82 rue Henri Farman</span><span style="font-size:8pt;font-family:Helvetica"><o:p></o:p></span></p></td></tr><tr><td style="padding:0cm"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-size:8.5pt;font-family:Helvetica;color:black">92445 Issy-les-Moulineaux France</span><span style="font-size:8pt;font-family:Helvetica"><o:p></o:p></span></p></td></tr><tr><td style="padding:0cm"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><b><span style="font-size:8.5pt;font-family:Helvetica">T</span></b><span style="font-size:8pt;font-family:Helvetica"><span class="Apple-converted-space">&nbsp;</span></span><span style="font-size:8.5pt;font-family:Helvetica;color:black">+33 6 09 58 37 31</span><span style="font-size:8pt;font-family:Helvetica"><o:p></o:p></span></p></td></tr></tbody></table></td><td width="12" style="width:9pt;background-color:rgb(252, 231, 80);padding:0cm;height:70.5pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-family:Helvetica;color:black"><img src="https://api.staging.signally.io/images/yellow-right-61d32f319d093.png"></span><span style="font-family:Helvetica"><o:p></o:p></span></p></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="padding:9pt 0cm"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-family:Helvetica"><img width="380" height="126" src="https://api.staging.signally.io/images/Mama-E-Shop-61c2d55892aa7.gif" alt="Event" style="width:3.9583in;height:1.3125in"><o:p></o:p></span></p></td></tr><tr><td width="380" style="width:285pt;padding:0cm"><table class="MsoNormalTable" style="border-collapse:collapse"><tbody><tr><td style="background-color:black;padding:0cm"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-family:Helvetica;color:white"><img height="49" src="https://api.staging.signally.io/images/black-left-61d32b6ec2709.png" style="height:0.5104in"></span><span style="font-family:Helvetica"><o:p></o:p></span></p></td><td style="background-color:black;padding:0cm"><table class="MsoNormalTable" style="border-collapse:collapse"><tbody><tr><td width="360" style="width:270pt;background-color:black;padding:0cm"><table class="MsoNormalTable" style="border-collapse:collapse"><tbody><tr style="height:18pt"><td width="65" style="width:48.75pt;background-color:black;padding:0cm;height:18pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif;vertical-align:middle"><b><span style="font-size:9pt;font-family:Helvetica;color:white">Follow us</span></b><span style="font-size:9.5pt;font-family:Helvetica"><o:p></o:p></span></p></td><td width="230" style="width:172.5pt;background-color:black;padding:0cm;height:18pt"><table class="MsoNormalTable" style="border-collapse:collapse"><tbody><tr style="height:18pt"><td width="24" valign="top" style="width:18pt;padding:0cm 1.5pt;height:18pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><a href="https://www.facebook.com/MamaShelterOfficial/"><span style="font-family:Helvetica;color:blue"><img width="24" height="24" src="https://api.staging.signally.io/images/iconmonstr-facebook-4-48-1-61cc73165961b.png" style="width:0.25in;height:0.25in"></span></a><span style="font-family:Helvetica"><o:p></o:p></span></p></td><td width="24" valign="top" style="width:18pt;padding:0cm 1.5pt;height:18pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><a href="https://www.linkedin.com/company/mama-shelter"><span style="font-family:Helvetica;color:blue"><img width="24" height="24" src="https://api.staging.signally.io/images/iconmonstr-linkedin-4-48-61cc7336e67e8.png" style="width:0.25in;height:0.25in"></span></a><span style="font-family:Helvetica"><o:p></o:p></span></p></td><td width="24" valign="top" style="width:18pt;padding:0cm 1.5pt;height:18pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><a href="https://twitter.com/mama_shelter/"><span style="font-family:Helvetica;color:blue"><img width="24" height="24" src="https://api.staging.signally.io/images/iconmonstr-twitter-4-48-61cc7355e7d05.png" style="width:0.25in;height:0.25in"></span></a><span style="font-family:Helvetica"><o:p></o:p></span></p></td><td width="24" valign="top" style="width:18pt;padding:0cm 1.5pt;height:18pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><a href="https://www.instagram.com/mamashelter/"><span style="font-family:Helvetica;color:blue"><img width="24" height="24" src="https://api.staging.signally.io/images/iconmonstr-instagram-14-48-61cc732d0e0eb.png" style="width:0.25in;height:0.25in"></span></a><span style="font-family:Helvetica"><o:p></o:p></span></p></td><td width="24" valign="top" style="width:18pt;padding:0cm 1.5pt;height:18pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><a href="https://www.snapchat.com/add/mamashelter"><span style="font-family:Helvetica;color:blue"><img width="24" height="24" src="https://api.staging.signally.io/images/iconmonstr-snapchat-4-48-61cc734da01ca.png" style="width:0.25in;height:0.25in"></span></a><span style="font-family:Helvetica"><o:p></o:p></span></p></td><td width="24" valign="top" style="width:18pt;padding:0cm 1.5pt;height:18pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><a href="https://www.pinterest.fr/mamashelter/"><span style="font-family:Helvetica;color:blue"><img width="24" height="24" src="https://api.staging.signally.io/images/iconmonstr-pinterest-1-48-61cc73437269b.png" style="width:0.25in;height:0.25in"></span></a><span style="font-family:Helvetica"><o:p></o:p></span></p></td></tr></tbody></table></td><td width="55" style="width:41.25pt;background-color:black;padding:0cm;height:18pt"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-family:Helvetica;color:white"><img height="24" src="https://api.staging.signally.io/images/mama-61c0f1b6cbc19.png" style="height:0.25in"></span><span style="font-family:Helvetica"><o:p></o:p></span></p></td></tr></tbody></table></td></tr></tbody></table></td><td style="padding:0cm"><p class="MsoNormal" style="margin:0cm;font-size:11pt;font-family:Calibri, sans-serif"><span style="font-family:Helvetica"><img height="49" src="https://api.staging.signally.io/images/black-right-61d32791caeb7.png" style="height:0.5104in"></span></p></td></tr></tbody></table></td></tr></tbody></table>`

function CopySignature () {
    return (<div className={classes.container}>
        <Logo style={{ transform: 'scale(1.5)' }} />
        <h2>Copiez votre signature</h2>
            <CopySignatureComponent signature={signature} />
        </div>)
}

export default CopySignature;