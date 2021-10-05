// create a container div after getting the body
const body = document.querySelector("body");
const container = document.createElement("div");
container.className = "div-container";
container.setAttribute("style", `
  display: grid;
  grid-template-columns: repeat(16,1fr);
  width: 400px;
  height: 400px;
  gap: 5px;
 `);
if (body !== null) {
    body.appendChild(container);
}
let size = 16;
let divContainer = [];
for (let i = 0; i < size; i++) {
    let divContainer2 = [];
    for (let j = 0; j < size; j++) {
        const divNode = document.createElement("div");
        divNode.className = "boxes";
        divNode.setAttribute("style", `background-color: black`);
        container.appendChild(divNode);
        divContainer2.push(divNode);
    }
    divContainer.push(divContainer2);
}
//window.addEventListener('mousemove',(event) => );
