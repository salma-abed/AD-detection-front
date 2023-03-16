import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapValue',
  standalone: true
})
export class MapValuePipe implements PipeTransform {

  transform(obj: any, key: string): any {
    return obj[key];
  }

}
