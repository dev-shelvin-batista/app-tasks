import { Injectable } from '@angular/core';
import { Alerts } from '../core/services/alerts';

@Injectable({
  providedIn: 'root'
})
export class ConnectionSstorage {
  
  constructor(
    private alertSer: Alerts,
  ) {}
  
  /**
   * Método para realizar la conexión al local storage si se esta ejecutando desde el navegador en PC. Además se inician los valores si no estan creados y se crean los valores iniciales de los estados.
   * @returns Promesa con los datos del local storage
   */
  openConnectionStorage = async (): Promise<any> => {
    return new Promise(async (resolve) => {
      try {
        const db: Storage = localStorage;
        const states: any = [
          {
            id: 1,
            description: 'Activa'
          },
          {
            id: 2,
            description: 'Completada'
          },
          {
            id: 3,
            description: 'Eliminada'
          }
        ]

        // Verificar si existen los valores en el local storage del navegador para inicializarlos. Esto sucede cuando se abre la app por primera vez
        if(db.getItem("states_general") === '[]' || db.getItem("states_general") === null){
          db.setItem("states_general", JSON.stringify(states));
        }
        if(db.getItem("categories_tasks") === '[]' || db.getItem("categories_tasks") === null){
          db.setItem("categories_tasks", JSON.stringify([]));
        }
        if(db.getItem("tasks_information") === '[]' || db.getItem("tasks_information") === null){
          db.setItem("tasks_information", JSON.stringify([]));
        }
        resolve(db);     
      } catch (e) {
        this.alertSer.generateSimpleAlert("Error", 'Error en la generación de la base de datos');
        resolve(null)
      }
    });
  }
  
}
