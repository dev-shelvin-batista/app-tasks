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
   * Method for the component used as modal
   */
  closeModal(){
    this.modalController.dismiss();
  }

  /**
   * Method for sending and saving data to the internal database or local storage, depending on where the application is running.
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
   * Event to execute instructions when the component is loaded.
   */
  ngOnInit() {
    
  }

}
