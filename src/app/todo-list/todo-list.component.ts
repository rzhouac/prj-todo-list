import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  newTodo: string;

  todoList: Array<string> = [];

  finishedTodos: Array<string> = [];

  constructor() { }

  ngOnInit() {
  }

  handleCreateTodoItem() {
    this.todoList.push(this.newTodo);
    this.newTodo = '';
  }

  finishTodoItem(index) {
    this.finishedTodos.push(this.todoList[index]);
    this.todoList.splice(index, 1);
  }

}
