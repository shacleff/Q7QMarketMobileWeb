import {Component,OnInit,OnDestroy} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';
import {AssignTradeService} from "./assign-trade.service";
import { InfiniteLoaderComponent } from 'ngx-weui/infiniteloader';
import {UtilService} from "../../service/util.service";
import {Router} from '@angular/router';

@Component({
  selector:'assign-trade',
  templateUrl:'assign-trade.component.html'
})
export class AssignTradeComponent implements OnInit,OnDestroy{
  constructor(
    private tips:TipsService,
    private title:Title,
    private asgTrdSer:AssignTradeService,
    private utl:UtilService,
    private router:Router
  ){}
  isHasWood = false;//默认没有木材
  selWoodCnt = 0;//默认当前选中的木材的数量为零
  isExistUser = true;//默认用户名存在
  isExistUsers = false;//默认用户名不存在
  inputPlayer = null;
  allPages:any = 10;//默认列表总页数为10
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
        if(res.length>0){
          this.isHasWood = true;
        }
        this.wooList.splice(0,this.wooList.length);
        for(let i = 0;i<res.length;i++){
          let temp:any = {};
          temp.pName = res[i].pName;
          temp.id = res[i].id;
          temp.cnt = res[i].cnt;
          temp.marketPrice = res[i].marketPrice.toFixed(5);
          temp.img = this.getPicbyPid(res[i].pId);
          this.wooList.push(temp);
        }
      }
    });
  }
  //根据pId得到商品图片
  getPicbyPid(pId){
    for(let i = 0;i<this.picList.length;i++){
      if(this.picList[i].pId==pId){
        return this.picList[i].img;
      }
    }
  }
  //选择木材
  selWood(id:string,name:string,cnt){
    this.para.itemId = id;
    console.log(id);
    this.para.pName = name;
    this.selWoodCnt = cnt;
    this.closeAlertBox();
  }
  //判断输入数量是否大于用于数量
  calcIpyNum(){
    if(this.para.cnt>this.selWoodCnt){
      this.para.cnt=this.selWoodCnt;
    }
  }
  //验证接受对象是否存在
  resetReceiveIput(){
    this.isExistUser = true;
    this.isExistUsers = false;
  }
  checkIsHasReceive(){
    if(!this.inputPlayer){
      return;
    }
    if(!this.utl.regExp().mobileNum.test(this.inputPlayer.replace(/\([^\)]*\)/g ,''))){
      this.tips.msg('用户名不存在');
      let tmp = this.inputPlayer.replace(/\([^\)]*\)/g ,'');
      console.log(tmp);
      tmp = tmp;
      this.inputPlayer = tmp+"(用户不存在)";
      this.isExistUser = false;
      this.isExistUsers = false;
      return;
    }else{
      let tmps = this.inputPlayer.replace(/\([^\)]*\)/g ,'');
      this.asgTrdSer.checkUserExist({'mobile':tmps})
      .then((res:any)=>{
        if(res){
          this.para.receMobile = tmps;
          this.inputPlayer = tmps+"("+res+")"
          this.isExistUser = true;
          this.isExistUsers = true;
        }else{
          this.para.receMobile = tmps;
          this.inputPlayer = tmps+"(用户不存在)"
          this.isExistUser = false;
          this.isExistUsers = false;
        }
      });
    }
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
        this.getOrderList(1);
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
    tradeDirection:'0',//交易方向 0是别人赠送->买（可以选择【确定】【拒绝】） 其他是赠送给别人（可以选择【撤销】）
    tuName:'14855418475',//接收人
    createTime:'645',//创建时间
    id:'521',//id
  };
  //指定交易未完成列表
  public orderList:any = [
    //this.detail
  ];
  getOrderPara = {
    pageNum:1,
    type:'0'
  };
  isHasOdrList = false;//默认没有委托订单、
  isLoaded = false;//是否加载完毕
  //得到订单列表->未完成
  getOrderList(pageNum?){
    if(pageNum){
      this.getOrderPara.pageNum=1;
      this.orderList.splice(0,this.orderList.length);
    }
    this.asgTrdSer.getList(this.getOrderPara)
    .then((res:any)=>{
      if(res){
        this.allPages = res.pages;
        if(res.records.length>0){
          this.isHasOdrList = true;
        }
        if(res.records.length<=0){
          this.isLoaded = true;
        }
        var items = res.records;
        for(let i = 0;i<items.length;i++){
          let temp:any = {};
          temp.proName = items[i].proName;
          temp.cnt = items[i].cnt;
          temp.amt = items[i].amt;
          temp.charge = items[i].charge;
          temp.suName = items[i].suName;
          temp.tradeDirection = items[i].tradeDirection;
          temp.createTime = items[i].createTime;
          temp.id = items[i].id;
          this.orderList.push(temp);
        }
      }
    })
  }
  onLoadMore(comp:InfiniteLoaderComponent){
    this.getOrderPara.pageNum++;
    if(this.getOrderPara.pageNum>this.allPages+1){
      comp.resolveLoading();
      return;
    }
    this.getOrderList();
    comp.resolveLoading();
  }
  //确定指定交易订单
  confirmAssignTrade(event:Event,id:string,cnt,amt,proName){
    event.stopPropagation();
    let tipsText = '确认交易此订单吗？</br>商品名称：'+proName+'<br/>交易数量:'+cnt+'<br/>支付金币:'+amt;
    this.tips.showConIpt(tipsText,(pwd)=>{
      if(!pwd){
        return;
      }
      this.asgTrdSer.confirmAssignTrade({id:id,payPassword:pwd})
        .then((res:any)=>{
          if(res){
            this.tips.msg('交易成功');
            this.getOrderList(1);
          }
        })
    },()=>{});
  }
  //拒绝指定交易订单
  refuseAssignTrade(event:Event,id:string){
    event.stopPropagation();
    this.tips.showConDia('确认拒绝此订单吗？',()=>{
      this.asgTrdSer.refuseAssignTrade({id:id})
        .then((res:any)=>{
          if(res){
            this.tips.msg('拒绝成功');
            this.getOrderList(1);
          }
        })
    },()=>{})
  }
  //取消指定交易订单
  cancelAssignTrade(event:Event,id:string){
    event.stopPropagation();
    this.tips.showConDia('确认取消此订单吗？',()=>{
      this.asgTrdSer.cancelAssignTrade({id:id})
        .then((res:any)=>{
          if(res){
            this.tips.msg('取消成功');
            this.getOrderList(1);
          }
        })
    },()=>{});
  }

  public isShowAlert:boolean = false;
  public isShowDetail:boolean = false;

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

  public headerTitle = '指定交易';
  back(){
    window.history.go(-1);
  }
  //底部切换去市场
  toMarket(){
    this.router.navigate(['market',this.utl.marketUrl]);
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
    this.getOrderList();
    this.title.setTitle('指定交易');
  }
  ngOnDestroy(){
    this.closeAlertBox();
    this.closeDetailBox();
  }
}
