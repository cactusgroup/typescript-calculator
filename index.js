window.onload = function (e) {
    console.log('page fully loaded');
    document.getElementsByTagName("html")[0].onkeyup = function (e) {
        console.log(e.key);
        key_to_button(e.key);
    };
};
function key_to_button(key) {
    var clickevt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    }), mouseoverevt = new MouseEvent("mouseover", {
        bubbles: true,
        cancelable: true,
        view: window
    }), mouseleaveevt = new MouseEvent("mouseleave", {
        bubbles: true,
        cancelable: true,
        view: window
    });
    var elem = null;
    switch (key) {
        case "s":
            elem = document.getElementById("sin");
            break;
        case "o":
            elem = document.getElementById("cos");
            break;
        case "t":
            elem = document.getElementById("tan");
            break;
        case "+":
            elem = document.getElementById("plus");
            break;
        case "-":
            elem = document.getElementById("minus");
            break;
        case "*":
            elem = document.getElementById("times");
            break;
        case "(":
            elem = document.getElementById("lparen");
            break;
        case ")":
            elem = document.getElementById("rparen");
            break;
        case "/":
            elem = document.getElementById("divide");
            break;
        case "c":
            elem = document.getElementById("clear-red");
            console.log(elem);
            break;
        case "0":
            elem = document.getElementById("b0");
            break;
        case ".":
            elem = document.getElementById("dot");
            break;
        case "1":
            elem = document.getElementById("b1");
            break;
        case "2":
            elem = document.getElementById("b2");
            break;
        case "3":
            elem = document.getElementById("b3");
            break;
        case "4":
            elem = document.getElementById("b4");
            break;
        case "5":
            elem = document.getElementById("b5");
            break;
        case "6":
            elem = document.getElementById("b6");
            break;
        case "7":
            elem = document.getElementById("b7");
            break;
        case "8":
            elem = document.getElementById("b8");
            break;
        case "9":
            elem = document.getElementById("b9");
            break;
        default:
            elem = document.getElementById("out");
            break;
    }
    elem.addEventListener("mouseover", function (e) {
        if (elem.className.lastIndexOf(" hovered") == -1)
            elem.className += ' hovered';
    });
    elem.addEventListener("mouseleave", function () {
        elem.className = elem.className.slice(0, elem.className.lastIndexOf(" hovered"));
    });
    elem.dispatchEvent(mouseoverevt);
    console.log(key + " hovered");
    setTimeout(function () {
        elem.dispatchEvent(clickevt);
        elem.dispatchEvent(mouseleaveevt);
        console.log(key + " left");
    }, 250);
}
