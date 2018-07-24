import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { StatisticsComponent } from './statistics/statistics.component';

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
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
