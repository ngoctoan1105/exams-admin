import { Component, Inject } from '@angular/core';
import { ICategoryData } from '../interface/interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ad-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent {
  isTouched = false;
  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICategoryData
  ) {}
  close(){
    this.dialogRef.close();
  }
  touched(){
    if(!this.isTouched) this.isTouched = true;
  }
}
