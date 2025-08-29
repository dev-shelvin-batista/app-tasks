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
   * Método para el componente que se usa como modal
   */
  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Método para enviar y guardar los datos a la base de datos interna o al local storage dependiendo de donde se este ejecutando la app
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
   * Método para listar todas las categorías
   */
  async listAllCategories() {
    const result = await this.categoriesSer.listCategories(); 
    this.listCategories = [...result];
  }

  /**
   * Evento para ejecutar instrucciones cuando carga el componente
   */
  ngOnInit() {    
    this.listAllCategories()
  }

}
