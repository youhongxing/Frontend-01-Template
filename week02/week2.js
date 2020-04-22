var reg = /^((([-+]?[0-9]*\.?)([0-9]+)?(?:[eE][+-]?[0-9][0-9]*)?)|(0[bB][01]+)|(0[oO][0-7]+)|(0[xX][0-9a-fA-F]+))$/;

// 测试用例来自https://github.com/sadmark/Frontend-01-Template/blob/master/week02/test.js
console.log(reg.test('0'));
console.log(reg.test('12'));
console.log(reg.test('12e2'));
console.log(reg.test('12.e2'));
console.log(reg.test('12.53e+312'));
console.log(reg.test('12.53e-312'));
console.log(reg.test('.4'));
console.log(reg.test('.412e12'));
console.log(reg.test('.412e-12'));
console.log(reg.test('0'));
console.log(reg.test('0.4523'));
console.log(reg.test('0X124f'));
console.log(reg.test('0x124fggg'));
console.log(reg.test('0o1288'));
console.log(reg.test('0O125563'));
console.log(reg.test('0B111'));
console.log(reg.test('0b1366777'));
console.log(reg.test('0b010101'));

function encodingUtf8(str) {
    var utf8 = '';
    for(let char of str){
        utf8 = utf8.concat(encode(char));
    }
    console.log(utf8)
    return utf8;
}

function encode(str){
    var binaryValue = str.codePointAt().toString(2);
    var hexValue = str.codePointAt().toString(16);
    
    var zeros = genZeros(hexValue, 8);
    hexValue = "0x" + zeros + hexValue;
    // 单字节
    if(0x00000000 <= hexValue && hexValue <= 0x0000007F){
        var validLength = 7;
        binaryValue = genZeros(binaryValue, validLength) + binaryValue;
        var first = '\\x' + parseInt('0' + binaryValue.substring(0, 7), 2).toString(16);
        return first;
    }
    // 双字节
    if(0x00000080 <= hexValue && hexValue <= 0x000007FF){
        var validLength = 11;
        binaryValue = genZeros(binaryValue, validLength) + binaryValue;
        var first = '\\x' + parseInt('110' + binaryValue.substring(0, 5), 2).toString(16);
        var second = '\\x' + parseInt('10' + binaryValue.substring(5, 11), 2).toString(16)
        return first+second;
    }
    // 三字节
    if(0x00000800 <= hexValue && hexValue <= 0x0000FFFF){
        var validLength = 16;
        binaryValue = genZeros(binaryValue, validLength) + binaryValue;
        var first = '\\x' + parseInt('1110' + binaryValue.substring(0, 4), 2).toString(16);
        var second = '\\x' + parseInt('10' + binaryValue.substring(4, 10), 2).toString(16)
        var third = '\\x' + parseInt('10' + binaryValue.substring(10, 16), 2).toString(16);
        return first+second+third;
    }
    // 四字节
    if(0x00010000 <= hexValue && hexValue <= 0x0010FFFF){
        var validLength = 21;
        binaryValue = genZeros(binaryValue, validLength) + binaryValue;
        var first = '\\x' + parseInt('11110' + binaryValue.substring(0, 3), 2).toString(16);
        var second = '\\x' + parseInt('10' + binaryValue.substring(3, 9), 2).toString(16)
        var third = '\\x' + parseInt('10' + binaryValue.substring(9, 15), 2).toString(16);
        var forth = '\\x' + parseInt('10' + binaryValue.substring(15, 21), 2).toString(16);
        return first+second+third+forth;
    }
}

function genZeros(value, length){
    var zeros = "";
    for(var i = 0; i < length - value.length; i++){
        zeros = zeros.concat("0");
    }
    return zeros;
}

encodingUtf8("测试用例"); // \xe6\xb5\x8b\xe8\xaf\x95\xe7\x94\xa8\xe4\xbe\x8b
encodingUtf8("𠮷"); // \xf0\xa0\xae\xb7
encodingUtf8("😊"); // \xf0\x9f\x98\x8a
encodingUtf8("abced"); // \x61\x62\x63\x65\x64
encodingUtf8("89211"); //\x38\x39\x32\x31\x31
