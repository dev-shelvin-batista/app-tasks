import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './list-category/list-category.component';
import { SaveCategoryComponent } from './save-category/save-category.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListCategoryComponent
  },
  {
    path: 'save',
    component: SaveCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
