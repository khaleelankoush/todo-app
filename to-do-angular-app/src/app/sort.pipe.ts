import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(items: any[], sortType: string): any[] {
    if (!items) {
      return [];
    }
    if (!sortType) {
      return items;
    }
    return items.sort((a, b) => {
      if (sortType === 'ASC') {
        return a.updated_time > b.updated_time ? 1 : -1;
      } else {
        return a.updated_time < b.updated_time ? 1 : -1;
      }
    });
  }
}
