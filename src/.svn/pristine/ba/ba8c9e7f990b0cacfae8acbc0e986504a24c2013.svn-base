import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";

@Injectable()

export class UserCenterService{
  constructor(
    private xhr:HttpService
  ){}

  //得到用户信息
  getUserInfo(){
    return this.xhr.get('/user/getUserInfo',1,null);
  }
  //上传用户身份证图片C2认证
  commitCert(options){
    return this.xhr.post('/security/commitCert',1,options);
  }
  //获取上传身份证到阿里云后回调
  getUpIdCardFn(){
    return this.xhr.get('/upload/getUploadPublicInfo',1,{'dir': 'upload/hear-img/'});
  }
  //获取C1认证短信验证码
  getC1MsmCode(){
    return this.xhr.post('/sms/su/sendConeSms',1,null);
  }
  //提交C1认证
  subC1Para(options){
    return this.xhr.post('/security/commitCertOne',1,options);
  }
  //保存上传头像
  saveHeadImg(options){
    return this.xhr.post('/upload/saveHearImg',1,options);
  }
  //头像添加后回调
  getAddheadImgFn(){
    return this.xhr.get('/upload/getUploadPublicInfo',1,{'dir': 'upload/hear-img/'})
  }
}
