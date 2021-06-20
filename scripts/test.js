function setup() {
  let myCanvas = createCanvas(300, 300);
  myCanvas.parent('sketch-holder');
}

function draw() {
  background(220);
  ellipse(mouseX, mouseY, 50, 50);
}
