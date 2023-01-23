import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetTasksService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get('http://localhost:3000/api/tasks');
  }

  getTask(id: string) {
    return this.http.get('http://localhost:3000/api/tasks?status=' + id);
  }

  createTask(body: any) {
    return this.http
      .post('http://localhost:3000/api/tasks', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe((data) => {
        return;
      });
  }

  editTask(id: string, body: any) {
    return this.http
      .patch('http://localhost:3000/api/tasks/' + id, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe((data) => {
        return;
      });
  }
}
