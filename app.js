//fist of all, declare the 2d-array we are using to "visually" show the change later
//nothing to do with the browser, arrays and nodelists are different
let size = 1024;
let divContainer = [];
let containerSize = 400;
// create a container div after getting the body
const body = document.querySelector("body");
const container = document.createElement("div");
container.className = "div-container";
container.setAttribute("style", `
  display: grid;
  grid-template-columns: repeat(${size},1fr);
  width: ${containerSize}px;
  height: ${containerSize}px;
  `);
if (body !== null) {
    body.appendChild(container);
}
for (let i = 0; i < size; i++) {
    let divContainer2 = [];
    for (let j = 0; j < size; j++) {
        const divNode = document.createElement("div");
        divNode.className = "boxes";
        divNode.setAttribute("style", `
      background-color: black;
      width:calc(100%/${size})px;
      height:calc(100%/${size})px;`);
        container.appendChild(divNode);
        divContainer2.push(divNode);
    }
    divContainer.push(divContainer2);
}
//first add an hover effect to EVERY boxes
//if a mouse goes over it, then they change colors
container.onmousemove = function(event) {
    let box = event.target;
    if (box.className === "boxes") {
        box.setAttribute("style", "background-color:white;");
    }
};