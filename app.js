// create the body
const body = document.querySelector("body");
//---------------------------- buttons and possibly reset function ----------
const button = document.createElement("button");
button.textContent = "Clear the screen?";
button.setAttribute("style", `
  padding: = 0 15px;
  `);
body.appendChild(button);
//fist of all, declare the 2d-array we are using to "visually" show the change later
//nothing to do with the browser, arrays and nodelists are different
let size = 3;
let divContainer = [];
let containerSize = 400;
// create a container div after getting the body
const container = document.createElement("div");
container.className = "div-container";
setBoxContainer();
if (body !== null) {
    body.appendChild(container);
}
function makeBoxes() {
    for (let i = 0; i < size; i++) {
        let divContainer2 = [];
        for (let j = 0; j < size; j++) {
            const divNode = document.createElement("div");
            divNode.className = "boxes";
            divNode.setAttribute("style", `
      background-color: black;
      `);
            container.appendChild(divNode);
            divContainer2.push(divNode);
        }
        divContainer.push(divContainer2);
    }
}
makeBoxes();
//first add an hover effect to EVERY boxes
//if a mouse goes over it, then they change colors
container.onmousemove = function (event) {
    let box = event.target;
    if (box.className === "boxes") {
        box.setAttribute("style", "background-color:white;");
    }
};
button.addEventListener("click", resetCanvas);
function resetCanvas() {
    let children = container.getElementsByClassName("boxes");
    for (let child of children) {
        child.setAttribute("style", "background: black;");
    }
    setPixelAmount();
}
function setBoxContainer() {
    container.setAttribute("style", `
    display: grid;
    grid-template-columns: repeat(${size},1fr);
    grid-template-rows: repeat(${size}, 1fr);
    width: ${containerSize}px;
    height: ${containerSize}px;
    `);
}
function setPixelAmount() {
    let pixels = Number(prompt("Choose a size between 1 and 64"));
    if (pixels > 0 && pixels <= 64) {
        size = pixels;
        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
        // REALLY???? Apparently yes, because when you are actually setting the parent container up, it's **SET**.
        // so you have to re-SET it again. Maybe we can turn it into a function to
        setBoxContainer();
        makeBoxes();
    }
    else {
        alert("You entered an invalid number");
    }
}
