images = "";
img = "";
status = "";
object = [];
checker = false;
function preload(){
    console.log(image);
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd',loaded);
}
function loaded(){
    console.log("Model has been loaded");
    objectDetector.detect(video, results);
    status = true;
}
function results(error,result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        object = result;
    }
}
function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        objectDetector.detect(video, results);
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0;i<object.length;i++){
            fill(r,g,b);
            percent = Math.floor(object[i].confidence*100);
            document.getElementById("objects").innerHTML = "The number of elements are "+object.length;
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            if(object[i].label == "person"){
                checker = true;
            }else if(object[i].label != "person"){
                checker = false;
            }
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
        if(checker == false){
            document.getElementById("status").innerHTML = "Baby is not there";
        }else{
            document.getElementById("status").innerHTML = "Baby is there";
        }
        if(object.length<0){
            document.getElementById("status").innerHTML = "Baby not detected";

        }
    }
}
