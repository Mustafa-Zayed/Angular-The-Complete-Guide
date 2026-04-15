import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false, // this disables caching and forces the pipe to run on every change detection cycle, which is necessary when we mutate the array directly. However, it's generally not recommended to set pure to false, as it can lead to performance issues. Instead, it's better to create a new array reference when you want to trigger change detection.
})
export class SortPipe implements PipeTransform {
  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
    const sorted = [...value];
    sorted.sort((a, b) => {
      if (direction === 'asc') {
        return a > b ? 1 : -1;
      } else {
        return a > b ? -1 : 1;
      }
    });
    return sorted;
  }
}
