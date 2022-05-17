import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { getDutchPaginatorIntl } from '@shared/translate-mat-table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { JwtInterceptor } from '@core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { ApiPrefixInterceptor } from '@core/interceptors/api-prefix.interceptor';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
     ],
  bootstrap: [AppComponent],
})
export class AppModule {}
