import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing-module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TutorialComponent } from './tutorial/tutorial.component';
import { CategoriesModule } from './categories/categories-module';
import { TasksModule } from './tasks/tasks-module';


@NgModule({
  declarations: [TutorialComponent],
  imports: [
    PagesRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesModule,
    TasksModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
