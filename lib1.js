let ga={
    lib:{}, ctx:null, audio:null, 
    res:{
        total:8, loaded:0,
        sounds:{
            bullet:"bullet.mp3", explosion:"explosion.mp3", hihat:"hihat.wav", kick:"kick.wav", snare:"snare.wav"
        },
        imgs:{
            plane:"plane.png", explosion:"explosion.png", smoke:"smoke.png"
        }
    },
    game:{
        id:0,
        circle:0, // 回合數(畫面更新次數)
        particles:null, plane:null,
        key:{
            left:false, top:false, right:false, bottom:false, 
            space:false,
        }
    }
};
// 定義需要用到的類別
ga.lib.bulletSystem=class{
    constructor(){
        this.bullets=[]; 
        this.m=0;
    }
    update(){
        this.m=Math.random()*100;
        if(ga.game.circle%4==0){
            if(this.m>=75){
                this.bullets.push(new ga.lib.Bullet(0,Math.random()*675))
            }
            if(this.m<=25){
                this.bullets.push(new ga.lib.Bullet(900,Math.random()*675))
            }
            if(25<=this.m<=50){
                this.bullets.push(new ga.lib.Bullet(Math.random()*900,0))
            }
            if(50<=this.m<=75){
                this.bullets.push(new ga.lib.Bullet(Math.random()*900,675))
            }
            //this.bullets.push(new ga.lib.Bullet(0,0))
        }
        for(let i=0; i<this.bullets.length;i++){
            let die=this.bullets[i].update();
            if(die){
                this.bullets.splice(i, 1);
                i--;
            }
        }
    }
    render(){
        for(let i=0; i<this.bullets.length; i++){
            this.bullets[i].render();
        }
    }
}

ga.lib.Bullet=class{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.vx=Math.random()*2-1;
        this.vy=Math.random()*2-1;
        this.size=2;
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        return this.x>ga.ctx.canvas.width || this.x<0 || this.y<0 || this.y>ga.ctx.canvas.width || -0.75<=this.vx<=0.75 || -0.75<=this.vy<=0.75;
    }
    render(){
        ga.ctx.save();
        ga.ctx.fillStyle="white";
        ga.ctx.beginPath();
        ga.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
        ga.ctx.fill();
        ga.ctx.restore();
    }
}

ga.lib.Plane=class{
    constructor(){
        this.x=ga.ctx.canvas.width/2;
        this.y=ga.ctx.canvas.height/2;
        this.size=30;
    }
    update(){
        let speed=2;
        let key=ga.game.key;
        if(key.space){
            speed*=1.5;
        }
        if(key.left){
            this.x-=speed
        }
        if(key.right){
            this.x+=speed
        }
        if(key.top){
            this.y-=speed
        }
        if(key.bottom){
            this.y+=speed
        }
        if(this.x<=15){
            this.x=15
        }
        if(this.y<=15){
            this.y=15
        }
        if(this.y>=660){
            this.y=660
        }
        if(this.x>=885){
            this.x=885
        }
        return false;
    }
    render(){
        ga.ctx.save(); // 儲存 Canvas 的設定
        ga.ctx.drawImage(
            ga.res.imgs.plane,
            this.x-this.size/2,this.y-this.size/2,
            this.size, this.size
        );
        if(ga.game.key.space){
            ga.ctx.drawImage(
                ga.res.imgs.explosion, this.x-this.size/3+4, this.y+this.size/3+5,
                15, 15
            )
        }
        ga.ctx.restore(); // 取回上一輪存的設定
    }
};