import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetStatusesService {
  constructor(private http: HttpClient) {}

  getStatuses() {
    return this.http.get('http://localhost:3000/api/statuses');
  }

  postStatuses(body: any) {
    return this.http
      .post('http://localhost:3000/api/statuses', body)
      .subscribe((data) => {
        return data;
      });
  }
}
