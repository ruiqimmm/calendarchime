let radi;
let ang;
let bgc, bleck;
let eyclr;
let eydist;
let blinkbool;
var cnv;

function setup() {
    let browser = false;

    if (browser) {
        cnv = createCanvas(windowWidth, windowHeight);
        cnv.position(0, 0);
        cnv.parent('sketch-holder');
    }
    else {
        createCanvas(windowWidth, windowHeight);
    }



    angleMode(DEGREES);
    colorMode(HSB);

    eyclr = random(1, 360);
    bgc = 100;
    bleck = 10;
    radi = height / 8;
    eydist = width / 16;
    blinkbool = false;




}

function draw() {
    background(bgc);
    rightEye = new Eye(width / 2 + eydist, height / 2, radi);
    leftEye = new Eye(width / 2 - eydist, height / 2, radi);
    push();
    fill(0, 0, bleck);
    noStroke();
    ellipse(width / 2, height / 2, radi * 5, radi * 3);
    pop();

    if (mouseIsPressed) {
        rightEye.blink();
        leftEye.blink();
    }
    else {
        rightEye.draw();
        leftEye.draw();
    }
}

function Eye(x, y) {
    this.x = x;
    this.y = y;
    this.d = radi;
    this.distance = 0;
    this.angle = 0;

    this.blink = function () {
        push();
        strokeWeight(3);
        stroke(0, 0, bleck);
        fill(bgc);
        ellipse(this.x, this.y, this.d);
        pop();
        push();
        noFill();
        stroke(0, 0, bleck);

        //line(this.x-radi/2, this.y, this.x + radi/2, this.y);
        arc(this.x, this.y - radi / 4, radi * 1.3, radi * 0.8, 0, 180);
        pop();
    }

    this.draw = function () {
        stroke(0, 0, bleck);
        strokeWeight(3);
        fill(bgc);
        ellipse(this.x, this.y, this.d);
        push();
        noStroke();
        fill(eyclr, 50, 50);
        this.distance = constrain(int(dist(this.x, this.y, mouseX, mouseY)), 0, height);
        this.eyePos = map(this.d / 3, 0, 2000, 0, this.distance);
        this.angle = atan2(mouseY - this.y, mouseX - this.x);
        translate(this.x, this.y);
        rotate(this.angle);
        ellipse(this.eyePos, 0, this.d / 2);
        pop();
        push();
        noStroke();
        fill(0, 0, bleck);
        this.distance = constrain(int(dist(this.x, this.y, mouseX, mouseY)), 0, height);
        this.eyePos = map(this.d, 0, 10000, 0, this.distance);
        this.angle = atan2(mouseY - this.y, mouseX - this.x);
        translate(this.x, this.y);
        rotate(this.angle);
        ellipse(this.eyePos / 0.4, 0, this.d / 5);
        pop();

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    radi = height / 8;
    eydist = width / 12;


    rightEye = new Eye(width / 2 - radi, height / 2, radi);
    leftEye = new Eye(width / 2 + radi, height / 2, radi);
}

function mouseClicked() {
    eyclr = random(1, 360);
}


