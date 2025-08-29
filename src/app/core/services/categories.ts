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
   * Método para listar las categorías registradas ya sea desde la base de datos interna o en el local storage del navegador dependiendo si se ejecuta la app desde android, ios o navegador en PC
   * 
   * @returns Promesa con el listado de categorías registadas y que cumplan con los filtros enviados por el usuario
   */
  listCategories = async (): Promise<any> => {
    return new Promise(async (resolve) => {
      let result:any = [];

      // Verificar si se esta ejecutando desde android o ios o PC
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
   * Método para registrar una categoría ya sea en la base de datos interna o en el local storage del navegador dependiendo si se ejecuta la app desde android, ios o navegador en PC
   * 
   * @param data Objeto con los datos enviados por el usuario
   * @returns Promesa con el resultado de la acción.
   */
  saveCategory = async (data: any): Promise<any> => {
    return new Promise(async (resolve) => {
      // Verificar si se esta ejecutando desde android o ios o PC
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
   * Método para actualizar los datos de una categoría ya sea en la base de datos interna o en el local storage del navegador dependiendo si se ejecuta la app desde android, ios o navegador en PC
   * 
   * @param data Objeto con los datos enviados por el usuario
   * @returns Promesa con el resultado de la acción.
   */
  updateCategory = async (data: any): Promise<any> => {
    return new Promise(async (resolve) => {
      // Verificar si se esta ejecutando desde android o ios o PC
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
   * Método para eliminar una categoría ya sea en la base de datos interna o en el local storage del navegador dependiendo si se ejecuta la app desde android, ios o navegador en PC
   * 
   * @param id Id de la categoría a eliminar
   * @returns Promesa con el resultado de la acción.
   */
  deleteCategory = async (id: number): Promise<any> => {
    return new Promise(async (resolve) => {
      // Verificar si se esta ejecutando desde android o ios o PC
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
