import {
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {TodoListComponent} from '../todo-list/todo-list.component';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit, OnChanges {

  @Input() data: object = {};
  @Output() onSave = new EventEmitter();

  form: FormGroup = new FormGroup({
    content: new FormControl('', this.forbiddenNullValidator()),
    id: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(@Inject(forwardRef(() => TodoListComponent)) private parentComponent: TodoListComponent) {
  }

  ngOnInit() {
    this.form.patchValue(this.data);
  }

  save() {
    this.onSave.emit(this.form.value);
  }

  forbiddenNullValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control.value === '' ||
        (this.parentComponent && this.parentComponent.todoList.find(todo => todo.content === control.value));
      return forbidden ? {isEmpty: true} : null;
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    const dataChange: SimpleChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.form.patchValue(this.data);
    }
  }
}
