export const validateEmail = (email) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
};

export function validateSiren(siren) {
    var nos = siren.replace(/\D/g, "");
    var sum,
        dgt,
        tbl = ("" + nos).split(""),
        lng = tbl.length;
    if (lng === 9) {
        sum = 0;
        while (lng--) {
            dgt = +tbl[lng];
            if (lng % 2 !== 0) dgt *= 2;
            dgt += dgt < 10 ? 0 : -9;
            sum += dgt;
        }
        if (sum % 10 === 0) {
            return true;
        }
    }
    return false;
}
