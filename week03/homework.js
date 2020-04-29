
function convertStringToNumber(string, x) {

    if(arguments.length < 2){
        x = 10;
    }
    var chars = string.split('');
    var number = 0;
    var i = 0;
    while(i < chars.length && chars[i] != '.') {
        number = number * x;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i++;
    }
    
    if(chars[i] === '.') {
        i++;
    }

    var fraction = 1;
    while(i < chars.length) {
        fraction = fraction / x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++;
    }

    return number;
}


function convertNumberToString(number, x) {
    var integer = Math.floor(number);
    var fraction = number - integer;
    
    var string = '';
    var decimal = '';
    while(integer > 0) {
        string = String(integer % x) + string;
        integer = Math.floor(integer / x);
    }
    
    if(fraction > 0) {
        decimal = '.'
    }

    while(fraction > 0) {
        decimal = decimal + Math.floor(fraction * x);
        fraction = fraction * x - Math.floor(fraction * x);
    }
    return string + decimal;
}



console.log(convertStringToNumber("10.0123"));
console.log(convertNumberToString(3.123, 10));