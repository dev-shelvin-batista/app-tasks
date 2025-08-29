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
   * Método para el componente que se usa como modal
   */
  closeModal(){
    this.modalController.dismiss();
  }

  /**
   * Método para generar un listado de opciones cuando se selecciona una categoría del listado renderizado en el componente
   */
  async selectCategory(data: any){
    const actionSheet = await this.actionSheetController.create({
      //header: 'Categoría',
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [
        {
          text: 'Editar',
          icon: 'pencil',
          handler: () => {
            this.editCategory(data);
          },
        },
        {
          text: 'Eliminar',
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
   * Método para eliminar una categoría seleccionada. Se genera un mensaje de confirmación antes de realizar dicha acción.
   * 
   * @param id Id de la categoría
   */
  deleteCategory(id: number = 0){
    this.alertSer.generateConfirmationAlert(
      "Confirmación",
      "¿Desea eliminar esta categoría?",
      async () => {
        this.categoriesSer.deleteCategory(id);
        await this.listAllCategories();
      }
    )
  }

  /**
   * Método para mostrar el componente de editar una categoría como modal
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
   * Método para mostrar el componente de crear una categoría como modal
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
   * Método para listar las categorías usando los datos de filtro (buscar por descripción) o listar las categorías registradas. 
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
   * Método para listar las categorías
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
   * Evento para ejecutar instrucciones cuando carga el componente
   */
  async ngOnInit() {
    await this.listAllCategories();
  }

}
