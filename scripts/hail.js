function setup() {
  let myCanvas = createCanvas(displayWidth, displayHeight);
  myCanvas.parent('body');
  for(var HugeHail = 0; HugeHail<25; HugeHail++){
    /*
    Initialize the arrays using a for loop, random() function, and HugeHail var.
    var HugeHail starts at zero and increases by one when the value  of Huge Hail surpasses 25 it stops
    in other words it creates 25 diffrent hail chunks (to lazy to spell correctly)
    */
    xPositions.push(random(0,displayHeight));
    yPositions.push(random(-displayWidth,displayHeight));
}

}
/*
this software creates hail once loaded and once the user clicks it'll create more
the plus sign is to influence the user to click...
*/
/***************************************all done Before you see anything**************************************************/
var xPositions = [200];
var yPositions = [1];
var i;//made var i gobal varible
var wind=1;// change this too add wind
var size_c = 23;// this is the size of the "+" that follows your cursor

/***************************************Functions**************************************************/
// /*
//creates hail based on x and y postion to make the triangles inside look like they are just moving
var hail = function(x,y){
    //This is just making the hail nothing of value
    noStroke();
    fill(45, 144, 214);
    var size_ = 40;
    triangle((x+14),(y+8),(x+10),(y-62),(x-11),(y+9));
    fill(7, 126, 212);
    triangle((x+13),(y+8),(x-32),(y-69),(x-12),(y+9));
    fill(100, 170, 219);
    triangle((x+14),(y+8),(x-10),(y-62),(x-11),(y+9));
    fill(8, 89, 148);
    triangle((x+14),(y+8),(x-46),(y-62),(x-11),(y+9));
    fill(21, 135, 217);
    triangle((x+14),(y+8),(x-67),(y-47),(x-11),(y+9));
    fill(72, 148, 199);
    ellipse(x,y,size_,size_);
};


//Draw funtion you should already know what it does
draw = function() {
    background(204, 247, 255);//sets background
    for (i = 0; i < xPositions.length; i++) {
        noStroke();
        hail(xPositions[i], yPositions[i]);
        if(yPositions[i]>displayHeight ){//&& xPositions[i]>400
            yPositions[i] = yPositions[i]-(yPositions[i]+yPositions[i]/5);
            //resetting the position by setting value to zero & adding orginal value
            if(wind===0){// if wind equals 0 it would have devided xPositions[i]/1 by zero... this is to stop it
                    xPositions[i] = xPositions[i]-(xPositions[i]+xPositions[i]/1);

                }else{
                    xPositions[i] = xPositions[i]-(xPositions[i]+xPositions[i]/wind);}

            }else{
                yPositions[i] += 5;
                xPositions[i]+= wind;//creates wind effect by changing it's X value
            }
    }
    //image(getImage("space/plus"),mouseX-(size_c/2),mouseY-(size_c/2),size_c,size_c);//this is the "+" that tells the user YOU CAN ADD MORE!!!
};



//mouseClicked function you also should know what this does
mouseClicked = function() {
    xPositions.push(mouseX);// creates hail at mouse pointer location when clicked
    yPositions.push(mouseY);
};
// */
