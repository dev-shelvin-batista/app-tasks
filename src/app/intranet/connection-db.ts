import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Alerts } from '../core/services/alerts';

@Injectable({
  providedIn: 'root'
})
export class ConnectionDb {

  constructor(
    private sqlite: SQLite,
    private alertSer: Alerts,
  ) {}
  
  /**
   * Method to connect to the internal database if running on Android or iOS. It also initializes values if they have not been created. Tables are created if they do not exist, and initial values are created for the states.
   * @returns Promise with the object created in the connection.
   */
  openConnectionDB = async (): Promise<any> => {
    return new Promise(async (resolve) => {
      try {
        const db:SQLiteObject = await this.sqlite.create({
          name: 'mydata.db',
          location: 'default'
        });
        
        if (db) { 
          try {
            await db.executeSql('CREATE TABLE IF NOT EXISTS states (id INTEGER PRIMARY KEY, description TEXT)', []);
            await db.executeSql('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, description TEXT)', []);
            await db.executeSql('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, description TEXT, observation TEXT, id_category INTEGER, id_state INTEGER)', []);
            
            const data = await db.executeSql("SELECT COUNT(id) AS total FROM states", []);

            // Checks whether status values exist in the internal database to register them. This occurs when the application is opened for the first time.
            if (data.rows.item(0).total === 0) {
              await db.executeSql('INSERT INTO states (id, description) VALUES (?,?)', [1, 'Active']);
              await db.executeSql('INSERT INTO states (id, description) VALUES (?,?)', [2, 'Completed']);
            }
            resolve(db);          
          } catch (e) {
            resolve(null)
          }
        } else {
          this.alertSer.generateSimpleAlert("Error", 'Error generating the database');
          resolve(null)
        }
      } catch (e) {
        this.alertSer.generateSimpleAlert("Error", 'Error generating the database');
        resolve(null)
      }
    });
    
  }
}
