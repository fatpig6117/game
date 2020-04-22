class SmokeSystem{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.life=500;
        this.smokes=[];
    }
    update(){
        this.life--;
        this.smokes.push(new Smoke(this.x, this.y));
        for(let i=0; i<this.smokes.length; i++){
            let die=this.smokes[i].update();
            if(die){
                this.smokes.splice(i,1);
                i--;
            }
        }
        return this.life<=0;
    }
    render(){
        for(let i=0; i<this.smokes.length; i++){
            this.smokes[i].render();
        }
    }
}
class Smoke{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.vx=Math.random()*0.5-0.25 // -0.5~0.5
        this.vy=Math.random()*1-1.5 // -0.5~-2
        this.size=5;
        this.alpha=1; //透明度
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        this.size+=0.5;
        this.alpha-=0.006;
        if(this.alpha<=0){
            this.alpha=0;
        }
        this.vy-=0.002 ;
        
        return this.y<-20 ||  this.alpha==0;
    }
    render(){
        ctx.globalAlpha=this.alpha;
        ctx.drawImage(
            smokeImage,  // 已載入的物件
            this.x-this.size/2, this.y-this.size/2,   // 位置
            this.size, this.size // 尺寸
        );
    }
}