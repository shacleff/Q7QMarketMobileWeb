//只允许输入数字的管道
import {Pipe,PipeTransform} from '@angular/core';
@Pipe({
    name:'onlyNum'
})
export class OnlyInputNumber implements PipeTransform{
    transform(value:any){
        return 5;
    }
}