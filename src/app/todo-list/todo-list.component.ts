import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  newTodo: string;

  todoList: Array<string> = [];

  finishedTodos: Array<string> = [];

  title: FormControl = new FormControl('', this.forbiddenNullValidator());
  currentIndex;

  form: FormGroup = new FormGroup({
    title: this.title,
  });

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.todoService.getTodoList()
      .subscribe((data: Array<string>) => this.todoList = data );
  }

  handleCreateTodoItem() {
    if (this.newTodo) {
      this.todoService.addTodo(this.newTodo).subscribe(() => this.loadData());
      this.newTodo = '';
    }
  }

  finishTodoItem(index) {
    this.title.setValue(this.todoList[index]);
    this.currentIndex = index;
  }

  forbiddenNullValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = control.value === '';
      return forbidden ? { isEmpty : true } : null;
    };
  }

  save() {
    this.todoService.updateTodo(this.currentIndex, this.form.value).subscribe(() => {
      this.loadData();
    });
  }
}
