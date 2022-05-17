import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { DateAdapter } from '@angular/material/core';
import { Browser } from '@syncfusion/ej2-base';
import { ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { chart } from './constant/constant';

@Component({
  selector: 'ad-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  readonly filterDate = [
    { value: 'all', text: 'Tất cả' },
    { value: 'year', text: '1 năm' },
    { value: 'month', text: '30 ngày' },
    { value: 'custom', text: 'Tự chọn' },
  ];
  readonly courses = [
    {img: 'python.png', name: 'Python cơ bản', author: 'Nguyễn Văn A', count: 123},
    {img: 'python.png', name: 'Machine learning', author: 'Nguyễn Văn A', count: 2123},
    {img: 'python.png', name: 'Big Data', author: 'Nguyễn Văn A', count: 222},
    {img: 'python.png', name: 'Python nâng cao', author: 'Nguyễn Văn A', count: 321},
    {img: 'python.png', name: 'Angular', author: 'Nguyễn Văn A', count: 1232},
    {img: 'python.png', name: 'FastApi', author: 'Nguyễn Văn A', count: 123},
  ]
  filterSelected = 'all';
  fromDate = new Date(new Date().setDate(new Date().getDate() - 1));
  toDate = new Date();
  title = chart.title;
  public data: Object[] = chart.data;
  public data1: Object[] = chart.data1;
  public primaryXAxis: Object = chart.primaryXAxis;
  //Initializing Primary Y Axis
  public primaryYAxis: Object = chart.primaryYAxis;
  public chartArea: Object = chart.chartArea;
  public width: string = Browser.isDevice ? '100%' : '60%';
  public marker: Object = chart.marker;
  public tooltip: Object = chart.tooltip;

  constructor(private dateAdapter: DateAdapter<Date>) {
    super();
    this.dateAdapter.setLocale('en-GB');
  }
  ngOnInit(): void {}  // custom code start
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
        /-dark/i,
        'Dark'
      )
    );
  }
  search(){
    console.log(this.filterSelected, this.fromDate, this.toDate)
  }
}
