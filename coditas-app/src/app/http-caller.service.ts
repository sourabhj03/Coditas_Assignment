import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpCallerService {

  constructor(private http: HttpClient) { }

  getData (url: string, params?:any): Observable <any> {
    return this.http.get(url, {params: params});
  }
}
