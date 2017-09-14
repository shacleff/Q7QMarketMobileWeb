import {Injectable} from '@angular/core';

@Injectable()

export class TipsService{
    constructor(){

    }
    msg(msg):void {
        let timer = null;
        $('#alertWeek').remove();
        let $alert = $('<div class="week-alert" id="alertWeek"></div>');
        $('body').append($alert);
        $alert.html(msg||'空');
        $alert.addClass('alert-show');
        clearTimeout(timer);
        timer = setTimeout(() => {
            $alert.remove();
        }, 2000);
    }
    private $layer;
    //显示遮罩层
    showLayer(){
        if(!this.$layer){
            this.$layer = $('<div class="alertLayer"></div>');
            this.$layer.css({
                height:$(window).height()
            });
            $('body').append(this.$layer);
        }
        this.$layer.show();
    }
    //隐藏遮罩层
    hideLayer(){
        this.$layer.hide();
    }
}
