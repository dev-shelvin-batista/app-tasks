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
   * Method for connecting to the internal database if running from Android or iOS, or to local storage if running from a PC browser.
   */
  connectDB = async(): Promise<any> => {
    // Check if it works on Android, iOS, or PC.
    if(this.platform.is('android') || this.platform.is('ios')) {
      this.db = await this.connectionDBSer.openConnectionDB();
    } else{
      this.dbStorage = await this.connectionStorage.openConnectionStorage();
    }
  }
}
