import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly baseurl = environment.base_url;

  post<T>(path: string, body: object = {}): Observable<T> {
    return this.http.post<T>(`${this.baseurl}${path}`, body);
  }
  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.baseurl}${path}`, { params });
  }
}
