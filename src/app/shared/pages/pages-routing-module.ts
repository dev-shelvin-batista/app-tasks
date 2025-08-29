import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories-module').then( m => m.CategoriesModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks-module').then( m => m.TasksModule)
  },
  {
    path: 'tutorial',
    component: TutorialComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
