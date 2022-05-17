import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {path: '', loadChildren: ()=> import('@shared/components/layout/layout.module').then((m) => m.LayoutModule), canActivate: [AuthGuard]},
  {path: 'login', loadChildren: ()=> import('@features/login/login.module').then((m) => m.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
