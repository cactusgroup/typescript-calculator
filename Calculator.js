export var Calculator = {
    getOutput: getOutput,
    setInput: setInput,
};
// for lexer, parser
var TokenType;
(function (TokenType) {
    TokenType[TokenType["EOI"] = 0] = "EOI";
    TokenType[TokenType["INVALiD"] = 1] = "INVALiD";
    TokenType[TokenType["NUM"] = 2] = "NUM";
    TokenType[TokenType["PLUS"] = 3] = "PLUS";
    TokenType[TokenType["MINUS"] = 4] = "MINUS";
    TokenType[TokenType["TIMES"] = 5] = "TIMES";
    TokenType[TokenType["DIVIDE"] = 6] = "DIVIDE";
    TokenType[TokenType["SIN"] = 7] = "SIN";
    TokenType[TokenType["COS"] = 8] = "COS";
    TokenType[TokenType["TAN"] = 9] = "TAN";
    TokenType[TokenType["LPAREN"] = 10] = "LPAREN";
    TokenType[TokenType["RPAREN"] = 11] = "RPAREN";
})(TokenType || (TokenType = {}));
;
var input = "";
var output = 0;
var compiledText = "";
function getOutput() {
    return output;
}
function setInput(inp) {
    input = inp;
    evaluate();
}
function evaluate() {
    let tempvar;
    compiledText +=
        "(function () {\n" +
            "    let  t0, t1, t2, t3, t4, t5, t6, t7,\n" +
            "         t8, t9,t10,t11,t12,t13,t14,t15,\n" +
            "        t16,t17,t18,t19,t20,t21,t22,t23,\n" +
            "        t24,t25,t26,t27,t28,t29,t30,t31;\n";
    len = offset = wordno = 0;
    // lookahead = TokenType.INVALID;
    // tempvar = expression();
    compiledText +=
        "    return   " + tempvar + "   ;\n" +
            "})();\n";
    // freename(tempvar);
    output = eval(compiledText);
}
// lexer
// TokenType lex()
// boolean match(TokenType)
// void advance()
const MAX_CHARS = 50, text = new Array(MAX_CHARS);
let len = 0, offset = 0, wordno = 0;
function lex() {
    let current = offset + len;
    for (; current < input.length; ++current) {
        if (current >= input.length) {
            console.log(`offset: {offset} len: {len}`);
            return TokenType.EOI;
        }
        text[current] = input.charAt(current);
        offset = current;
        len = 1;
        // trig functions
        if (text[current] == 's' || text[current] == 'c' || text[current] == 't') {
        }
    }
    return TokenType.INVALiD;
}
