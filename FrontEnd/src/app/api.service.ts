import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = 'https://localhost:7281/api/Data';

  constructor(private http: HttpClient) { }
  saveDataWithDelay(): Observable<any> {
    return this.http.post(`${this.apiUrl}/DataWithDelay`, {});
  }

  getCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/GetCount`);
  }

  pauseCounting(): Observable<any> {
    return this.http.post(`${this.apiUrl}/Pause`, {});
  }

  resumeCounting(): Observable<any> {
    return this.http.post(`${this.apiUrl}/Resume`, {});
  }
}
