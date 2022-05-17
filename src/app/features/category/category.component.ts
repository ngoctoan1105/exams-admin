import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { ICategory, ICategoryReq } from './interface/interface';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'ad-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  category: ICategory[];
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource: any;
  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {
    super();
    this.dataSource = new MatTableDataSource(this.category);
  }
  ngOnInit(): void {
    this.categoryService.refresh$.subscribe((res) => {
      this.getCategories();
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  editDialog(category: ICategory): void {
    const id = category.id;
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
      data: {
        isAdd: false,
        name: category?.name || '',
        description: category?.description || '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.updateCategory(id, {
          name: result?.name,
          description: result?.description,
        });
    });
  }
  getCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this._ngUnsubscriber))
      .subscribe((res) => {
        this.category = res.data;
        this.dataSource = new MatTableDataSource(this.category);
        this.paginator.pageIndex = 0;
        this.dataSource.paginator = this.paginator;
      });
  }
  addDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
      data: { isAdd: true, name: '', description: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.addCategory({
          name: result?.name,
          description: result?.description,
        });
    });
  }
  addCategory(body: ICategoryReq) {
    this.categoryService
      .addCategory(body)
      .pipe(takeUntil(this._ngUnsubscriber))
      .subscribe((res) => {
        console.log(res);
      });
  }
  updateCategory(id: string, body: ICategoryReq) {
    this.categoryService
      .updateCategory(id, body)
      .pipe(takeUntil(this._ngUnsubscriber))
      .subscribe((res) => {
        console.log(res);
      });
  }
}
