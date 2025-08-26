const max = (num1, num2) => {
    let max = num1;
    if (num1 < num2) {
        max = num2;
    }
    return max;
}

//Math.max
const getMax = (...nums) => {
    let max = -Infinity;

    for (let num of nums) {
        if (num > max) {
            max = num;
        }
    }

    return max;
}

const getSum = (...nums) => {
    let sum = 0;

    for (let num of nums) {
        sum += num;
    }

    return sum;
}

const ageConvert = (inpDate) => {
    const presentYear = new Date().getFullYear();
    const presentMonth = new Date().getMonth();
    const presentDate = new Date().getDate();

    const bdayYear = new Date(inpDate).getFullYear();
    const bdayMonth = new Date(inpDate).getMonth();
    const bdayDate = new Date(inpDate).getDate();

    let age;

    if (bdayMonth > presentMonth) {
        age = presentYear - bdayYear - 1;
    }
    else if (bdayMonth === presentMonth && bdayDate > presentDate) {
        age = presentYear - bdayYear - 1;
    }
    else {
        age = presentYear - bdayYear;
    }

    return age;
}

const emailCheck = (inpEmail) => {
    const checkAt1 = inpEmail.indexOf("@");
    const checkAt2 = inpEmail.lastIndexOf("@");
    const checkDot1 = inpEmail.indexOf(".");
    const checkDot2 = inpEmail.lastIndexOf(".");
    const emailLength = inpEmail.length;

    let lengthCheck = true;
    let atCheck = true;
    let dotCheck = true;
    let result = false;

    if (emailLength === 0) {
        lengthCheck = false;
    }

    if (checkAt1 !== checkAt2 || checkAt1 === 0 || checkAt2 === emailLength - 1 || checkAt1 < 0) {
        atCheck = false;
    }

    if (checkDot1 !== checkDot2 || checkDot1 === 0 || checkDot2 === emailLength - 1 || checkDot1 < 0 || checkDot1 - checkAt1 < 2) {
        dotCheck = false;
    }

    return { "length": lengthCheck, "atSign": atCheck, "dot": dotCheck };

}

const fileNameCheck = (inpFileName) => {
    const extension = ["jpg", "png", "gif", "webp"];
    const checkExtension = inpFileName.toLowerCase().trim(" ").split(".");
    let result = extension.includes(checkExtension[1]);

    return result;
}

export { getMax, getSum, ageConvert, emailCheck, fileNameCheck };