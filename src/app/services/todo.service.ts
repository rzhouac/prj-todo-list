import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TodoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getTodoList() {
    return this.http.get('/api/todo-list');
  }

  addTodo(todo) {
    return this.http.post('/api/todo-list/add', JSON.stringify({ title: todo }), this.httpOptions);
  }

  updateTodo(index, formValue) {
    return this.http.put('/api/todo-list/update', JSON.stringify({
      index,
      ...formValue,
    }), this.httpOptions);
  }
}
