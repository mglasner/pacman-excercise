const pacArray = [
    ["./images/PacMan1.png", "./images/PacMan2.png"],
    ["./images/PacMan3.png", "./images/PacMan4.png"],
  ];
const packManWidth = 50;
let index = 0;
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
return {
    x: Math.random() * scale,
    y: Math.random() * scale,
};
}

function randomIntFromInterval(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
let game = document.getElementById("game");
let newimg = document.createElement("img");
newimg.src = "./images/PacMan1.png";
newimg.width = packManWidth;
newimg.style.position = "absolute";
// returns an object with random values scaled {x: 33, y: 21}
let velocity = setToRandom(10); // {x:?, y:?}
let position = {
    x: randomIntFromInterval(0, document.body.offsetWidth - packManWidth),
    y: randomIntFromInterval(0, document.body.offsetHeight - packManWidth),
};
newimg.style.left = position.x;
newimg.style.top = position.y;

game.appendChild(newimg);
return {
    position,
    velocity,
    newimg,
};
}

function update() {
//loop over pacmen array and move each one and move image in DOM
pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    if (item.velocity.x >= 0) {
    item.newimg.src = "PacMan1.png";
    item.newimg.src = pacArray[0][index];
    } else {
    item.newimg.src = "PacMan3.png";
    item.newimg.src = pacArray[1][index];
    }
    index >= 1 ? (index = 0) : index++;
});
setTimeout(update, 50);
}

function checkCollisions(item) {
let width = document.body.offsetWidth - packManWidth / 2 - 20;
let heigth = document.body.offsetHeight - packManWidth / 2 - 20;
if (item.position.x <= 0 || item.position.x >= width) {
    item.velocity.x = -1 * item.velocity.x;
}
if (item.position.y <= 0 || item.position.y >= heigth) {
    item.velocity.y = -1 * item.velocity.y;
}
}

function makeOne() {
pacMen.push(makePac()); // add a new PacMan
}
