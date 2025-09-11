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
   * Method for listing registered tasks, either from the internal database or from the browser's local storage, depending on whether the application is running on Android, iOS, or a PC browser.
   * 
   * @param start Initial value from which records are obtained.
   * @param end Final value up to which records are obtained
   * @param filters Object with the data of the filters to be executed, only if sent.
   * @returns Promise with the list of registered tasks that meet the filters sent by the user.
   */
  listTasks = async (start:number = 0, end: number = 0, filters: any = {}): Promise<any> => {
    return new Promise(async (resolve) => {
      let result:any = [];

      // Check if it works on Android, iOS, or PC.
      if(this.platform.is('android') || this.platform.is('ios')) {
        let whereConditions = [];
        let whereConditionsValue = [];
        let strWhere = '';

        // Apply filters if the data is sent in the object. All settings are generated to be added to the data query.
        if(filters.taskDescription !== ''){
          whereConditions.push(`tasks.description LIKE ?`);
          whereConditionsValue.push(`%${filters.taskDescription}%`);
        }
        if(filters.idCategory !== ''){
          whereConditions.push('tasks.id_category = ?');
          whereConditionsValue.push(filters.idCategory);
        }
        strWhere = whereConditions.length > 0 ? ` WHERE ${whereConditions.join(" AND ")}` : '';

        // Data pagination so that not all records are displayed, but only 10 at a time.
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

        // Apply filters if the data is sent in the object. All settings are generated to be added to the data query.
        if(filters.taskDescription !== '' && filters.idCategory !== ''){
          result = result.filter((item:any) => item.description.toLowerCase().includes(filters.taskDescription.toLowerCase()) && item.id_category === filters.idCategory);
        } else if(filters.taskDescription !== '' && filters.idCategory === '') {
          result = result.filter((item:any) => item.description.toLowerCase().includes(filters.taskDescription.toLowerCase()));
        } else if(filters.taskDescription === '' && filters.idCategory !== '') {
          result = result.filter((item:any) => item.id_category === filters.idCategory);
        }
        
        // Data pagination so that not all records are displayed, but only 10 at a time.
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
   * Method for recording a task in the internal database or in the browser's local storage, depending on whether the application is running on Android, iOS, or in a PC browser.
   * 
   * @param data Object with the data sent by the user
   * @returns Promise with the result of the action.
   */
  saveTask = async (data: any): Promise<any> => {
    return new Promise(async (resolve) => {
      // Check if it works on Android, iOS, or PC.
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
   * Method for updating task data, either in the internal database or in the browser's local storage, depending on whether the application is running on Android, iOS, or in a PC browser.
   * 
   * @param data Object with the data sent by the user
   * @returns Promise with the result of the action.
   */
  updateTask = async (data: any): Promise<any> => {
    return new Promise(async (resolve) => {
      // Check if it works on Android, iOS, or PC.
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
   * Method to delete a task from the internal database or local browser storage, depending on whether the application is running on Android, iOS, or a PC browser.
   * 
   * @param id ID of the task to be deleted
   * @returns Promise with the result of the action.
   */
  deleteTask = async (id: number): Promise<any> => {
    return new Promise(async (resolve) => {
      // Check if it works on Android, iOS, or PC.
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
