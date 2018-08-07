import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITodo} from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  @Input() todo: ITodo;

  @Output() editTodo = new EventEmitter();
  @Output() updateStatus = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  update() {
    this.updateStatus.emit(this.todo);
  }

  edit() {
    this.editTodo.emit(this.todo);
  }

}
