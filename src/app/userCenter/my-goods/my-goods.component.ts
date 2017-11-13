import {Component,OnInit} from "@angular/core";
import {TipsService} from "../../service/tips.service";
import {AssignTradeService} from "../../market/assign-trade/assign-trade.service";


@Component({
  selector:"my-goods",
  templateUrl:"my-goods.component.html",
  styles: [`
    body {
      background:#f8f8f8 !important;
    }
  `]
})

export class MyGoodsComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private goodInfoSer:AssignTradeService
  ){}
  //是否有物品
  public isHasWood = false;
  public wooList:any = [];
  ngOnInit(){
    this.getMyGoods();
  }
  //根据pId得到商品图片
  getPicbyPid(pId){
    for(let i = 0;i<this.picList.length;i++){
      if(this.picList[i].pId==pId){
        return this.picList[i].img;
      }
    }
  }
  picList = [
    {
      pId:1001,
      img:'../../../assets/images/wood_1.png',
    },
    {
      pId:2001,
      img:'../../../assets/images/wood_1.png',
    },
    {
      pId:1002,
      img:'../../../assets/images/wood_2.png',
    },
    {
      pId:1003,
      img:'../../../assets/images/wood_3.png',
    },
    {
      pId:1004,
      img:'../../../assets/images/wood_4.png',
    },
    {
      pId:1005,
      img:'../../../assets/images/wood_5.png',
    },
    {
      pId:1006,
      img:'../../../assets/images/wood_6.png',
    },
    {
      pId:4001,
      img:'../../../assets/images/green.png',
    },
  ];
  private getMyGoods(){
    this.goodInfoSer.getItemList()
      .then((res:any)=>{
        if(res){
          if(res.length>0){
            this.isHasWood = true;
          }
          this.wooList.splice(0,this.wooList.length);
          for(let i = 0;i<res.length;i++){
            let temp:any = {};
            temp.pName = res[i].pName;
            temp.id = res[i].id;
            temp.cnt = res[i].cnt;
            temp.marketValue = res[i].marketValue;
            temp.marketPrice = res[i].marketPrice.toFixed(5);
            temp.img = this.getPicbyPid(res[i].pId);
            this.wooList.push(temp);
          }
        }
      });
  }
  public headerTitle = '我的物品';
  back(){
    window.history.go(-1);
  }
}
