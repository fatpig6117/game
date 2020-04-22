// padaLab@gmail.com

class RectSystem{
    constructor(startX, startY){
        this.startX=startX;
        this.startY=startY;
        this.vx=1;
        this.rects=[];
    }
    update(){
        this.startX+=this.vx;
        if(this.startX>=ctx.canvas.width){
            this.vx=-1;
        }else if(this.startX<=0){
            this.vx=1;
        }
        this.startX++;
        this.rects.push(new Rect(this.startX, this.startY))
        for(let i=0;i<this.rects.length;i++){
            let die=this.rects[i].update();
            if(die){
                this.rects.splice(i,1);
                i--;
            }
        }
    }
    render(){
        for(let i=0;i<this.rects.length;i++){
            this.rects[i].render();
        }
    }
}
class Rect{
    constructor(x,y,vx,vy){
        this.x=x;
        this.y=y;
        this.vx=Math.random()*2; //0~2
        this.vy=0;
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        this.vy+=0.02;
        // 回傳 true 代表可以清除這個物件
        return this.x>ctx.canvas.width || this.x<0 || this.y>ctx.canvas.height || this.y<0;
    }
    render(){
        ctx.fillRect(this.x, this.y, 5, 5)
    }
}