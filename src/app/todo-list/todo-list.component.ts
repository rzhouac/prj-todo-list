import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  newTodo: string;
  todoList: Array<string> = [];
  finishedTodos: Array<string> = [];
  currentIndex;

  title: FormControl = new FormControl('', this.forbiddenNullValidator());
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

  editTodo(index) {
    this.title.setValue(this.todoList[index]);
    this.currentIndex = index;
  }

  finishTodoItem(index) {
    this.finishedTodos.push(this.todoList[index]);
    this.todoList.splice(index, 1);
  }

  forbiddenNullValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = control.value === '';
      return forbidden ? { isEmpty : true } : null;
    };
  }

  onSave() {
    this.todoService.updateTodo(this.currentIndex, this.form.value).subscribe(() => {
      this.loadData();
    });
  }
}
