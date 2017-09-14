import {Component, Input,EventEmitter,Output, ViewEncapsulation} from '@angular/core';
@Component({
  selector:'Header',
  template:`
    <div class="header">
      <i feedButton class="leftSwordIcon" (click)='vote()'></i>
      <h3 class="headerTitle" [innerHTML]="title"></h3>
    </div>
  `,
  host:{
    'class':'header'
  },
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent{
  @Input() title: string;
  @Output() onVoted = new EventEmitter<any>();
  vote(arm: any) {
    this.onVoted.emit(arm);
  }
}
