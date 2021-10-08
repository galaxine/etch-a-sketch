//fist of all, declare the 2d-array we are using to "visually" show the change later
//nothing to do with the browser, arrays and nodelists are different
let size = 3;
let divContainer = [];
let containerSize = 400;
let rgb = false;
const body = document.querySelector("body");
// we need
//---------------------------- buttons and possibly reset function ----------
//reset/setPixels
const button = document.createElement("button");
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
let rgbButton = document.createElement("button");
rgbButton.textContent = "Do you want RGB with that?";
rgbButton.setAttribute("style", `
  padding: 0 15px;
  `);
rgbButton.addEventListener("click", toggleRGB);
body.append(button, rgbButton);
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
/*= function (event: PointerEvent) {
  let box = event.target as HTMLSelectElement;
  if (box.className == "boxes" && !rgb) {
    //change to the class the-thing if rgb is turned off and , turn white to black
    box.classList.replace("boxes", "the-thing");
  } else if (box.className == "boxes" && rgb) {
    //chane classNames into the-thing-rgb if the rgb is enabled
    // then replace the boxes with the thing-rgb
    box.classList.replace("boxes", "the-thing-rgb");
    let red = Math.ceil(Math.random() * 255);
    let green = Math.ceil(Math.random() * 255);
    let blue = Math.ceil(Math.random() * 255);
    box.setAttribute(
      "style",
      `
      background-color: rgb(${red},${green},${blue});
      `
    );
  } else if (box.className == "the-thing-rgb" && rgb) {
    // if the className is the-thing-rgb and rgb is enabled,
    //then we need to take the color of the background-Color and raise the rgb values by 10%

    // oh man, at first look, I thought of this
    // background-color: rgb((content)) => (content) => split by ',' => return red green and blue
    let rgbNumbers = Number(
      box.style.backgroundColor
        .slice(4, box.style.backgroundColor.length - 1)
        .split(",")
    );
    box.setAttribute(
      "style",
      `
      background-color: rgb(${Math.ceil(rgbNumbers[0] * 1.1)},${Math.ceil(
        rgbNumbers[1] * 1.1
      )},${Math.ceil(rgbNumbers[2] * 1.1)}
      );
      `
    );
  } else {
    console.log(
      "Something is wrong, please debug the container Eventhandler thing"
    );
  }
};*/
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
function toggleRGB() {
    if (rgb) {
        rgb = false;
    }
    else {
        rgb = true;
    }
}
