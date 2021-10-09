//fist of all, declare the 2d-array we are using to "visually" show the change later
//nothing to do with the browser, arrays and nodelists are different
let size = 1;
let divContainer = [];
let containerSize = 400;
let rgb = false;
// we are going to first divide the buttons and the canvas into the options and canvas
const canvas = document.querySelector(".canvas");
const options = document.querySelector(".options");
// we need
//---------------------------- buttons and possibly reset function ----------
//reset/setPixels
const button = document.createElement("button");
button.classList.add("button-1");
button.textContent = "Clear the screen?";
button.setAttribute("style", `
  padding: 0 15px;
  `);
button.addEventListener("click", resetCanvas);
function resetCanvas() {
    let children = container.getElementsByClassName("boxes");
    for (let child of children) {
        child.setAttribute("style", "background: black;");
    }
    setPixelAmount();
}
//rgbOption
const rgbButton = document.createElement("button");
rgbButton.textContent = "Do you want RGB with that?";
rgbButton.setAttribute("style", `
  padding: 0 15px;
  `);
rgbButton.addEventListener("click", toggleRGB);
//create a new slider to add to the document, which is put inside a div
const sliderDiv = document.createElement("div");
sliderDiv.classList.add("slider-div");
const label = document.createElement("label");
label.textContent = `canvas set to: ${size} x ${size}`;
const slider = document.createElement("input");
slider.setAttribute("type", "range");
slider.setAttribute("value", `${size}`);
slider.setAttribute("min", "1");
slider.setAttribute("max", "64");
sliderDiv.append(label, slider);
// this goes to the options
options.append(button, rgbButton, sliderDiv);
// this should replace `setPixelAmount`
slider.addEventListener("mousemove", changeSize);
slider.addEventListener("change", setCanvas);
function setCanvas(event) {
    let num = event.target;
    size = Number(num.value);
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    // REALLY???? Apparently yes, because when you are actually setting the parent container up, it's **SET**.
    // so you have to re-SET it again. Maybe we can turn it into a function to
    setBoxContainer();
    makeBoxes();
}
function changeSize(event) {
    let num = event.target;
    label.textContent = `canvas set to: ${num.value} x ${num.value}`;
}
// create a container div after getting the body
const container = document.createElement("div");
container.className = "div-container";
setBoxContainer();
//this goesto the container
if (canvas !== null) {
    canvas.appendChild(container);
}
function makeBoxes() {
    for (let i = 0; i < size; i++) {
        let divContainer2 = [];
        for (let j = 0; j < size; j++) {
            const divNode = document.createElement("div");
            divNode.classList.add("boxes");
            container.appendChild(divNode);
            divContainer2.push(divNode);
        }
        divContainer.push(divContainer2);
    }
}
makeBoxes();
/*
I am having difficulties implementing a better eventhandling. I want to delegate the event on enter into its children.
Then I want the eventlistener checking the kids and return me the current kid for modification.
This kid gets modified based on two things:
1. We have the rgb trigger enabled
2. We have the name of the class assigned to the child.
So the moment the pointer enters the parent, it fires, but does it also fire whenever I am going through the children? for real?
Apparently it is, but only if you "catch it".

Ok, next step =>
If the tile is white and has no backgroundColor of rgb = it can turn black or if rgb is turned on, gain a random color.
If the tile is black and has rgb colors in the background = it can not turned back, reset.
if the tile is black and has no rgb colors = it can be recolored.
if the tile has rgbColors not white or black = raise the value of each red, green and blue one by 10%

*/
container.addEventListener("mouseenter", changingChildren, true);
function changingChildren(pointer) {
    let boxes = pointer.target;
    if (boxes.className === "boxes" && !rgb) {
        boxes.classList.replace("boxes", "the-thing");
    }
    else if (boxes.className === "boxes" && rgb) {
        setClassToRGB(boxes);
    }
    else if (boxes.className === "the-rgb" && rgb) {
        darkerColor(boxes);
    }
    else if (boxes.className === "the-thing" && rgb) {
        setClassToRGB(boxes);
    }
    else if (boxes.className == "the-rgb" && !rgb) {
        boxes.removeAttribute("style");
        boxes.classList.replace("the-rgb", "the-thing");
    }
}
function darkerColor(boxes) {
    //first split the strings into a string array:
    let rgbNumbers = boxes.style.backgroundColor
        .slice(4, boxes.style.backgroundColor.length - 1)
        .split(",");
    let red = Number(rgbNumbers[0]) * 0.9;
    let green = Number(rgbNumbers[1]) * 0.9;
    let blue = Number(rgbNumbers[2]) * 0.9;
    boxes.setAttribute("style", `
    background-color: rgb(${red}, ${green}, ${blue});
    `);
}
function setClassToRGB(boxes) {
    if (boxes.className === "boxes") {
        boxes.classList.replace("boxes", "the-rgb");
    }
    else if (boxes.className === "the-thing") {
        boxes.classList.replace("the-thing", "the-rgb");
    }
    else {
        console.log(`there is something wrong,#.
       Look this here doesn't belong here ${boxes.className}`);
    }
    let red = Math.ceil(Math.random() * 255);
    let green = Math.ceil(Math.random() * 255);
    let blue = Math.ceil(Math.random() * 255);
    boxes.setAttribute("style", `
    background-color: rgb(${red},${green},${blue});
    `);
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
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    // REALLY???? Apparently yes, because when you are actually setting the parent container up, it's **SET**.
    // so you have to re-SET it again. Maybe we can turn it into a function to
    setBoxContainer();
    makeBoxes();
}
function toggleRGB() {
    if (rgb) {
        rgb = false;
    }
    else {
        rgb = true;
    }
}
