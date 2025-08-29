import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Categories } from 'src/app/core/services/categories';

@Component({
  selector: 'app-save-category',
  templateUrl: './save-category.component.html',
  styleUrls: ['./save-category.component.scss'],
  standalone: false,
})
export class SaveCategoryComponent  implements OnInit {
  @Input() typeAction = "create";

  @Input() data = {
    id: 0,
    description: ''
  }

  constructor(
    private modalController: ModalController,
    private categoriesSer: Categories
  ) { }

   /**
   * Método para el componente que se usa como modal
   */
  closeModal(){
    this.modalController.dismiss();
  }

  /**
   * Método para enviar y guardar los datos a la base de datos interna o al local storage dependiendo de donde se este ejecutando la app
   */
  async saveDataCategory(){
    if(this.typeAction === 'create'){
      await this.categoriesSer.saveCategory(this.data);
    } else {
      await this.categoriesSer.updateCategory(this.data);
    }
    
    this.closeModal();
  }

  /**
   * Evento para ejecutar instrucciones cuando carga el componente
   */
  ngOnInit() {
    
  }

}
