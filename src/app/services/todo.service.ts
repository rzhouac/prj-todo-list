import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {STATUS} from '../constants/status';

@Injectable()
export class TodoService {
  todoList = [
    {content: '123', status: STATUS.todo, id: 1},
    {content: '456', status: STATUS.todo, id: 2},
    {content: '789', status: STATUS.todo, id: 3},
    {content: '1000', status: STATUS.todo, id: 4},
  ];

  getTodoList() {
    return of(this.todoList);
  }

  addTodo(content) {
    this.todoList[this.todoList.length] = {content, status: STATUS.todo, id: Date.now()};
    return of(this.todoList);
  }

  updateTodo(updatingTodo) {
    this.todoList = this.todoList.map(todo => (todo.id === updatingTodo.id ? updatingTodo : todo));
    return of(this.todoList);
  }

  markAsDone(id) {
    this.todoList = this.todoList.map(todo => (todo.id === id ? {...todo, status: STATUS.done} : todo));
    return of(this.todoList);
  }
}
