
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { examResponse } from 'src/model/exam';



@Injectable({
  providedIn: 'root',
})
export class ExamService {
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  apiBaseUrl: string = `\assets\UserList.json`;
  constructor(private http: HttpClient) { }

  GetData(): Observable<examResponse> {
    const url = `/assets/UserList.json`;
    return this.http.get<examResponse>(url, this.httpOptions);
  }
}
