import { Injectable } from '@angular/core';
import { Alerts } from '../core/services/alerts';

@Injectable({
  providedIn: 'root'
})
export class ConnectionSstorage {
  
  constructor(
    private alertSer: Alerts,
  ) {}
  
  /**
   * Method for connecting to local storage if running from a PC browser. In addition, values are initialized if they have not been created, and initial state values are created.
   * @returns Promise with locally stored data
   */
  openConnectionStorage = async (): Promise<any> => {
    return new Promise(async (resolve) => {
      try {
        const db: Storage = localStorage;
        const states: any = [
          {
            id: 1,
            description: 'Active'
          },
          {
            id: 2,
            description: 'Completed'
          }
        ]

        // Check if the values exist in the browser's local storage to initialize them. This occurs when the application is opened for the first time.
        if(db.getItem("states_general") === '[]' || db.getItem("states_general") === null){
          db.setItem("states_general", JSON.stringify(states));
        }
        if(db.getItem("categories_tasks") === '[]' || db.getItem("categories_tasks") === null){
          db.setItem("categories_tasks", JSON.stringify([]));
        }
        if(db.getItem("tasks_information") === '[]' || db.getItem("tasks_information") === null){
          db.setItem("tasks_information", JSON.stringify([]));
        }
        resolve(db);     
      } catch (e) {
        this.alertSer.generateSimpleAlert("Error", 'Error generating the database');
        resolve(null)
      }
    });
  }
  
}
