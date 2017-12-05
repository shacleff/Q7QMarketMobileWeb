import {Directive,ElementRef,Renderer,AfterViewChecked} from '@angular/core';

@Directive({
  selector:'[vertical]'
})

export class VerticalCenterDirective implements AfterViewChecked{
  constructor(private el:ElementRef,private render:Renderer){

  }
  private verticalCenter():void{//垂直居中
    let wHeight = parseInt($(window).height());//窗口高度
    let elHeight = parseInt(this.el.nativeElement.clientHeight)//指令绑定元素高度
    this.el.nativeElement.style.top = (wHeight-elHeight)/2+'px';
  }
  //获取dom元素需要在AfterViewChecked后
  ngAfterViewChecked(){
    this.verticalCenter();
  }
}
