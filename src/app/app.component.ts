import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Platform, IonRouterOutlet  } from '@ionic/angular';
import { Connection } from './intranet/connection';
import { Alerts } from './core/services/alerts';
import { ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';


register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  private backButtonSubscription: any;
  @ViewChildren(IonRouterOutlet) routerOutlets?: QueryList<IonRouterOutlet>;
  
  constructor(
    private platform: Platform,
    private connection: Connection,
    private alertSer: Alerts,
    private router: Router
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }
  
  /**
   * Evento para ejecutar instrucciones cuando carga el componente
   */
  async ngOnInit() {}

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.connection.connectDB();
    });
  }

  /**
   * Método para mostrar un mensaje de verificación cuando se quiere cerrar la app presionando el botón atrás o cerrar las páginas y modal.
   */
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      this.routerOutlets?.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop(); // Navigate back within the app
        } else {
          // Exit the app if at the root page and no more navigation history
          this.alertSer.generateConfirmationAlert(
            "Confirmación",
            "¿Desea salir de la aplicación?",
            async () => {
              (navigator as any).app.exitApp();
            }
          );
          
        }
      });
    });
  }
}
