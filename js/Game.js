const begin=document.querySelector(".begin");
const over=document.querySelector('.over')
const isContinue=document.querySelector(".continue")
class Game{
  constructor(){
    this.sky=new Sky();
    this.land=new Land(-100);
    this.bird=new Bird();
    //柱子生成器
    this.pipeProducer=new PipePareProducer(-100);
    this.timer=null;
    this.tick=16;//移动间隔
    this.gameOver=false;
  }
  start(){
    if(this.timer){
      return
    }
    if(this.gameOver){
      window.location.reload();//重新开始游戏
    }
    this.pipeProducer.startProduce();//开始生产柱子
    this.bird.startSwing();
    this.timer=setInterval(()=>{
      const duration=this.tick / 1000;
      this.sky.move(duration);
      this.land.move(duration);
      this.bird.move(duration);
      this.pipeProducer.pairs.forEach(pair=>{
        pair.move(duration)
      });
      if(this.isGameOver()){
        this.stop();
        this.gameOver=true;
        over.style.opacity=1;
      }
    },this.tick)
  }
  isHit(rec1,rec2){
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
        var disY = Math.abs(centerY1 - centerY2);//中心点总想距离
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2
        ) {
            return true;
        }
        return false;
  }
  isGameOver(){
    if(this.bird.top === this.bird.maxY){
      //鸟碰到了大地
      return true;
    }
    for(let i=0;i<this.pipeProducer.pairs.length;i++){
      const pair=this.pipeProducer.pairs[i];
      if(this.isHit(this.bird,pair.upPipe)||this.isHit(this.bird,pair.downPipe)){
        return true;
      }
    }
    return false
  }
  stop(){
    clearInterval(this.timer);
    this.timer=null;
    this.bird.stopSwing();
    this.pipeProducer.stopProduce()
  }
  regEvent(){
    window.onkeydown=(e)=>{
      if(e.key==="Enter"){
        if(this.timer){
          this.stop();
          isContinue.style.opacity=1
         /*  if( isContinue.style.opacity===0){
            isContinue.style.opacity=1
          }else{
            isContinue.style.opacity=0
          } */
        
        }
        else{
          this.start()
          begin.style.opacity=0
          isContinue.style.opacity=0
        }
      }else if(e.key===" "){
        this.bird.jump();
      }
    }
  }
}
var g = new Game();
g.regEvent();