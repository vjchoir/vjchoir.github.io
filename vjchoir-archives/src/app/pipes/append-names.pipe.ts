import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'appendNames'})
export class AppendNamesPipe implements PipeTransform {
  transform(value: any[]): string {
    let output: string = "";
    for(let i = 0; i < value.length; i++) {
      if(i != value.length - 1) {
        output += value[i] + ", "
      } else {
        output += value[i]
      }
    }

    return output;
  }
}