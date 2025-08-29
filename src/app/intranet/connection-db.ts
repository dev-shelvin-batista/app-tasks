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
   * Método para realizar la conexión a la base de datos interna si se esta ejecutando desde android o ios. Además iniciar los valores si no estan creados. Además se crean las tablas si no están creadas y se crean los valores iniciales de los estados.
   * @returns Promesa con el objeto creado en la conexión.
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

            // Verificar si existen los valores de los estados en la base de datos interna para registrarlos. Esto sucede cuando se abre la app por primera vez
            if (data.rows.item(0).total === 0) {
              await db.executeSql('INSERT INTO states (id, description) VALUES (?,?)', [1, 'Activa']);
              await db.executeSql('INSERT INTO states (id, description) VALUES (?,?)', [2, 'Completada']);
              await db.executeSql('INSERT INTO states (id, description) VALUES (?,?)', [3, 'Eliminada']);
            }
            resolve(db);          
          } catch (e) {
            resolve(null)
          }
        } else {
          this.alertSer.generateSimpleAlert("Error", 'Error en la generación de la base de datos');
          resolve(null)
        }
      } catch (e) {
        this.alertSer.generateSimpleAlert("Error", 'Error en la generación de la base de datos');
        resolve(null)
      }
    });
    
  }
}
