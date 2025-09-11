import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Categories } from 'src/app/core/services/categories';
import { Tasks } from 'src/app/core/services/tasks';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.scss'],
  standalone: false,
})
export class SaveTaskComponent  implements OnInit {
  @Input() typeAction = "create";
  listCategories:any = []

  @Input() data = {
    id: 0,
    description: '',
    id_category: '',
    id_state: 1,
    observation: '',
    description_state: ''
  }

  constructor(
    private modalController: ModalController,
    private categoriesSer: Categories,
    private taskSer: Tasks
  ) { }

  /**
   * Method for the component used as modal
   */
  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Method for sending and saving data to the internal database or local storage, depending on where the application is running.
   */
  async saveDataTask() {
    if(this.typeAction === 'create'){
      await this.taskSer.saveTask(this.data);
    } else {
      await this.taskSer.updateTask(this.data);
    }
    
    this.closeModal();
  }

  /**
   * Method for listing all categories
   */
  async listAllCategories() {
    const result = await this.categoriesSer.listCategories(); 
    this.listCategories = [...result];
  }

  /**
   * Event to execute instructions when the component is loaded.
   */
  ngOnInit() {    
    this.listAllCategories()
  }

}
