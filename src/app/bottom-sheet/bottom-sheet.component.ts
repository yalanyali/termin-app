import { Component, Input, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})

export class BottomSheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  handleOnClick(e) {
    this.bottomSheetRef.dismiss(e);
  }
  
}