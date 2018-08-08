import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITodo} from '../todo-list/todo-list.component';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {


  @Input() todo: ITodo;

  @Output() editTodo = new EventEmitter();
  @Output() updateStatus = new EventEmitter();

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getNumber(this.todo.content);
  }

  update() {
    this.updateStatus.emit(this.todo);
  }

  edit() {
    this.editTodo.emit(this.todo);
  }

}
