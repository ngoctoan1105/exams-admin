import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from 'src/app/features/dashboard/dashboard.module';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@features/dashboard/dashboard.module').then(
            (m) => DashboardModule
          ),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('@features/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('@features/user/user.module').then((m) => m.UserModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
