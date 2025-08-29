import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing-module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListTaskComponent } from './list-task/list-task.component';
import { SaveTaskComponent } from './save-task/save-task.component';
import { FinishTaskComponent } from './finish-task/finish-task.component';


@NgModule({
  declarations: [ListTaskComponent, SaveTaskComponent, FinishTaskComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    IonicModule,
  ]
})
export class TasksModule { }
