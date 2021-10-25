class ParticleSystem {

    constructor(num) {
        this.num = num;
        this.parts = [];
        this.gBestDists = [];
        this.gBestinfo = [];
        this.isSearch = true;
    }


    iniParticles() {                 //初始化每个粒子
        for (let i = 0; i < this.num; i++) {
            this.parts[i] = new Particle(random(0.8 * windowWidth), random(0.8 * windowHeight));
            this.parts[i].initialize();
        }
    }

    partsDisplay() {
        if (this.isSearch) {
            for (let i = 0; i < this.num; i++) {
                this.parts[i].display();
                this.parts[i].update();
                this.parts[i].cacuDist();   //计算粒子到目标的距离
                this.parts[i].constrainVel();
                this.parts[i].constrainPos();
            }
        }
    }

    findpBest() {
        for (let i = 0; i < this.num; i++) {
            this.pBest = {
                pBestDist: this.parts[i].minDist,
                pBestlocx: this.parts[i].pBestloc.x,
                pBestlocy: this.parts[i].pBestloc.y,
            }
            this.gBestDists.push(this.parts[i].minDist),
                this.gBestinfo.push(this.pBest);
        }
        this.gMinDist = Math.min(...this.gBestDists);  //计算当前群体最小距离
        if(this.gMinDist < 3){
           this.isSearch = false;
        }
        this.gBestIndex = this.gBestinfo.findIndex(({ pBestDist }) => pBestDist === this.gMinDist);
        this.gBestloc = createVector(this.gBestinfo[this.gBestIndex].pBestlocx, this.gBestinfo[this.gBestIndex].pBestlocy);
    }
}