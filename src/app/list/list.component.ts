import { Component, Input, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';

import { Observable } from 'rxjs';

import * as _moment from 'moment';
import { map } from 'rxjs/operators';
const moment = _moment;


/**
 * List component with a filterable table.
 */
@Component({
  selector: 'list-component',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {

  @Input('dataObservable') dataObservable: Observable<any>;
  @Input('columns') columns: Array<any>;
  @Input('canHideOlder') canHideOlder: boolean = false;
  @Output() onClickOutput: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [];
  dataSource;
  subscription;
  hideOlder = false;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.displayedColumns = this.columns.map(x => x.id);
    this.createTable();
  };

  createTable() {
    this.subscription = this.dataObservable.subscribe(entries => {
      let filteredEntries = [];
      if (this.hideOlder) {
        filteredEntries = entries.filter(e => {
          return !moment(e.dateTime, 'DD.MM.YYYY HH:mm').isBefore(Date.now());
        });
      } else {
        filteredEntries = entries;
      }
      this.dataSource = new MatTableDataSource(filteredEntries);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      // Date sort
      // "21.11.1991" -> new Date("1991-11-21")
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'dateOfBirth': return new Date(item.dateOfBirth.split('.').reverse().join('-'));
          case 'dateTime': return new Date(item.dateTime.split('.').reverse().join('-'));
          default: return item[property];
        }
      };

      this.dataSource.filterPredicate = (data, value) => {
        // Full text search on object to extend filter capabilities e.g City
        return JSON.stringify(Object.values(data)).toLowerCase().includes(value);
      };

    });
  };

  handleCheckboxToggle(e) {
    this.hideOlder = e.checked;
    this.refreshList();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  handleOnClick(e) {
    const id = parseInt(e.target.getAttribute('data-identifier'));
    const clickedElementData = this.dataSource.filteredData.find(el => el.id === id);
    this.onClickOutput.emit(clickedElementData);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshList() {
    this.subscription.unsubscribe();
    this.createTable();
  }

}