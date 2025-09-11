import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Connection } from 'src/app/intranet/connection';

@Injectable({
  providedIn: 'root'
})
export class Categories {
  
  constructor(    
    private connectionDB: Connection,
    private platform: Platform,
  ) {}

  /**
   * Method for listing registered categories, either from the internal database or from the browser's local storage, depending on whether the application is running on Android, iOS, or a PC browser.
   * 
   * @returns Promise with the list of registered categories that match the filters sent by the user.
   */
  listCategories = async (): Promise<any> => {
    return new Promise(async (resolve) => {
      let result:any = [];

      // Check if it works on Android, iOS, or PC.
      if(this.platform.is('android') || this.platform.is('ios')) {
        const data = await this.connectionDB.db.executeSql("SELECT id, description FROM categories", []);
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            const item = data.rows.item(i);
            result.push(item);
          }
        }        
      } else {
        result = [...JSON.parse(this.connectionDB.dbStorage.getItem("categories_tasks") || "[]")];
      }
      resolve(result);
    });
  }

  /**
   * 
   * Method for registering a category in the internal database or in the browser's local storage, depending on whether the application is running on Android, iOS, or in a PC browser.
   * 
   * @param data Object with the data sent by the user
   * @returns Promise with the result of the action.
   */
  saveCategory = async (data: any): Promise<any> => {
    return new Promise(async (resolve) => {
      // Check if it works on Android, iOS, or PC.
      if(this.platform.is('android') || this.platform.is('ios')) {
        await this.connectionDB.db.executeSql('INSERT INTO categories (description) VALUES (?)', [data.description]);
      } else {         
        const result = [...JSON.parse(this.connectionDB.dbStorage.getItem("categories_tasks") || "[]")];
        const id = result.length > 0 ? (result[result.length - 1].id + 1) : 1;
        result.push({
          id,
          description: data.description
        });
        this.connectionDB.dbStorage.setItem("categories_tasks", JSON.stringify(result));
      }
      resolve({});
    });
  }

  /**
   * 
   * Method for updating data in a category, either in the internal database or in the browser's local storage, depending on whether the application is running on Android, iOS, or in a PC browser.
   * 
   * @param data Object with the data sent by the user
   * @returns Promise with the result of the action.
   */
  updateCategory = async (data: any): Promise<any> => {
    return new Promise(async (resolve) => {
      // Check if it works on Android, iOS, or PC.
      if(this.platform.is('android') || this.platform.is('ios')) {
        await this.connectionDB.db.executeSql('UPDATE categories SET description = ? WHERE id = ?', [data.description, data.id]);
      } else {         
        const result = [...JSON.parse(this.connectionDB.dbStorage.getItem("categories_tasks") || "[]")];
        let find = result.find((item:any) => item.id === data.id);
        if(find){
          find.description = data.description
        }
        this.connectionDB.dbStorage.setItem("categories_tasks", JSON.stringify(result));
      }
      resolve({});
    });
  }

  /**
   * 
   * Method to remove a category from the internal database or local browser storage, depending on whether the application is running on Android, iOS, or a PC browser.
   * 
   * @param id ID of the category to be deleted
   * @returns Promise with the result of the action.
   */
  deleteCategory = async (id: number): Promise<any> => {
    return new Promise(async (resolve) => {
      // Check if it works on Android, iOS, or PC.
      if(this.platform.is('android') || this.platform.is('ios')) {
        await this.connectionDB.db.executeSql('DELETE FROM categories WHERE id = ?', [id]);
      } else {         
        const result = [...JSON.parse(this.connectionDB.dbStorage.getItem("categories_tasks") || "[]")].filter((item:any) => item.id !== id);
        this.connectionDB.dbStorage.setItem("categories_tasks", JSON.stringify(result));

        const resultTasks = [...JSON.parse(this.connectionDB.dbStorage.getItem("tasks_information") || "[]")].filter((item:any) => item.id_category !== id);
        this.connectionDB.dbStorage.setItem("tasks_information", JSON.stringify(resultTasks));
      }
      resolve({});
    });
  }


}
