export var Calculator = {
    getOutput: getOutput,
    setInput: setInput,
};

// for lexer, parser
enum TokenType {
    "EOI", "INVALiD", "NUM",
    "PLUS", "MINUS", "TIMES", "DIVIDE",
    "SIN", "COS", "TAN",
    "LPAREN", "RPAREN",
};

var input: string = "";
var output: number = 0;
var compiledText: string = ""; // will be eval()ed
var tokenSequence: string = ""; // Will contain token sequence
var error: string = ""; // internal calculator errors


function getOutput(): number {
    return output;
}
function setInput(inp: string): void {
    input = inp;
    evaluate();
}

function evaluate(): void {
    let tempvar: string;
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
        "})();\n"
    // freename(tempvar);

    output = eval(compiledText);
}

// lexer
// lex(): TokenType
// match(TokenType): boolean
// advance(): void
const MAX_CHARS: number = 2048,
      text: string[] = new Array(MAX_CHARS);
let   len: number = 0,
      offset: number = 0,
      wordno: number = 0;
function lex(): TokenType {
    let current: number = offset + len;
    for(; current < input.length; ++current) {
        // get next character
        if (current >= input.length) {
            console.log(`offset: {offset} len: {len}`);
            return TokenType.EOI;
        }
        text[current] = input.charAt(current);
        offset = current;
        len = 1;

        // trig functions
        if (text[current] == 's' || text[current] == 'c' || text[current] == 't') {
            if (input.length >= 3) {
                for (let i = 1; i < 3; ++i)
                {   text[current + i] = input.charAt(current + i);   }
                len = 3;
                const tokenStr = text.slice(current, current + 3).join('');
                if (tokenStr == "sin")
                {   return TokenType.SIN;   }
                else if (tokenStr == "cos")
                {   return TokenType.COS;   }
                else if (tokenStr == "tan")
                {   return TokenType.TAN;   }
            }
        }

        // single-char cases
        switch (text[current]) {
            // other 6 function cases
            case '+': return TokenType.PLUS;
            case '-': return TokenType.MINUS;
            case '*': return TokenType.TIMES;
            case '/': return TokenType.DIVIDE;
            case '(': return TokenType.LPAREN;
            case ')': return TokenType.RPAREN;

            // whitespace cases
            case '\t':
            case ' ': break;

            // number case
            default:
            {
                const isDigit = ((n: string) => {
                    return '0'.charCodeAt(0) < n.charCodeAt(0)
                        && n.charCodeAt(0) < '9'.charCodeAt(0);
                });
                if (!(
                    isDigit(text[current]) ||
                    '+' == text[current] ||
                    '-' == text[current] ||
                    '.' == text[current]
                )) {
                    error += `[${wordno}] Invalid charater ${text[current]}\n`;
                }
                else {
                    let ch = text[current];
                    while (current < input.length && (
                        isDigit(ch) ||
                        '.' == ch ||
                        '+' == ch ||
                        '-' == ch ||
                        // checking for e19 or e-33
                        (
                            'e' == ch &&
                            (
                                (
                                    current + 1 < input.length && 
                                    isDigit(ch = input.charAt(current + 1))
                                ) ||
                                (
                                    current + 2 < input.length &&
                                    ('+' == ch || '-' == ch) &&
                                    isDigit(ch = input.charAt(current + 2))
                                )
                            )
                        )
                    ))
                    {
                        // 50 decimal digits, + ., + -e306
                        if (current - offset >= 56) {
                            error += `[${wordno}] Truncating ` +
                                `${input.slice(offset, current + offset + 1)}. ` +
                                `Max 50 digits.\n`;
                            break;
                        }
                        text[current] = ch = input.charAt(++current);
                    }
                    len = current - offset;
                    return TokenType.NUM;
                }
                break;
            }
        }
    }
    return TokenType.EOI;
}

var lookahead: TokenType = TokenType.INVALiD;
function match(token: TokenType): boolean {
    if (lookahead == TokenType.INVALiD) {
        lookahead = lex();
    }
    return token == lookahead;
}

function advance(): void {
    lookahead = lex();
}

// temporary name pool
// newname(): string
// freename(string): void