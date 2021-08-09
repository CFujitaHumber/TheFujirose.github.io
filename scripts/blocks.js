/*

Carson Fujita.

Doing: Depth Sorting

*/

//Color
var BLACK;

//Light
var backgroundLight;

var objects;

//Rotation and graphics
const nodeSize = 8;
var bRotationX = 0.003;
var bRotationY = 0.003;
var bRotationZ = 0.003;


function setup()
{
  //Block Scope Variables
  let cubiods;
  let cube1, cube2, cube3;


  //Lighting and color
  BLACK = color(0, 0, 0);
  faceColor = color(88, 23, 33);
  backgroundLight = 0.1;
  backgroundColor = color(255, 255, 255);

  //Object Creation
  cube1 = createCuboid
  (
   -100, -100, -100, //Position
    100,  100,  100, //Size
    color(88, 23, 33) // Face Color
  );

  cube2 = createCuboid
  (
     -40,  -40,  -40, //Position
      20,   20,   20, //Size
    color(55, 53, 0) // Face Color
  );

  cube3 = createCuboid
  (
    -20, -100, -140, //Position
     20,   20,   20, //Size
    color(255, 5, 5) //Face Color
  );

  //List objects
  objects = [cube1, cube2, cube3];

  for (let o in objects)
  {
    let obj = objects[o];
    obj.lightVector = normaliseVector(obj.lightVector);
  }





  background(backgroundColor);
  let myCanvas = createCanvas(400, 400);
  myCanvas.parent('sketch-holder');


}

draw = function()
{
  clear();
  push();


  translate(200,200);
  render();


  for (let o in objects)
  {
    rotateX3D(bRotationX + 0.003 - rotationX/1200,objects[o].nodes);
    rotateY3D(bRotationY + rotationY/1200,objects[o].nodes);
    rotateZ3D(bRotationZ + rotationZ/1200,objects[o].nodes);
  }

  pop();
};

mouseDragged = function()
{
    for (var o in objects)
    {
      rotateY3D((mouseX - pmouseX)/100,objects[o].nodes);
      rotateX3D((mouseY - pmouseY)/100,objects[o].nodes);
      rotateY3D(0.005,objects[o].nodes);
    }
};

//** Mathematics **//

var calculateNormal = function(ax, ay, az, bx, by, bz)//calcutes the normal of this surface
{
  let x = ay * bz - az * by;
  let y = az * bx - ax*bz;
  let z = ax*by - ay*bx;
  let output = [x,y,z];
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

//** Rotatation **//

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


//Objects


var createCuboid = function(x, y, z, w, h, d, c) {
    var nodes = [[x,     y,     z], [x,     y,     z + d],
                 [x,     y + h, z], [x,     y + h, z + d],
                 [x + w, y,     z], [x + w, y,     z + d],
                 [x + w, y + h, z], [x + w, y + h, z + d]];

    var faces= [[0, 1, 3, 2], [1, 0, 4, 5],
                [0, 2, 6, 4], [3, 1, 5, 7],
                [5, 4, 6, 7], [2, 3, 7, 6]];


    var faceColor = c;

    var lightVector = [0.5, -0.2, -2];

    return { 'nodes': nodes, 'faces': faces , 'faceColor': faceColor, 'lightVector': lightVector};
}

/*
var createCuboid = function(x, y, z, w, h, d, c, l)
{
  var nodesBuffer = [[x,     y,     z], [x,     y,     z + d],
                 [x,     y + h, z], [x,     y + h, z + d],
                 [x + w, y,     z], [x + w, y,     z + d],
                 [x + w, y + h, z], [x + w, y + h, z + d]];

  createPoly(c,l)
  }
*/







var createPoly = function(nodes, c, light)
{
  var face =  [0,1,3,2];
  var faceColor = c;
  var lightVector = light;
  return { 'nodes': nodes, 'face': face , 'color': color, 'lightVector': lightVector};
}

var getDepth = function(nodes)
{
  var depth = nodes[0][2];
  for (let n in nodes)
  {
    if(depth < nodes[n][2])
    {
      depth = nodes[n][2];
    }
  }
  return depth;
}

//Rendering

var render = function()
{
  for (let o in objects) {
        let obj = objects[o];
        nodes = obj.nodes;

        if ('edges' in obj) {
            let edges = obj.edges;

            for (let i = 0; i < edges.length; i+=1) {
                node1 = nodes[edges[i][0]];
                node2 = nodes[edges[i][1]];
                line(node1[0], node1[1], node2[0], node2[1]);
            }
        }

        if ('faces' in obj)
        {
            for (let f in obj.faces)
            {
                face = obj.faces[f];
                let fnorm = normalOfPlane(face, nodes);

                if (fnorm[2] < 0)
                {
                    let l = max(0, dotProduct(obj.lightVector, normaliseVector(fnorm)));
                    l = backgroundLight + (1 - backgroundLight) * l;
                    let c = lerpColor(BLACK, obj.faceColor, l);
                    fill(c);

                    if (face.length === 3)
                    {
                        triangle(nodes[face[0]][0], nodes[face[0]][1],
                                 nodes[face[1]][0], nodes[face[1]][1],
                                 nodes[face[2]][0], nodes[face[2]][1]);
                    } else
                    {
                        quad(nodes[face[0]][0], nodes[face[0]][1],
                             nodes[face[1]][0], nodes[face[1]][1],
                             nodes[face[2]][0], nodes[face[2]][1],
                             nodes[face[3]][0], nodes[face[3]][1]);
                    }
                }
            }
        }

    }
}


//depth sort
/*
Conceptually Painter's Algorithm works as follows:

Sort each polygon by depth
Place each polygon from the furthest polygon to the closest polygon
*/

var depthBuffering = function()
{
  let nodes, edges, faces, obj;
  for (let o in objects)
  {
        obj = objects[o];
        nodes = obj.nodes;


        if ('faces' in obj)
        {
          face = obj.faces[f];
        }



  }
}
