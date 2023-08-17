import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacefy'
})
export class SpacefyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    
    let result = '';
    for(let i=0 ; i<value.length ; i++){
      result += value.charAt(i);
      result += ' ';
    }
    return result;
  }

}
