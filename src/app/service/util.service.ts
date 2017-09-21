import {Injectable} from '@angular/core';

@Injectable()

export class UtilService{
  constructor(){

  };
  public regExp(){//正则表达式
      const regexp = {
          mobileNum : /^1(3|4|5|7|8)\d{9}$/,//手机号
          IDCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//身份证
          checkCode: /^\d$/,//验证码
          name:new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$"),//姓名
      }
      return regexp;
  }
  //数组对象操作
  //对象列表转数组
  public objToArray(obj:any){
    var arr = new Array();
    for(let key in obj){
      arr.push(obj[key]);
    }
    return arr;
  }
  //状态数字转文字
  public toSts(sts:any) {
    if (sts == '1') {
      return '未成交';
    } else if (sts == '2') {
      return '部分成交';
    } else if (sts == '3') {
      return '完全成交';
    } else if (sts == '4') {
      return '手动撤消';
    } else if (sts == '5') {
      return '自动撤消';
    } else if (sts == '6') {
      return '异常撤消';
    } else {
      return '待处理'
    }
  }
  //指定交易订单状态数字转文字
  public showStatus(status:any) {
    if (status == '0') {
      return '待确定';
    } else if (status == '1') {
      return '已交易';
    } else if (status == '2') {
      return '已撤消';
    } else if (status == '3') {
      return '已拒绝';
    } else if (status == '4') {
      return '失败';
    } else {
      return '';
    }
  }

}
