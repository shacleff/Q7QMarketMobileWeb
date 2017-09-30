import {Component,OnInit} from '@angular/core';
import {TipsService} from "../../service/tips.service";
import { Title } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import {UserCenterService} from "../user-center.service";
@Component({
  selector:'name-auth',
  templateUrl:'name-auth.component.html'
})
export class NameAuthComponent implements OnInit{
  constructor(
    private tips:TipsService,
    private title:Title,
    private sanitizer:DomSanitizer,
    private ucSer:UserCenterService
  ){}
  public headerTitle = '完善实名认证';
  back(){
    window.history.go(-1);
  }
  para:any = {
    passportFrontImg:null,
    passportBackImg:null
  };//省份证图片信息
  imageUrl:any;
  imageUrlRvs:any;
  onChangeSelectFile(event){
    const file = event.currentTarget.files[0];
    this.para.passportFrontImg = file;
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }
  onChangeSelectFileRvs(event){
    const fileRvs = event.currentTarget.files[0];
    this.para.passportBackImg = fileRvs;
    this.imageUrlRvs = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileRvs));
  }
  //上传用户身份证图片
  commitCert(){
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
  }
  ngOnInit(){
    this.title.setTitle('完善实名认证');
  }
}
