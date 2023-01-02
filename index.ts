let inputEvent = new Event("input", {
    bubbles: false,
    cancelable: true,
})

let btns = document.getElementsByTagName("button");
let btnAction = {
    "sin": " sin( ",
    "cos": " cos( ",
    "tan": " tan( ",
    "plus": " + ",
    "minus": " - ",
    "times": " * ",
    "lparen": " ( ",
    "rparen": " ) ",
    "divide": " / ",

    "clear-red": "",
    "dot": ".",
}
for (let i = 0; i < 10; ++i) btnAction["b"+i] = "" + i;

var inText = ""
for (let btn of btns) {
    btn.addEventListener("click", (e) => {
        inText += btnAction[btn.id];
        if (btnAction[btn.id] === "")
            inText = "";
        document.getElementById("in").setAttribute("value", inText);
        document.getElementById("in").dispatchEvent(inputEvent);
    });
}

let clickevt = new MouseEvent("click", {
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

document.getElementsByTagName("html")[0]
.addEventListener('keyup', function (e) {
    console.log(e.key)
    let keymapDefaultHandler = {
        get: (target: object, name) => {
            return target.hasOwnProperty(name) ? target[name] : "out";
        }
    };
    let buttonKeymap = {
        "s": "sin", "c": "cos", "t": "tan",
        "+": "plus", "-": "minus", "*": "times",
        "(": "lparen", ")": "rparen", "/": "divide",

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
