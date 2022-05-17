import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICategory, ICategoryReq } from '../interface/interface';

@Injectable()
export class CategoryService {
  url = `${environment.apiUrl}/course-category`;
  private _refresh$ = new BehaviorSubject<void>(null);
  constructor(private httpClient: HttpClient) {}
  get refresh$() {
    return this._refresh$;
  }
  getCategories(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}`);
  }
  addCategory(body: ICategoryReq) {
    return this.httpClient
      .post<any>(`${this.url}`, body)
      .pipe(tap(() => this._refresh$.next()));
  }
  updateCategory(id: string, body: ICategoryReq) {
    return this.httpClient
      .patch<any>(`${this.url}/${id}`, body)
      .pipe(tap(() => this._refresh$.next()));
  }
}
