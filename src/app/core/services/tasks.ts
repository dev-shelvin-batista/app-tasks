import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Connection } from 'src/app/intranet/connection';

@Injectable({
  providedIn: 'root'
})
export class Tasks {
  
  constructor(    
    private connectionDB: Connection,
    private platform: Platform,
  ) {}

  /**
   * Método para listar las tareas registradas ya sea desde la base de datos interna o en el local storage del navegador dependiendo si se ejecuta la app desde android, ios o navegador en PC
   * 
   * @param start Valor inicial desde donde obtienen los registros
   * @param end Valor final hasta donde obtienen los registros
   * @param filters Objeto con los datos de los filtros a ejecutar, solo si se envian
   * @returns Promesa con el listado de tareas registadas y que cumplan con los filtros enviados por el usuario
   */
  listTasks = async (start:number = 0, end: number = 0, filters: any = {}): Promise<any> => {
    return new Promise(async (resolve) => {
      let result:any = [];

      // Verificar si se esta ejecutando desde android o ios o PC
      if(this.platform.is('android') || this.platform.is('ios')) {
        let whereConditions = [];
        let whereConditionsValue = [];
        let strWhere = '';

        // Aplicar los filtros si se envian datos en el objeto. Se genera toda la configuración para agregarla a la consulta de datos
        if(filters.taskDescription !== ''){
          whereConditions.push(`tasks.description LIKE ?`);
          whereConditionsValue.push(`%${filters.taskDescription}%`);
        }
        if(filters.idCategory !== ''){
          whereConditions.push('tasks.id_category = ?');
          whereConditionsValue.push(filters.idCategory);
        }
        strWhere = whereConditions.length > 0 ? ` WHERE ${whereConditions.join(" AND ")}` : '';

        // Paginación de datos para no mostrarlos todos sino de 10 en registros
        strWhere += ` LIMIT ${end - start} OFFSET ${start}`;

        const data = await this.connectionDB.db.executeSql("SELECT tasks.id, tasks.description, tasks.id_category, tasks.observation, tasks.id_state, states.description AS description_state FROM tasks INNER JOIN states ON states.id = tasks.id_state INNER JOIN categories ON categories.id = tasks.id_category " + strWhere, whereConditionsValue);

        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            const item = data.rows.item(i);
            result.push(item);
          }
        } 
      } else {
        result = [...JSON.parse(this.connectionDB.dbStorage.getItem("tasks_information") || "[]")];

        // Aplicar los filtros si se envian datos en el objeto. Se genera toda la configuración para agregarla a la consulta de datos
        if(filters.taskDescription !== '' && filters.idCategory !== ''){
          result = result.filter((item:any) => item.description.toLowerCase().includes(filters.taskDescription.toLowerCase()) && item.id_category === filters.idCategory);
        } else if(filters.taskDescription !== '' && filters.idCategory === '') {
          result = result.filter((item:any) => item.description.toLowerCase().includes(filters.taskDescription.toLowerCase()));
        } else if(filters.taskDescription === '' && filters.idCategory !== '') {
          result = result.filter((item:any) => item.id_category === filters.idCategory);
        }
        
        // Paginación de datos para no mostrarlos todos sino de 10 en registros
        if(start > 0 || end > 0){
          result =  result.slice(start, end);
        }
        const listStates = [...JSON.parse(this.connectionDB.dbStorage.getItem("states_general") || "[]")];

        for (let i = 0; i < result.length; i++) {
          const find = listStates.find((item:any) => item.id === result[i].id_state);          
          result[i].description_state = (find) ? find.description : "";
        }
      }
      resolve(result);
    });
  }

  /**
   * 
   * Método para registrar una tarea ya sea en la base de datos interna o en el local storage del navegador dependiendo si se ejecuta la app desde android, ios o navegador en PC
   * 
   * @param data Objeto con los datos enviados por el usuario
   * @returns Promesa con el resultado de la acción.
   */
  saveTask = async (data: any): Promise<any> => {
    return new Promise(async (resolve) => {
      // Verificar si se esta ejecutando desde android o ios o PC
      if(this.platform.is('android') || this.platform.is('ios')) {
        await this.connectionDB.db.executeSql('INSERT INTO tasks (description, id_category, observation, id_state) VALUES (?, ?, ?, ?)', [data.description, data.id_category, data.observation, data.id_state]);
      } else {         
        const result = [...JSON.parse(this.connectionDB.dbStorage.getItem("tasks_information") || "[]")];
        const id = result.length > 0 ? (result[result.length - 1].id + 1) : 1;
        result.push({
          ...data,
          id,
        });
        this.connectionDB.dbStorage.setItem("tasks_information", JSON.stringify(result));
      }
      resolve({});
    });
  }

  /**
   * 
   * Método para actualizar los datos de una tarea ya sea en la base de datos interna o en el local storage del navegador dependiendo si se ejecuta la app desde android, ios o navegador en PC
   * 
   * @param data Objeto con los datos enviados por el usuario
   * @returns Promesa con el resultado de la acción.
   */
  updateTask = async (data: any): Promise<any> => {
    return new Promise(async (resolve) => {
      // Verificar si se esta ejecutando desde android o ios o PC
      if(this.platform.is('android') || this.platform.is('ios')) {
        await this.connectionDB.db.executeSql('UPDATE tasks SET observation = ?, id_state = ? WHERE id = ?', [data.observation, data.id_state, data.id]);
      } else {         
        const result = [...JSON.parse(this.connectionDB.dbStorage.getItem("tasks_information") || "[]")];
        let find = result.find((item:any) => item.id === data.id);
        if(find){
          find.observation = data.observation;
          find.id_state = data.id_state;
        }
        this.connectionDB.dbStorage.setItem("tasks_information", JSON.stringify(result));
      }
      resolve({});
    });
  }

  /**
   * 
   * Método para eliminar una tarea ya sea en la base de datos interna o en el local storage del navegador dependiendo si se ejecuta la app desde android, ios o navegador en PC
   * 
   * @param id Id de la tarea a eliminar
   * @returns Promesa con el resultado de la acción.
   */
  deleteTask = async (id: number): Promise<any> => {
    return new Promise(async (resolve) => {
      // Verificar si se esta ejecutando desde android o ios o PC
      if(this.platform.is('android') || this.platform.is('ios')) {
        await this.connectionDB.db.executeSql('DELETE FROM tasks WHERE id = ?', [id]);
      } else {         
        const result = [...JSON.parse(this.connectionDB.dbStorage.getItem("tasks_information") || "[]")].filter((item:any) => item.id !== id);
        this.connectionDB.dbStorage.setItem("tasks_information", JSON.stringify(result));
      }
      resolve({});
    });
  }  
}
