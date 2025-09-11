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
   * Event to execute instructions when the component is loaded.
   */
  async ngOnInit() {}

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.connection.connectDB();
    });
  }

  /**
   * Method for displaying a verification message when you want to close the application by pressing the Back button or closing modal pages and windows.
   */
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      this.routerOutlets?.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop(); // Navigate back within the app
        } else {
          // Exit the app if at the root page and no more navigation history
          this.alertSer.generateConfirmationAlert(
            "Confirmation",
            "Do you want to exit the application?",
            async () => {
              (navigator as any).app.exitApp();
            }
          );
          
        }
      });
    });
  }
}
