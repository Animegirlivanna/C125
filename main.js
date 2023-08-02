function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    canvas = createCanvas(550, 550);
    canvas.position(560, 150);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


rightWristX = 0;
leftWristX = 0;
difference = 0;
noseX = 0;
noseY = 0;

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = "+noseX + " noseY ="+ noseY);
        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log(rightWristX, leftWristX, difference);
    }
}

function modelLoaded() {
    console.log("model is loaded");
}

function draw() {
    background('palevioletred');
    fill("purple");
    stroke("black");
    square(noseX, noseY, difference);
}