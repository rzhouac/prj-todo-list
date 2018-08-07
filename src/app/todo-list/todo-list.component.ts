import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../services/todo.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {STATUS} from '../constants/status';

export interface ITodo {
  id: number;
  content: string;
  status: string;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit {
  newTodo: string;
  todoList: Array<ITodo> = [];
  finishedTodos: Array<ITodo> = [];

  form: FormGroup = new FormGroup({
    content: new FormControl('', this.forbiddenNullValidator()),
    id: new FormControl(''),
    status: new FormControl(''),
  });

  @ViewChild('createInput') createInput: ElementRef;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.todoService.getTodoList()
      .subscribe((data: Array<ITodo>) => {
        this.todoList = data.filter(todo => todo.status === STATUS.todo);
        this.finishedTodos = data.filter(todo => todo.status === STATUS.done);
      });
  }

  handleCreateTodoItem() {
    if (this.newTodo) {
      this.todoService.addTodo(this.newTodo).subscribe(() => this.loadData());
      this.newTodo = '';
    }
  }

  editTodo(todo) {
    this.form.patchValue(todo);
  }

  finishTodoItem(todo) {
    this.todoService.markAsDone(todo.id).subscribe(() => this.loadData());
  }

  forbiddenNullValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control.value === '';
      return forbidden ? {isEmpty: true} : null;
    };
  }

  onSave() {
    this.todoService.updateTodo(this.form.value).subscribe(() => this.loadData());
  }

  ngAfterViewInit(): void {
    this.createInput.nativeElement.focus();
  }
}
