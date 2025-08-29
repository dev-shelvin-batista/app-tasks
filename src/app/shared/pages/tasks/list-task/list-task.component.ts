import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Alerts } from 'src/app/core/services/alerts';
import { SaveTaskComponent } from '../save-task/save-task.component';
import { FinishTaskComponent } from '../finish-task/finish-task.component';
import { Categories } from 'src/app/core/services/categories';
import { Tasks } from 'src/app/core/services/tasks';
import { ListCategoryComponent } from '../../categories/list-category/list-category.component';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class ListTaskComponent implements OnInit {
  listTasks:any = [];
  listTasksFilter:any = [];
  listCategories:any = [];
  startCon:number = 0;
  endCon:number = 10;

  filters = {
    taskDescription: '',
    idCategory: ""
  }

  constructor(
    private alertSer: Alerts,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private categoriesSer: Categories,
    private taskSer: Tasks,
    private cdRef: ChangeDetectorRef,
  ) { 
    this.changeFilters();
  }

  /**
   * Método para generar un listado de opciones cuando se selecciona una tarea del listado renderizado en el componente
   */
  async selectTask(data: any){
    const buttons = [];
    
    // Verificar si el estado de la tarea es diferente a 2, es decir si no esta completada para no generar esta opción
    if(data.id_state !== 2){
      buttons.push({
        text: 'Completar',
        icon: 'checkmark-outline',
        handler: async () => {
          this.finishTask(data);
        },
      })
    }
    buttons.push({
      text: 'Eliminar',
      icon: 'trash',
      handler: async () => {
        await this.deleteTask(data.id);
      },
    });

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons
    });
    await actionSheet.present();
  }

  /**
   * Método para eliminar una tarea seleccionada. Se genera un mensaje de confirmación antes de realizar dicha acción.
   * 
   * @param id Id de la tarea
   */
  deleteTask(id: number = 0){
    this.alertSer.generateConfirmationAlert(
      "Confirmación",
      "¿Desea eliminar esta tarea?",
      async () => {
        this.taskSer.deleteTask(id);
        this.changeFilters();
      }
    )
  }
  
  /**
   * Método para mostrar el componente de crear una tarea como modal
   */
  async addTask() {
    const modal = await this.modalController.create(
      {
        component: SaveTaskComponent,
        componentProps: {
          typeAction: 'create'
        }
      }
    );
    modal.present();
    modal.onDidDismiss().then(async (data) => {
      this.changeFilters();
    });
  }
  
  /**
   * Método para mostrar el componente de listar categrías como modal
   */
  async showCategories() {
    const modal = await this.modalController.create(
      {
        component: ListCategoryComponent,
        componentProps: {
        }
      }
    );
    
    modal.present();
    modal.onDidDismiss().then(async (data) => {
      await this.listAllCategories();
      await this.changeFilters();
    });
  }

  /**
   * Método para mostrar el componente de completar una tarea como modal
   */
  async finishTask(data: any) {
    const modal = await this.modalController.create(
      {
        component: FinishTaskComponent,
        componentProps: {
          typeAction: 'create',
          data,
        }
      }
    );
    modal.present();
    modal.onDidDismiss().then(async (data) => {
      this.changeFilters();
    });
  }

  /**
   * Método para listar las tareas usando los datos de filtro (buscar por descripción o categoría) o listar las tareas registradas. Este listado es paginado es decir se generan de 10 en 10 dependiendo de la pagina. En este caso es desde la primera pagina.
   * 
   * @param event Objeto con los datos del infinite scroll que permite la paginación, es decir pasar de una pagina a otra o del refresher que permite listar nuevamente los datos
   */
  async changeFilters(event: any = null) {
    this.startCon = 0;
    this.endCon = 10;    
    this.listTasks = [...[]];    
    this.listTasksFilter = [...[]];

    await this.listAllTasks(event, this.startCon, this.endCon, this.filters)
  }

  /**
   * Método para listar las categorías del filtro de datos
   */
  async listAllCategories() {
    const result = await this.categoriesSer.listCategories(); 
    this.listCategories = [...result];
  }

  /**
   * Método para listar las tareas usando los datos de filtro (buscar por descripción o categoría) o listar las tareas registradas. Este listado es paginado es decir se generan de 10 en 10 dependiendo de la pagina. En este caso es dinamico desde donde empiza hasta donde termina la carga de datos. 
   * 
   * @param event Objeto con los datos del infinite scroll que permite la paginación, es decir pasar de una pagina a otra o del refresher que permite listar nuevamente los datos
   * @param start Valor inicial desde donde se obtienen los datos para la paginación
   * @param end Valor final hasta donde se obtienen los datos para la paginación
   * @param filters Objeto con los datos de los filtros para generar el listado
   */
  async listAllTasks(event: any = null, start:number = 0, end: number = 0, filters: any = {}) {
    const result = await this.taskSer.listTasks(start, end, filters);
    this.listTasks.push(...result);
    this.listTasksFilter = [...this.listTasks];
    await this.listAllCategories();
    
    // Detener el efecto ya se del inifinte scroll o refresher
    if(event){
      event.target.complete(); // End the refreshing process
    }
  }

  /**
   * Método para la paginación de datos que se ejecuta con el componente infinite scroll de ionic
   * 
   * @param event Objeto con los datos del infinite scroll que permite la paginación, es decir pasar de una pagina a otra 
   */
  async loadData(event:any) {    
    if(event){
      event.target.complete(); // End the refreshing process
      this.startCon += 10;
      this.endCon += 10;
      await this.listAllTasks(null, this.startCon, this.endCon, this.filters)
    }
  }

  /**
   * Evento para ejecutar instrucciones cuando carga el componente
   */
  async ngOnInit() {
    
  }

}
