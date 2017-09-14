import {Injectable} from '@angular/core';

@Injectable()

export class UtilService{
    constructor(){

    };
    public regExp(){//正则表达式
        const regexp = {
            mobileNum : /^1(3|4|5|7|8)\d{9}$/,//手机号
            IDCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//省份证
            checkCode: /^\d$/,//验证码
        }
        return regexp;
    }
}
