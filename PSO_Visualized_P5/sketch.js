let food;
let pars;
let num = 4;

function setup() {
  frameRate(18);
  pars = new ParticleSystem(num);  //创建粒子群
  pars.iniParticles();
  createCanvas(windowWidth, windowHeight);
  genTarget();
}

function genTarget() {          //创建目标
  food = createVector(random(0.7 * windowWidth), random(0.7 * windowHeight));
  fill(255, 0, 0);
  ellipse(food.x, food.y, 20, 20);
}

function draw() {
  pars.partsDisplay();     //显示粒子
  pars.findpBest();        //PSO-Algorithm
  console.log(windowHeight,windowWidth);
}











