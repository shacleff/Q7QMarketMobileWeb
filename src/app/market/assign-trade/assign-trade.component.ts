import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';
import {AssignTradeService} from "./assign-trade.service";

@Component({
  selector:'assign-trade',
  templateUrl:'assign-trade.component.html'
})
export class AssignTradeComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title,
    private asgTrdSer:AssignTradeService
  ){}
  //拥有木材列表
  public wooList:any=[
    //{
    //  pName:'',//名称
    //  id:'',//id
    //  cnt:'',//数量
    //  marketPrice:'',//市场价格
    //}
  ];
  //得到玩家拥有木材数量
  getItemList(){
    this.asgTrdSer.getItemList()
    .then((res:any)=>{
      if(res){
        this.wooList.splice(0,this.wooList.length);
        for(let i = 0;i<res.length;i++){
          let temp:any = {};
          temp.pName = res[i].pName;
          temp.id = res[i].id;
          temp.cnt = res[i].cnt;
          temp.marketPrice = res[i].marketPrice.toFixed(5);
          this.wooList.push(temp);
        }
      }
    });
  }
  //选择木材
  selWood(id:string,name:string){
    this.para.itemId = id;
    this.para.pName = name;
    this.closeAlertBox();
  }
  //提交数据
  para = {
    itemId: null,//交易物品id
    receMobile: null,//接收人手机号
    cnt: null,//交易数量
    amt: null,//索取金币
    payPwd: null,//支付密码
    pName:null
  };
  //提交指定指定交易表单
  public specifyTran(){
    if(!this.para.itemId){
      this.tips.msg('请选择要交易的商品');
      return;
    }
    if(!this.para.receMobile){
      this.tips.msg('请填写接收人');
      return;
    }
    if(!this.para.cnt){
      this.tips.msg('请填写交易数量');
      return;
    }
    if(!this.para.amt){
      this.tips.msg('请填写要索取的金币');
      return;
    }
    if(!this.para.payPwd){
      this.tips.msg('请添加支付密码');
      return;
    }
    this.asgTrdSer.specifyTran(this.para)
    .then((res:any)=>{
      if(res){
        this.tips.msg('提交成功');
        for(let key in this.para){
          this.para[key] = null;
        }
      }
    });
  }
  //当前选择的订单的详情
  public detail:any = {
    proName:'梧桐木',//商品名
    cnt:'212',//数量
    amt:'212',//索取金币
    charge:'23',//手续费
    suName:'13855418475',//赠送人
    tradeDirection:'1',//交易方向 0是别人赠送->买（可以选择【确定】【拒绝】） 其他是赠送给别人（可以选择【撤销】）
    tuName:'14855418475',//接收人
    createTime:'645',//创建时间
    id:'521',//id
  };
  //指定交易未完成列表
  public orderList:any = [
    this.detail
  ];
  //确定指定交易订单
  confirmAssignTrade(event:Event,id:string){
    event.stopPropagation();
    this.asgTrdSer.confirmAssignTrade({id:id})
    .then((res:any)=>{
      if(res){

      }
    })
  }
  //拒绝指定交易订单
  refuseAssignTrade(event:Event,id:string){
    event.stopPropagation();
    this.asgTrdSer.refuseAssignTrade({id:id})
    .then((res:any)=>{
      if(res){

      }
    })
  }
  //取消指定交易订单
  cancelAssignTrade(event:Event,id:string){
    event.stopPropagation();
    this.asgTrdSer.cancelAssignTrade({id:id})
    .then((res:any)=>{
      if(res){

      }
    })
  }

  public isShowAlert:boolean = false;
  public isShowDetail:boolean = false;

  public headerTitle = '指定交易';
  back(arm:any){
    window.history.go(-1);
  }
  //打开选择订单详情
  public openDetailBox(detail:any){
    this.detail = detail;
    this.tips.showLayer();
    this.isShowDetail = true;
  }
  //关闭选择订单详情
  public closeDetailBox(){
    this.tips.hideLayer();
    this.isShowDetail = false;
  }
  //关闭选择木材弹出层
  public closeAlertBox(){
    this.tips.hideLayer();
    this.isShowAlert = false;
  }
  //打开选择木材弹框
  public openAlertBox(){
    this.getItemList();
    this.tips.showLayer();
    this.isShowAlert = true;
  }
  ngOnInit(){
    this.title.setTitle('指定交易');
  }
}
