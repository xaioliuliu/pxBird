/**
 * 矩形类，可以移动
 * 属性:宽度，高度，横坐标，纵坐标，横向速度，纵向速度，对应的dom对象
 * xSpeed:横向速度 单位(像素/秒) 正数向右 负数向左
 * ySpeed:纵向速度 单位(像素/秒) 正数向下 负数向上
 */
class Rectangle{
  constructor(width,height,left,top,xSpeed,ySpeed,dom){
    this.width=width;
    this.height=height;
    this.left=left;
    this.top=top;
    this.xSpeed=xSpeed;
    this.ySpeed=ySpeed;
    this.dom=dom; 
    this.render();
  }
  render() {
    this.dom.style.width=this.width+'px';
    this.dom.style.height=this.height+'px';
    this.dom.style.left=this.left+'px';
    this.dom.style.top=this.top+'px';
  }
  //duration时间
  move(duration){
    const xDistent=this.xSpeed*duration;
    const yDistent=this.ySpeed*duration;
    this.left=this.left+xDistent;
    this.top=this.top+yDistent;

    //可能会发生一些事
    if(this.onMove){
      //每次移动后，渲染前，均会调用该方法
      this.onMove();//是否存在onMove方法，存在则调用
    }
    this.render()
  }
}