import {Component} from '@angular/core'
import {HeaderComponent} from '../component/header/header.component'

@Component({
  selector:'regist-el',
  templateUrl:'./regist.component.html'
})

export class RegistComponent{
  constructor(

  ){}
  public headerTitile = '我的家园';
  back(arm: any) {
    window.history.go(-1);
  }
}
