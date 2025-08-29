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
   * Método para el componente que se usa como modal
   */
  closeModal(){
    this.modalController.dismiss();
  }

  /**
   * Método para enviar y guardar los datos a la base de datos interna o al local storage dependiendo de donde se este ejecutando la app
   */
  async saveDataTask(){
    this.data.id_state = 2;
    await this.taskSer.updateTask(this.data);
    this.closeModal();
  }

  /**
   * Evento para ejecutar instrucciones cuando carga el componente
   */
  ngOnInit() {}

}
