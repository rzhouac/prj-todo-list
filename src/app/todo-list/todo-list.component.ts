import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  newTodo: string;

  todoList: Array<string> = [];

  finishedTodos: Array<string> = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoList()
      .subscribe((data: Array<string>) => this.todoList = data );
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
