import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { AddNewsComponent } from './components/add-news.component';

@Component({
  selector: 'snooker-news',
  templateUrl: 'snooker-news.component.html',
  styleUrls: ['snooker-news.component.scss']
})
export class SnookerNewsComponent implements OnInit {
    public news = [
        {
            title: 'Георги Величков триумфира в последния турнир за сезона',
            id: '1',
            img: 'C:/Users/Zhana Mitova/Desktop/rsz_news_1.jpg',
            site: 'https://www.bulgariansnooker.com/index.php/2012-10-25-10-49-34/128-2018-04-30-09-29-35.html'
        }
        ];
      public showResults = false;
    
      constructor(public toaster: ToasterService,
                  public popoverController: PopoverController,
                  public alertController: AlertController) {}
      ngOnInit() {
          if(this.news.length > 0) {
              this.showResults = true;
            // this.news.forEach(element => {
            //   document.getElementById('news-item').style.backgroundImage = 'C:/Users/Zhana Mitova/Desktop/rsz_news_1.jpg'
            // });
          } else {
              this.toaster.showToaster('Няма добавени новини', 'danger');
          }
      }
  
      async deleteNews(news_id: string) {
          const alert = await this.alertController.create({
            header: 'Премахване на новината',
            message: 'Сигурен ли сте, че искате да изтриете новината?',
            buttons: [
              {
                text: 'Не',
                role: 'cancel',
              },
              {
                text: 'Да',
                handler: () => {
                  // изтриване на новината
                },
              },
            ],
          });
      
          await alert.present();
        }

        async presentPopover() {
          const popover = await this.popoverController.create({
            component: AddNewsComponent,
            cssClass: 'my-custom-class',
            translucent: true
          });
          return await popover.present();
        }
}
