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
   * Method for enumerating states, either from the internal database or in the browser's local storage, depending on whether the application is running on Android, iOS, or in a PC browser.
   * 
   * @returns Promise with the list of registered states
   */
  listAllStates = async (): Promise<any> => {
    return new Promise(async (resolve) => {
      let result:any = [];
      
      // Check if it works on Android, iOS, or PC.
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
