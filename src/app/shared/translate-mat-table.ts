import { MatPaginatorIntl } from '@angular/material/paginator';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  console.log(length, pageSize)
  if (length == 0 || pageSize == 0) {
    return `Bản ghi 0 trong ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `Bản ghi ${startIndex + 1} - ${endIndex} trong ${length}`;
};

export function getDutchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Số bản ghi/trang:';
  paginatorIntl.nextPageLabel = 'Trang tiếp';
  paginatorIntl.previousPageLabel = 'Trang trước';
  paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;
}
