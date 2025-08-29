import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages-module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
