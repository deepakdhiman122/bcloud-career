import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    console.log('Filtering items:', items);
    console.log('Search text:', searchText);
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.applied.toLowerCase().includes(searchText) || item.desc.toLowerCase().includes(searchText);
    });
  }
}

