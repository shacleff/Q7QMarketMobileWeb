import {Component,OnInit} from '@angular/core';
import {TipsService} from "../service/tips.service";
import { Title } from '@angular/platform-browser';
import {PromoteService} from "./promote.service";
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';

@Component({
  selector:'promote-list',
  templateUrl:'promote-list.component.html'
})
export class PromoteListComponent implements OnInit{
  constructor(
    private title:Title,
    private tips:TipsService,
    private prtSer:PromoteService
  ){}
  //总人数
  total:any;
  //推广列表
  list:any = [
    {
      id:'',//id
      realName:'',//真实姓名
      createTime:'',//注册时间
    }
  ];
  isHasOdrList = false;//默认没有委托订单、
  isLoaded = false;//是否加载完毕
  //para
  para = {
    pageNum: 1,
  };
  onLoadMore(comp:InfiniteLoaderComponent) {
    this.para.pageNum++;
    this.getPromoteList();
    comp.resolveLoading();
  }
  getPromoteList(){
    this.prtSer.getPromoteList(this.para)
    .then((res:any)=>{
      if(res){
        if(res.records.length>0){
          this.isHasOdrList = true;
        }
        if(res.records.length<=0){
          this.isLoaded = true;
        }
        this.total = res.total||0;
        let item = res.records;
        for(let i = 0;i<item.length;i++){
          let temp:any = {};
          temp.id = item[i].id;
          temp.realName = item[i].realName;
          temp.createTime = item[i].createTime;
          this.list.push(temp);
        }
      }
    })
  }

  public headerTitle = '推广列表';
  back(){
    window.history.go(-1);
  }
  ngOnInit(){
    this.getPromoteList();
    this.title.setTitle('推广列表');
  }
}
