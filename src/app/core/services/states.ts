import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Connection } from 'src/app/intranet/connection';

@Injectable({
  providedIn: 'root'
})
export class States {
  
  constructor(    
    private connectionDB: Connection,
    private platform: Platform,
  ) {}

  /**
   * Método para listar los estados ya sea desde la base de datos interna o en el local storage del navegador dependiendo si se ejecuta la app desde android, ios o navegador en PC
   * 
   * @returns Promesa con el listado de estados registados
   */
  listAllStates = async (): Promise<any> => {
    return new Promise(async (resolve) => {
      let result:any = [];
      
      // Verificar si se esta ejecutando desde android o ios o PC
      if(this.platform.is('android') || this.platform.is('ios')) {
        const data = await this.connectionDB.db.executeSql("SELECT id, description FROM states", []);
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            const item = data.rows.item(i);
            result.push(item);
          }
        }        
      } else{
        result = [...JSON.parse(this.connectionDB.dbStorage.getItem("states_general") || "[]")];
      }
      resolve(result);
    });
  }
  
}
