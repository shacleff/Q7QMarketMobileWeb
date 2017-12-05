import {Component,OnInit,AfterViewInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import {UserCenterService} from "../user-center.service";
import {UtilService} from "../../service/util.service";
@Component({
  selector:'name-auth',
  templateUrl:'name-auth.component.html'
})
export class NameAuthComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title,
    private sanitizer:DomSanitizer,
    private ucSer:UserCenterService,
    private util:UtilService
  ){}
  public headerTitle = '完善实名认证';

  //当前用户认证等级
  public certLevel = "";
  //当前用户认证状态
  public levelStatus = "";
  //获取验证码里面的图片
  public getCodeText = '获取验证码';
  // 60s后重新获取
  private timer = 60;
  //定时器
  private interVal = null;
  //是否可以点击获取验证码
  public  canGetVcode = true;
  //认证审核中提示信息
  public tipsMsg = '认证审核中...认证审核中..';
  //C1认证参数
  public C1Para = {
    "code": "",
    "idcard": "",
    "realName": ""
  };
  //获取认证验证码
  public getMsgCode(){
    if(!this.canGetVcode){
      this.tips.msg('请稍后再试');
      return;
    }
    this.ucSer.getC1MsmCode()
      .then((res:any)=>{
        if(res){
          this.interVal = setInterval(()=>{
            this.timer--;
            this.canGetVcode = false;
            this.getCodeText = '重新获取'+this.timer;
            if(this.timer<0){
              clearInterval(this.interVal);
              this.timer=60;
              this.canGetVcode = true;
              this.getCodeText = '获取验证码';
            }
          },1000);
          this.tips.msg('验证码发送成功');
        }
      })
  }
  //提交实名认证申请C1
  public submit(){
    if(!this.C1Para.realName){
      this.tips.msg('请填写你的真实姓名');
      return;
    }else if(!this.util.regExp().name.test(this.C1Para.realName)){
      this.tips.msg('姓名格式有误');
      return;
    }else if(!this.C1Para.idcard){
      this.tips.msg('请填写你的身份证');
      return;
    }else if(!this.util.regExp().IDCard.test(this.C1Para.idcard)){
      this.tips.msg('身份证格式有误');
      return;
    }else if(!this.C1Para.code){
      this.tips.msg('请填写短信验证码');
      return;
    }
    this.ucSer.subC1Para(this.C1Para)
      .then((res:any)=>{
        if(res){
          this.tips.msg('提交成功');
          this.getUserInfo();
        }
      })
  }
  //获取用户认证信息
  getUserInfo(){
    this.ucSer.getUserInfo()
      .then((res:any)=>{
        if(res){
          let info = res.userInfo;
          this.certLevel = info.certLevel;
          this.levelStatus = info.levelStatus;
          if(this.levelStatus=='1'){//状态审核中
            if(this.certLevel=='C0'){//等级为C0
              this.tipsMsg = '认证正在审核中,您当前的认证等级为[C0],审核成功后将获得[C1]认证,\n如实名信息有误，请主动联系客服进行修改以后，再重新进行认证！'
            }else if(this.certLevel=='C1'){
              this.tipsMsg = '认证正在审核中,您当前的认证等级为[C1],审核成功后将获得[C2]认证,\n如实名信息有误，请主动联系客服进行修改以后，再重新进行认证！'
            }
          }
          if(this.certLevel=='C2'){//当前等级为C2，已全部通过认证
            this.tipsMsg = '你已通过全部认证,您当前的认证等级为[C2],\n如实名信息有误，请主动联系客服进行修改以后，再重新进行认证！'
          }
        }
      });
  }
  back(){
    window.history.go(-1);
  }
  para:any = {
    passportFrontImg:null,
    passportBackImg:null
  };//省份证图片信息
  imageUrl:any;
  imageUrlRvs:any;
  /*onChangeSelectFile(event){
    const file = event.currentTarget.files[0];
    this.para.passportFrontImg = file;
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }
  onChangeSelectFileRvs(event){
    const fileRvs = event.currentTarget.files[0];
    this.para.passportBackImg = fileRvs;
    this.imageUrlRvs = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileRvs));
  }*/
  //上传用户身份证图片 实名认证C2
  commitCert(){
    if(!this.para.passportFrontImg){
      this.tips.msg('请上传身份证正面');
      return;
    }
    if(!this.para.passportBackImg){
      this.tips.msg('请上传身份证反面');
      return;
    }
    this.ucSer.commitCert(this.para)
      .then((res:any)=>{
        if(res){
          this.tips.msg('上传成功,请耐心等待审核');
          this.getUserInfo();
        }
      })
  }
  /*commitCert(){
    if(!this.para.passportFrontImg){
      this.tips.msg('请上传身份证正面');
      return;
    }
    if(parseInt(this.para.passportFrontImg.size)>200*1000){
      this.tips.msg('身份证正面图片不能超过200kb');
      return;
    }
    if(!this.para.passportBackImg){
      this.tips.msg('请上传身份证反面');
      return;
    }
    if(parseInt(this.para.passportBackImg.size)>200*1000){
      this.tips.msg('身份证反面图片不能超过200kb');
      return;
    }
    console.log(this.para);
    this.ucSer.commitCert(this.para)
    .then((res:any)=>{
      if(res){
        this.tips.msg('上传成功');
      }
    })
  }*/
  ngOnInit(){
    this.title.setTitle('完善实名认证');
    this.getUserInfo();
  }
  //上传正面身份证
  upFrontIdCard(){
    let self = this;
    let frontImgUrl;
    let frontImgName;
    //身份证正面上传
    let uploader = new plupload.Uploader({
      browse_button: 'idCard', //触发文件选择对话框的按钮，为那个元素id
      url: 'http://oss.aliyuncs.com', //服务器端的上传页面地址
      multi_selection: false,
      filters: {
        mime_types: [
          {
            title: 'Image files',
            extensions: 'jpg,jpeg,png,JPG,JPEG,PNG'
          }
        ],
        max_file_size: '1mb', //最大只能上传1mb的文件
        prevent_duplicates: false //不允许选取重复文件
      },
    });
    let index;
    uploader.init();
    uploader.bind('FilesAdded',function (up,files) {
      let filename = files[0].name;
      self.ucSer.getUpIdCardFn()
        .then((res:any)=>{
          if(res){
            let key = res.dir + self.util.createUUID() + self.util.getFilenameSuffix(filename);
            frontImgName = key;
            frontImgUrl = res.imgUrl;
            let new_multipart_params = {
              'key': key,
              'policy': res.policy,
              'OSSAccessKeyId': res.accessid,
              'success_action_status': '200', //让服务端返回200,不然，默认会返回204
              'signature': res.signature,
            };
            uploader.setOption({
              'url': res.host,
              'multipart_params': new_multipart_params
            });
            uploader.start();
          }
        });
    });
    uploader.bind('BeforeUpload', function (up, file) {
      self.tips.showLoading(1);
    });

    uploader.bind('FileUploaded', function (up, file, info) {
      self.imageUrl = frontImgUrl + '/' + frontImgName;
      self.para.passportFrontImg = self.imageUrl;
      self.tips.showLoading(false);
      self.tips.msg("图片上传成功");
      $('#imgFront').attr('src',self.imageUrl);
    });

    uploader.bind('Error', function (up, err) {
      self.tips.showLoading(false);
      if (err.code == -600) {
        self.tips.msg("图片不能超过1M");
      } else if (err.code == -601) {
        self.tips.msg("只支持jpg或png文件");
      } else if (err.code == -602) {
        self.tips.msg("请不要重复上传同一文件");
      } else {
        self.tips.msg("上传失败")
      }
    });
  }
  //上传正面反面身份证
  upFrontIdCardRvs(){
    let self = this;
    let frontImgUrl;
    let frontImgName;
    //身份证正面上传
    let uploader = new plupload.Uploader({
      browse_button: 'idCardRvs', //触发文件选择对话框的按钮，为那个元素id
      url: 'http://oss.aliyuncs.com', //服务器端的上传页面地址
      multi_selection: false,
      filters: {
        mime_types: [
          {
            title: 'Image files',
            extensions: 'jpg,jpeg,png,JPG,JPEG,PNG'
          }
        ],
        max_file_size: '1mb', //最大只能上传1mb的文件
        prevent_duplicates: false //不允许选取重复文件
      },
    });
    let index;
    uploader.init();
    uploader.bind('FilesAdded',function (up,files) {
      let filename = files[0].name;
      self.ucSer.getUpIdCardFn()
        .then((res:any)=>{
          if(res){
            let key = res.dir + self.util.createUUID() + self.util.getFilenameSuffix(filename);
            frontImgName = key;
            frontImgUrl = res.imgUrl;
            let new_multipart_params = {
              'key': key,
              'policy': res.policy,
              'OSSAccessKeyId': res.accessid,
              'success_action_status': '200', //让服务端返回200,不然，默认会返回204
              'signature': res.signature,
            };
            uploader.setOption({
              'url': res.host,
              'multipart_params': new_multipart_params
            });
            uploader.start();
          }
        });
    });
    uploader.bind('BeforeUpload', function (up, file) {
      self.tips.showLoading(1);
    });

    uploader.bind('FileUploaded', function (up, file, info) {
      self.imageUrlRvs = frontImgUrl + '/' + frontImgName;
      self.para.passportBackImg = self.imageUrlRvs;
      self.tips.showLoading(false);
      self.tips.msg("图片上传成功");
      $('#imgRvs').attr('src',self.imageUrlRvs);
    });

    uploader.bind('Error', function (up, err) {
      self.tips.showLoading(false);
      if (err.code == -600) {
        self.tips.msg("图片不能超过1M");
      } else if (err.code == -601) {
        self.tips.msg("只支持jpg或png文件");
      } else if (err.code == -602) {
        self.tips.msg("请不要重复上传同一文件");
      } else {
        self.tips.msg("上传失败")
      }
    });
  }
  //界面加载好
  ngAfterViewInit(){
    this.upFrontIdCard();
    this.upFrontIdCardRvs();
  }
}
