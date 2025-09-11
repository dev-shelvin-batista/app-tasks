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
   * Method for generating a list of options when a task is selected from the list displayed in the component.
   */
  async selectTask(data: any){
    const buttons = [];
    
    // Check if the task status is different from 2, i.e., if it is not completed, so as not to generate this option.
    if(data.id_state !== 2){
      buttons.push({
        text: 'Finish',
        icon: 'checkmark-outline',
        handler: async () => {
          this.finishTask(data);
        },
      })
    }
    buttons.push({
      text: 'Delete',
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
   * Method for deleting a selected task. A confirmation message is generated before performing this action.
   * 
   * @param id Task ID
   */
  deleteTask(id: number = 0){
    this.alertSer.generateConfirmationAlert(
      "Confirmation",
      "Do you want to delete this task?",
      async () => {
        this.taskSer.deleteTask(id);
        this.changeFilters();
      }
    )
  }
  
  /**
   * Method to display the component for creating a task as a modal.
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
   * Method to display the category list component as a modal
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
   * Method to display the task completion component as a modal.
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
   * Method for listing tasks using filter data (search by description or category) or listing registered tasks. This list is paginated, which means that 10 tasks are generated per page, depending on the page. In this case, it is from the first page.
   * 
   * @param event Object with infinite scroll data that allows pagination, i.e., moving from one page to another, or the refresh button that allows the data to be displayed again.
   */
  async changeFilters(event: any = null) {
    this.startCon = 0;
    this.endCon = 10;    
    this.listTasks = [...[]];    
    this.listTasksFilter = [...[]];

    await this.listAllTasks(event, this.startCon, this.endCon, this.filters)
  }

  /**
   * Method for enumerating data filter categories
   */
  async listAllCategories() {
    const result = await this.categoriesSer.listCategories(); 
    this.listCategories = [...result];
  }

  /**
   * Method for listing tasks using filter data (search by description or category) or listing registered tasks. This list is paginated, which means that 10 tasks are generated per page, depending on the page. In this case, it is dynamic from where the data loading begins to where it ends. 
   * 
   * @param event Object with infinite scroll data that allows pagination, i.e., moving from one page to another, or refresh, which allows the data to be displayed again.
   * @param start Initial value from which the data for pagination is obtained.
   * @param end Final value up to which data is obtained for pagination.
   * @param filters Object with filter data to generate the list
   */
  async listAllTasks(event: any = null, start:number = 0, end: number = 0, filters: any = {}) {
    const result = await this.taskSer.listTasks(start, end, filters);
    this.listTasks.push(...result);
    this.listTasksFilter = [...this.listTasks];
    await this.listAllCategories();
    
    // Stop infinite scroll or refresh effect
    if(event){
      event.target.complete(); 
    }
  }

  /**
   * Method for paginating data that runs with Ionic's infinite scroll component.
   * 
   * @param event Object with infinite scroll data that allows pagination, i.e., moving from one page to another. 
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
   * Event to execute instructions when the component is loaded.
   */
  async ngOnInit() {
    
  }

}
