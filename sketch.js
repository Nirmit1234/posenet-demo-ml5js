let capture;
let posenet;
let noseX = 0;
let noseY = 0;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose;
let skeleton;
let actor_img;

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO);
    capture.size(800, 500);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);

    actor_img = loadImage('images/apple.png');
}

function receivedPoses(poses) {
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
        
    }
    console.log('Nose position:', noseX, noseY);
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    image(capture, 0, 0, 800, 500);
    fill(255, 0, 0);
    // Draw a circle at the nose position
    if (singlePose) {
        for(let i=0;i<singlePose.keypoints.length;i++){
            ellipse(singlePose.keypoints[i].position.x,singlePose.keypoints[i].position.y,20)
        }
        stroke(255,255,255);
        strokeWeight(5)
        for(let j =0;j<skeleton.length;j++){
            line(skeleton[j][0].position.x,skeleton[j][0].position.y,skeleton[j][1].position.x,skeleton[j][1].position.y)
        }

        image(actor_img,singlePose.nose.x-118,singlePose.nose.y-150,260,260)
    }
}
