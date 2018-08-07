import {Component, Input, OnInit} from '@angular/core';
import {ITodo} from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  @Input() todo: ITodo;

  constructor() {
  }

  ngOnInit() {
  }

}
