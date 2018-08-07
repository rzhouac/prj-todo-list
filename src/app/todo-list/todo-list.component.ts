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
  editingData = {};
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
    this.editingData = todo;
  }

  finishTodoItem(todo) {
    this.todoService.markAsDone(todo.id).subscribe(() => this.loadData());
  }

  onSave(savingData) {
    this.todoService.updateTodo(savingData).subscribe(() => this.loadData());
  }

  ngAfterViewInit(): void {
    this.createInput.nativeElement.focus();
  }
}
