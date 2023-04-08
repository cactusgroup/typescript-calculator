import { Calculator } from "./Calculator.js";
var calc = Calculator;

// events
let inputEvent = new Event("input", {
    bubbles: false,
    cancelable: true,
}),
clickevt = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
}),
mouseenterevt = new MouseEvent("mouseenter", {
    bubbles: true,
    cancelable: true,
    view: window,
}),
mouseleaveevt = new MouseEvent("mouseleave", {
    bubbles: true,
    cancelable: true,
    view: window,
});

// user text
var inText = "";

// button -> (text, parse) actions
let btns = document.getElementsByTagName("button");
let btnTextAction = {
    "sin": " sin( ", "cos": " cos( ", "tan": " tan( ",
    "plus": " + ", "minus": " - ", "times": " * ",
    "lparen": " ( ", "rparen": " ) ", "divide": " / ",

    "clear-red": "", "dot": ".", "enter": "",
}
for (let i = 0; i < 10; ++i) btnTextAction["b"+i] = "" + i;
for (let btn of btns) {
    btn.addEventListener("click", (e) => {
        inText += btnTextAction[btn.id];
        if (btn.id === "clear-red")
            inText = "";
        if (btn.id === "enter") {
            calc.setInput(inText);
            document.getElementById("out").textContent = "" + calc.getOutput();
            return;
        }
        (<HTMLInputElement> document.getElementById("in")).value = inText;
        document.getElementById("in").dispatchEvent(inputEvent);
    });
}
let ininput = <HTMLInputElement>document.getElementById("in");
ininput.addEventListener("input", (e) => {
    inText = ininput.value;
    // console.log(inText);
});

// keystroke -> button
document.getElementsByTagName("html")[0]
.addEventListener('keyup', function (e) {
    if (document.activeElement === document.getElementById("in"))
        return;

    // console.log(e.key);
    let keymapDefaultHandler = {
        get: (target: object, name: string) => {
            return target.hasOwnProperty(name) ? target[name] : "out";
        }
    };
    let buttonKeymap = {
        "s": "sin", "c": "cos", "t": "tan",
        "+": "plus", "-": "minus", "*": "times",
        "(": "lparen", ")": "rparen", "/": "divide",
        "Enter": "enter",

        // numbers
        "C": "clear-red", ".": "dot",
    };
    for (let i = 0; i < 10; ++i) { buttonKeymap[""+i] = "b"+i; }
    let defaultKeymap = new Proxy(buttonKeymap, keymapDefaultHandler);

    let elem: HTMLElement = document.getElementById(defaultKeymap[e.key]);
    elem.addEventListener("mouseenter", (e) => elem.classList.add('hovered'));
    elem.addEventListener("mouseleave", (e) => elem.classList.remove('hovered'));

    elem.dispatchEvent(mouseenterevt);
    setTimeout(() => {
        elem.dispatchEvent(clickevt);
        elem.dispatchEvent(mouseleaveevt);
    }, 250);
});
