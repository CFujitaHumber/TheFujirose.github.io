

let nodeSize = 8;

let node0 = [-100, -100, -100];
let node1 = [-100, -100,  100];
let node2 = [-100,  100, -100];
let node3 = [-100,  100,  100];
let node4 = [ 100, -100, -100];
let node5 = [ 100, -100,  100];
let node6 = [ 100,  100, -100];
let node7 = [ 100,  100,  100];

let nodes = [node0, node1, node2, node3, node4, node5, node6, node7];

let edge0  = [0, 1];
let edge1  = [1, 3];
let edge2  = [3, 2];
let edge3  = [2, 0];
let edge4  = [4, 5];
let edge5  = [5, 7];
let edge6  = [7, 6];
let edge7  = [6, 4];
let edge8  = [0, 4];
let edge9  = [1, 5];
let edge10 = [2, 6];
let edge11 = [3, 7];

let edges = [edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11];
let isFocused;
let color0, color1, color2, color3, color4, color5, color6, color7, color8, color9, color10, color11, color12, edgeColor, backgroundColor, nodeColor;




function setup() {
  backgroundColor = color(255, 255, 255);
  nodeColor = [color(214, 81, 214),color(255, 0, 255),color(0, 0, 0),color(0, 0, 0),color(255, 0, 255),color(0,0,0),color(0,0,0),color(0,0,0)];

  color0 = color(0, 0, 255);
  color1 = color(255, 0, 0);
  color2 = color(255, 0, 0);
  color3 = color(255, 0, 0);
  color4 = color(255, 0, 0);
  color5 = color(255, 0, 0);
  color6 = color(255, 0, 0);
  color7 = color(255, 0, 0);
  color8 = color(0, 0, 255);
  color9 = color(255, 0, 0);
  color10 = color(255, 0, 0);
  color11 = color(255, 0, 0);
  color12 = color(255, 0, 0);
  edgeColor = [color0, color1, color2, color3, color4, color5, color6, color7, color8, color9, color10, color11]; //this is to color the diffrent edges

  rotateZ3D(60);
  rotateY3D(60);
  rotateX3D(60);
  background(backgroundColor);
  createCanvas(300, 300);

}



draw = function() {
  clear();
    normalv = calculateNormal(nodes[0][0],nodes[0][1],nodes[0][2],nodes[1][0],nodes[1][1], nodes[1][2]);

    push();
    translate(200, 200);

    // Draw edges
    for (var e=0; e<edges.length; e++) {
        stroke(edgeColor[e]);
        line(nodes[edges[e][0]][0], nodes[edges[e][0]][1], nodes[edges[e][1]][0], nodes[edges[e][1]][1]);
    }

    // Draw nodes
    fill(23, 212, 184);
    var midpoint = getMidpoint(nodes[0][0],nodes[0][1], nodes[5][0], nodes[5][1]);
    //line(midpoint[0], midpoint[1],normalv[0][0],normalv[0][1]);

    noStroke();
    for (var n=0; n<nodes.length; n++) {
        fill(nodeColor[n]);
        var node = nodes[n];
        text("   node" + n, node[0], node[1]);
        ellipse(node[0], node[1], nodeSize, nodeSize);
    }

    if(deviceOrientation == PORTRAIT)
    {
      rotateX3D(pRotationX/100);
      rotateY3D(pRotationY/100);
      rotateZ3D(pRotationZ/100);
    }
    else
    {
      rotateY3D(0.005);
    }
    ///rotateY3D(0.005);
    pop();
};

mouseDragged = function() {
    rotateY3D((mouseX - pmouseX)/100);
    rotateX3D((mouseY - pmouseY)/100);
};

//functions
var calculateNormal = function(ax, ay, az, bx, by, bz)//calcutes the normal of this surface
{
  let x = ay * bz - az * by;
  let y = az * bx - ax*bz;
  let z = ax*by - ay*bx;
  let output = [x,y,z];
  //println(output[0]);
  //println(output[1]);
  //println(output[2]);
  return output;
};

var getMidpoint = function(x0,y0,x1,y1)
{
  return [(x0+x1)/2, (y0+y1)/2];
};

var getLength = function(x0, y0, x1,y1)
{
  return sqrt( pow(x1 - x0,2) + pow(y1-y0,2));
};



var normalv = calculateNormal(nodes[0][0],nodes[0][1],nodes[0][2],nodes[1][0],nodes[1][1], nodes[1][2]);


// Rotate shape around the z-axis
var rotateZ3D = function(theta) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);
  var z, y;
  let n = 0;

  for (n=0; n<nodes.length; n++) {
      x = nodes[n][0];
      y = nodes[n][1];
      nodes[n][0] = x * cosTheta - y * sinTheta;
      nodes[n][1] = y * cosTheta + x * sinTheta;
  }

  for (n=0; n<normalv.length; n++) {
      x = normalv[n][0];
      y = normalv[n][1];
      normalv[n][0] = x * cosTheta - y * sinTheta;
      normalv[n][1] = y * cosTheta + x * sinTheta;
  }


};

var rotateX3D = function(theta) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);
  var z, y;
  let n = 0;

  for ( n=0; n<nodes.length; n++) {
      y = nodes[n][1];
      z = nodes[n][2];
      nodes[n][1] = y * cosTheta - z * sinTheta;
      nodes[n][2] = z * cosTheta + y * sinTheta;
  }

  for ( n=0; n<normalv.length; n++) {
      y = normalv[n][1];
      z = normalv[n][2];
      normalv[n][1] = y * cosTheta - z * sinTheta;
      normalv[n][2] = z * cosTheta + y * sinTheta;
  }

};

var rotateY3D = function(theta) {

  var sinTheta = sin(theta);
  var cosTheta = cos(theta);
  var z, y;
  let n = 0;

  for ( n=0; n<nodes.length; n++) {
       x = nodes[n][0];
       z = nodes[n][2];
      nodes[n][0] = x * cosTheta + z * sinTheta;
      nodes[n][2] = z * cosTheta - x * sinTheta;
  }

   for ( n=0; n<normalv.length; n++) {
      x = normalv[n][0];
      z = normalv[n][2];
      normalv[n][0] = x * cosTheta + z * sinTheta;
      normalv[n][2] = z * cosTheta - x * sinTheta;
  }

};
