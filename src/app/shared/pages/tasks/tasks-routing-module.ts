import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTaskComponent } from './list-task/list-task.component';
import { SaveTaskComponent } from './save-task/save-task.component';
import { FinishTaskComponent } from './finish-task/finish-task.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListTaskComponent
  },
  {
    path: 'save',
    component: SaveTaskComponent
  },
  {
    path: 'finish',
    component: FinishTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
