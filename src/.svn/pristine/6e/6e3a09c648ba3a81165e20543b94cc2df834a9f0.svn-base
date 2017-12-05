import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";

@Injectable()

export class LoginService{
    constructor(
       private xhr:HttpService
    ){}

    //全局公共变量用来判断是否来自游戏端跳转到这里
    public isComeGame = false;

    private loginUrl = '/oauth/token';
    public interval = null;
    logIn(options){
        return this.xhr.post(this.loginUrl,1,options);
    }
    //定时更新token 10分钟
    updateToken(){
      let options = {
        "clientId": "098f6bcd4621d373cade4e832627b4f6",
        "loginChannel": " ",
        "password": localStorage.getItem('pwd'),
        "userName": localStorage.getItem('act')
      };
      if(!localStorage.getItem('pwd')||!localStorage.getItem('act')){
        return;
      }
      this.interval = setInterval(()=>{
        // console.info('此方法在任何地方每隔一段时间执行一次');
        this.logIn(options)
          .then((res:any)=>{
            if(res){
              let token = res.tokenType+' '+res.accessToken;
              localStorage.setItem('token',token);
            }
          });
      },1000*60*10)
    }
    //停止更新token
    stopUpdateToken(){
      if(!this.interval){
        return;
      }
      clearInterval(this.interval);
      // console.info('定时更新token停止');
    }
}
