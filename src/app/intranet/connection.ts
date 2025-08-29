import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ConnectionDb } from './connection-db';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ConnectionSstorage } from './connection-sstorage';

@Injectable({
  providedIn: 'root'
})
export class Connection {
  db: SQLiteObject = null as unknown as SQLiteObject;
  dbStorage: Storage = null as unknown as Storage;  

  constructor(
    private platform: Platform,
    private connectionDBSer: ConnectionDb,
    private connectionStorage: ConnectionSstorage
  ){}

  /**
   * Método para realizar la conexión a la base de datos interna si se esta ejecutando desde android o ios o al local storage si se esta ejecutando desde el navegador en PC
   */
  connectDB = async(): Promise<any> => {
    // Verificar si se esta ejecutando desde android o ios o PC
    if(this.platform.is('android') || this.platform.is('ios')) {
      this.db = await this.connectionDBSer.openConnectionDB();
    } else{
      this.dbStorage = await this.connectionStorage.openConnectionStorage();
    }
  }
}
