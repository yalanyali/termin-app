import { MatPaginatorIntl } from '@angular/material';

const germanRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 von ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} von ${length}`;
}


export function getGermanPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  
  paginatorIntl.itemsPerPageLabel = 'Artikel pro Seite:';
  paginatorIntl.nextPageLabel = 'Nächste Seite';
  paginatorIntl.previousPageLabel = 'Vorige Seite';
  paginatorIntl.getRangeLabel = germanRangeLabel;
  paginatorIntl.lastPageLabel = 'Letzte Seite';
  paginatorIntl.firstPageLabel = 'Erste Seite';
  
  return paginatorIntl;
}