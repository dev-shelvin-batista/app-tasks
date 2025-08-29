import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Alerts {
  loading: any;

  constructor(
    private alertController: AlertController, 
    private loadingController: LoadingController,
    private toastController: ToastController
  ){}
  
   /**
   * Metodo para generar una alerta con un mensaje
   * 
   * @param {string} header         Titulo a mostrar
   * @param {string} message    Descripcion
   * @param {Function} fnt_ok  Metodo a ejecutarse en el evento clic del boton del modal antes de cerrarse
   */
  generateSimpleAlert = async (header: string, message: string, fnt_ok: Function = () => {}) => {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Aceptar',
          handler: async () => {
            await fnt_ok();
          }
        }
      ]
    });
  
    await alert.present();
  }

  /**
   * Metodo para generar una alerta de confirmación
   * 
   * @param {string} header         Titulo a mostrar
   * @param {string} message    Descripcion
   * @param {Function} fnt_ok  Metodo a ejecutarse en el evento clic del boton aceptar antes de cerrarse la alerta
   * @param {Function} fnt_cancel Metodo a ejecutarse en el evento clic del boton cancelar antes de cerrarse la alerta
   */
  generateConfirmationAlert = async (header: string, message: string, fnt_ok: Function = () => {}, fnt_cancel: Function = () => {}) => {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Aceptar',
          handler: async () => {
            await fnt_ok()
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            await fnt_cancel()
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  /**
   * Cargar en pantalla un modal con un loading y un mensaje mientras se ejecuta una acción
   * 
   * @param {string} message    Mensaje a mostrar
   */
  generateLoading = async (message: string = "Cargando...") => {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    await this.loading.present();    
  }

  /**
   * Cerrar el modal del loading
   */
  closeLoading = async () => {
    await this.loading.dismiss();
  }

  /**
   * Generar una notificación en pantalla con un mensaje
   * 
   * @param message Mensaje a mostrar
   */
  generateNotification = async(message: string) => {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color: 'success',
      position: 'top',
      icon: 'information-circle-outline',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
            
          },
        },
      ]
    });
    toast.present();
  }
}
