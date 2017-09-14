import {Component,OnInit,ViewEncapsulation,AfterViewChecked} from '@angular/core';
//import {Router} from '@angular/router';
import {ToastService,SkinType} from 'ngx-weui'
@Component({
  selector:'log-in',
  templateUrl:'./login.component.html',
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit,AfterViewChecked{
  constructor(public srv: ToastService){

  }
  ngOnInit(){
  }
  ngAfterViewChecked(){
    $("#ff").hide();
  }
}
