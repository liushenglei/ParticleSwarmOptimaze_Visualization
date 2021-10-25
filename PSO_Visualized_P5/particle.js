
class Particle {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.currinfo = {
        };
        this.hisinfo = [];
        this.hisdistinfo = [];
        this.w = 0.9;                                          //初始化惯性权重为0.9
    }

    initialize() {
        this.color = color(random(255), random(255), random(255));
        this.vel = p5.Vector.random2D();
        this.vel.mult(0.2);
    }

    update() {   //更新粒子位置
        if (this.pBestloc != null) {
            this.pBestvel = p5.Vector.sub(this.pBestloc, this.pos);
            this.gBestvel = p5.Vector.sub(pars.gBestloc, this.pos);
            this.pBestvel.mult(2.0 * random(1));                 //pBest分量
            this.gBestvel.mult(2.0 * random(1));                 //gBest分量
            if(this.w > 0.4){                                    //惯性权重减速
                this.w -= 0.0003;
            }
            this.vel.mult(this.w);
            this.vel.add(this.pBestvel).add(this.gBestvel);      //冲向目标!
        }
        this.pos.add(this.vel);
    }

    display() {  //粒子可视化
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }

    cacuDist() {
        this.dist = p5.Vector.dist(this.pos, food);   //计算到目标的距离
        this.currinfo = {            //储存粒子距离与位置信息
            dist: this.dist,         //重要：js[]数组无法正确储存向量变量    
            posx: this.pos.x,
            posy: this.pos.y,
        }
        this.hisdistinfo.push(this.dist);;
        this.hisinfo.push(this.currinfo);  //将信息添加到数组末尾
        this.minDist = Math.min(...this.hisdistinfo);  //计算当前个体最小距离
        if (this.hisinfo.length != null) {
            this.pBestIndex = this.hisinfo.findIndex(({ dist }) => dist === this.minDist);
            this.pBestloc = createVector(this.hisinfo[this.pBestIndex].posx, this.hisinfo[this.pBestIndex].posy);
            // this.hisdistinfo.shift();    //限制数组长度
            // this.hisinfo.shift();
        }
    }

    constrainVel() {   //限制速度函数
        if (this.vel.x > 2) {
            this.vel.x = 2;
        }
        if (this.vel.y > 2) {
            this.vel.y = 2;
        }
        if (this.vel.x < -2) {
            this.vel.x = -2;
        }
        if (this.vel.y < -2) {
            this.vel.y = -2;
        }
    }

    constrainPos() {     //若位置出界,则重新随机设定
        if (this.pos.x > windowWidth) {
            this.pos.x = random(windowWidth);
        }
        if (this.pos.x < 0) {
            this.pos.x = random(windowWidth);
        }
        if (this.pos.y > windowHeight) {
            this.pos.y = random(windowHeight);
        }
        if (this.pos.y < 0) {
            this.pos.y = random(windowHeight);
        }
    }
}