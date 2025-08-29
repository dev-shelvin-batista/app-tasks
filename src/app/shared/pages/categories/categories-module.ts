import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing-module';
import { ListCategoryComponent } from './list-category/list-category.component';
import { SaveCategoryComponent } from './save-category/save-category.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ListCategoryComponent, SaveCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    IonicModule,
  ]
})
export class CategoriesModule { }
