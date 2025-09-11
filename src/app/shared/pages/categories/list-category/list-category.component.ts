import { Component, OnInit } from '@angular/core';
import { Alerts } from 'src/app/core/services/alerts';
import { SaveCategoryComponent } from '../save-category/save-category.component';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Categories } from 'src/app/core/services/categories';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
  standalone: false,
})
export class ListCategoryComponent  implements OnInit {
  listCategories:any = [];
  listCategoriesFilter:any = [];

  filters = {
    taskDescription: ''
  }

  constructor(
    private alertSer: Alerts,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private categoriesSer: Categories
  ) { }

  /**
   * Method for the component used as modal
   */
  closeModal(){
    this.modalController.dismiss();
  }

  /**
   * Method for generating a list of options when a category is selected from the list displayed in the component.
   */
  async selectCategory(data: any){
    const actionSheet = await this.actionSheetController.create({
      //header: 'Category',
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            this.editCategory(data);
          },
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: async () => {
            await this.deleteCategory(data.id);
          },
        },        
      ],
    });
    await actionSheet.present();
  }

  /**
   * Method for deleting a selected category. A confirmation message is generated before performing this action.
   * 
   * @param id Category ID
   */
  deleteCategory(id: number = 0){
    this.alertSer.generateConfirmationAlert(
      "Confirmation",
      "Do you want to delete this category?",
      async () => {
        this.categoriesSer.deleteCategory(id);
        await this.listAllCategories();
      }
    )
  }

  /**
   * Method to display the category editing component as a modal.
   */
  async editCategory(data: any) {
    const modal = await this.modalController.create(
      {
        component: SaveCategoryComponent,
        componentProps: {
          typeAction: 'edit',
          data
        }

      }
    );
    modal.present();
    modal.onDidDismiss().then(async (data) => {
      await this.listAllCategories();
    })
  }

  /**
   * Method to display the component for creating a category as a modal.
   */
  async addCategory(id: number = 0) {
    const modal = await this.modalController.create(
      {
        component: SaveCategoryComponent,
        componentProps: {
          typeAction: 'create'
        }
      }
    );
    modal.present();
    modal.onDidDismiss().then(async (data) => {
      await this.listAllCategories();
    })
  }

  /**
   * Method for listing categories using filter data (search by description) or listing registered categories. 
   * 
   */
  changeFilters() {
    if(this.filters.taskDescription !== ''){
      this.listCategoriesFilter = this.listCategories.filter((item: any) => item.description.toLowerCase().includes(this.filters.taskDescription.toLowerCase()));
    } else{
      this.listCategoriesFilter = [...this.listCategories]
    }
  }

  /**
   * Method for listing categories
   */
  async listAllCategories(event: any = null) {
    const result = await this.categoriesSer.listCategories(); 
    this.listCategories = [...result];
    this.listCategoriesFilter = [...this.listCategories];
    if(event){
      event.target.complete(); // End the refreshing process
    }
  }

  /**
   * Event to execute instructions when the component is loaded.
   */
  async ngOnInit() {
    await this.listAllCategories();
  }

}
