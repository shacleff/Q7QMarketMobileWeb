import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";

@Injectable()

export class LoginService{
    constructor(
       private xhr:HttpService
    ){}

    private loginUrl = '/oauth/token';

    logIn(options){
        return this.xhr.post(this.loginUrl,1,options);
    }
}
