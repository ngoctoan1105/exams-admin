import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'ad-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('paginator', {static: true}) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'courses', 'sell'];
  dataSource: any;
  constructor(private userService: UserService) {
    super();
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit(): void {
    this.getInstructors();
  }
  getInstructors() {
    this.userService
      .getInstructors()
      .pipe(takeUntil(this._ngUnsubscriber))
      .subscribe((res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.paginator.pageIndex = 0;
        this.dataSource.paginator = this.paginator;
      });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
