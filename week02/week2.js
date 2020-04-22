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