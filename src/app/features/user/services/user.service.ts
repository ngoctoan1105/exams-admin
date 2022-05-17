import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  url = `${environment.apiUrl}/course/statistical-users`;
  constructor(private httpClient: HttpClient) {}
  getInstructors() {
    return this.httpClient.get<any>(this.url).pipe(map((res) => res.data));
  }
}
