img = "";
status = "";
objects = [];

function preload() {
    /*img = loadImage("dog_cat.jpg");*/
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;

}

function gotResult(error, Results) {
    if (error) {
        console.log(error);
    }
    console.log(Results);
    objects = Results
}

function draw() {
    document.getElementById("number_of_object").innerHTML = " baby not found";
    image(video, 0, 0, 380, 380);
    if (status != "") 
    {
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : Object Detected";
           document.getElementById("number_of_object").innerHTML = " baby found";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function start() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";

}