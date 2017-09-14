import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class LoginService{
    constructor(
       private http:Http
    ){}

    private headers = new Headers({
        'Content-type':'application/json'
    });
    private loginUrl = '/';
    logIn(){
        return this.http.get(this.loginUrl)
            .toPromise()
            .then(res=>res);
    }
}