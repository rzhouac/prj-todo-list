import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'todo-list', pathMatch: 'full'},
  { path: 'todo-list', component: TodoListComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: 'todo-list'},
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    TodoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
