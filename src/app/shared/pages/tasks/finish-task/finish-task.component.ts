import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tasks } from 'src/app/core/services/tasks';

@Component({
  selector: 'app-finish-task',
  templateUrl: './finish-task.component.html',
  styleUrls: ['./finish-task.component.scss'],
  standalone: false,
})
export class FinishTaskComponent  implements OnInit {
  @Input() data = {
    id: 0,
    description: '',
    id_category: '',
    id_state: 2,
    observation: '',
    description_state: ''
  }

  constructor(
    private modalController: ModalController,
    private taskSer: Tasks
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
  async saveDataTask(){
    this.data.id_state = 2;
    await this.taskSer.updateTask(this.data);
    this.closeModal();
  }

  /**
   * Event to execute instructions when the component is loaded.
   */
  ngOnInit() {}

}
