var BLACK;
var faceColor;
var lightVector;
var backgroundLight;
var objects;
var box1, box2, box3;
let nodeSize = 8;

var rotationX = 0.03;
var rotationY = 0.03;
var rotationZ = 0.03;


function setup() {
  BLACK = color(0, 0, 0);
  faceColor = color(80, 80, 250);
  lightVector =[0.5, -0.2, -2];
  backgroundLight = 0.1;

  backgroundColor = color(255, 255, 255);
  box1 = createCuboid(-100, -100, -100, 200, 200, 200);
  box2 = createCuboid(-400, -400, -400, 200, 200, 200);
  box3 = createCuboid(-200, -200, -200, 200, 200, 200);
  objects = [box1]
  lightVector = normaliseVector(lightVector);
  //translate3D(250,250,0, nodes);
  background(backgroundColor);
  let myCanvas = createCanvas(500, 500);
  myCanvas.parent('sketch-holder');


}


var i;
var face;

draw = function() {
  clear();
  push();
    translate(200,200);
    for (var o in objects) {
        var obj = objects[o];
        nodes = obj.nodes;

        if ('edges' in obj) {
            var edges = obj.edges;

            for (i = 0; i < edges.length; i+=1) {
                node1 = nodes[edges[i][0]];
                node2 = nodes[edges[i][1]];
                line(node1[0], node1[1], node2[0], node2[1]);
            }
        }

        if ('faces' in obj) {
            for (var f in obj.faces) {
                face = obj.faces[f];
                var fnorm = normalOfPlane(face, nodes);

                if (fnorm[2] < 0) {
                    var l = max(0, dotProduct(lightVector, normaliseVector(fnorm)));
                    l = backgroundLight + (1 - backgroundLight) * l;
                    var c = lerpColor(BLACK, faceColor, l);
                    fill(c);

                    if (face.length === 3) {
                        triangle(nodes[face[0]][0], nodes[face[0]][1],
                                 nodes[face[1]][0], nodes[face[1]][1],
                                 nodes[face[2]][0], nodes[face[2]][1]);
                    } else {
                        quad(nodes[face[0]][0], nodes[face[0]][1],
                             nodes[face[1]][0], nodes[face[1]][1],
                             nodes[face[2]][0], nodes[face[2]][1],
                             nodes[face[3]][0], nodes[face[3]][1]);
                    }
                }
            }
        }

    }


    for ( o in objects)
    {
      rotateX3D(rotationX + pRotationX/100,objects[o].nodes);
      rotateY3D(rotationY,objects[o].nodes);
      rotateZ3D(rotationZ,objects[o].nodes);
    }

    ///rotateY3D(0.005);
    pop();
};

mouseDragged = function() {
    for ( o in objects)
    {
      rotateY3D((mouseX - pmouseX)/100,objects[o].nodes);
    rotateX3D((mouseY - pmouseY)/100,objects[o].nodes);
        rotateY3D(0.005,objects[o].nodes);
    }
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


var createCuboid = function(x, y, z, w, h, d) {
    var nodes = [[x,     y,     z], [x,     y,     z + d],
                 [x,     y + h, z], [x,     y + h, z + d],
                 [x + w, y,     z], [x + w, y,     z + d],
                 [x + w, y + h, z], [x + w, y + h, z + d]];

    var faces= [[0, 1, 3, 2], [1, 0, 4, 5],
                [0, 2, 6, 4], [3, 1, 5, 7],
                [5, 4, 6, 7], [2, 3, 7, 6]];
    return { 'nodes': nodes, 'faces': faces };
};


var subtractVectors = function(v1, v2){
    return [[v1[0] - v2[0]],
            [v1[1] - v2[1]],
            [v1[2] - v2[2]]];
};

var normaliseVector = function(v) {
    var d = sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
    return [v[0]/d, v[1]/d, v[2]/d];
};

var normalOfPlane = function(face, nodes) {
    var n1 = nodes[face[0]];
    var n2 = nodes[face[1]];
    var n3 = nodes[face[2]];

    var v1 = subtractVectors(n1, n2);
    var v2 = subtractVectors(n1, n3);

    var v3 = [[v1[1]*v2[2] - v1[2]*v2[1]],
              [v1[2]*v2[0] - v1[0]*v2[2]],
              [v1[0]*v2[1] - v1[1]*v2[0]]];

    return v3;
};

var dotProduct = function(v1, v2){
    // Assume everything has 3 dimensions
    return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
};



var translate3D = function(x, y, z, nodes) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i] = [nodes[i][0] + x, nodes[i][1] + y, nodes[i][2] + z];
    }
};

// Rotate shape around the z-axis
var rotateZ3D = function(theta, nodes) {
  var st = sin(theta);
  var ct = cos(theta);
  var z, y;
  let n = 0;

  for (var i = 0; i < nodes.length; i+=1) {
        x = nodes[i][0];
        y = nodes[i][1];
        z = nodes[i][2];
        nodes[i] = [x * ct - y * st ,  y * ct + x * st, z];
    }

};

var rotateX3D = function(theta, nodes) {
  var st = sin(theta);
  var ct = cos(theta);
  var z, y;
  let n = 0;

   for (var i = 0; i < nodes.length; i+=1) {
        x = nodes[i][0];
        y = nodes[i][1];
        z = nodes[i][2];
        nodes[i] = [x, ct*y - st*z, st*y + ct*z];
    }

};

var rotateY3D = function(theta,nodes) {

  var st = sin(theta);
  var ct = cos(theta);
  var z, y;
  let n = 0;

  for (var i = 0; i < nodes.length; i+=1) {
        x = nodes[i][0];
        y = nodes[i][1];
        z = nodes[i][2];
        nodes[i] = [ct*x + st*z, y, -st*x + ct*z];
    }

};
