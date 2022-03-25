music = "";
status = "";

function preload(){
    music = loadSound("detective.mp3");
}

 function setup(){
    canvas = createCanvas(480, 640);
    canvas.parent('canvas');
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,640);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(video,0,0,480,640);
    objectDetector.detect(video, gotResults);

    if(status != ""){
        if(status == person){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("detection").innerHTML = "Baby Found!";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent +"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height);
        }
        }
    } else{
        music.play();
        document.getElementById("status").innerHTML = "Status : Objects did not Found";
        document.getElementById("detection").innetHTML = "Baby did not found"
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}