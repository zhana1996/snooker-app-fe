import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { INews } from 'src/app/folder/store/models/news';
import { environment } from 'src/environments/environment';
import { AdminFacade } from '../../store/facade/admin.facade';
import { AddNewsComponent } from './components/add-news.component';

@Component({
  selector: 'snooker-news',
  templateUrl: 'snooker-news.component.html',
  styleUrls: ['snooker-news.component.scss']
})
export class SnookerNewsComponent implements OnInit, OnDestroy {
  readonly env = environment;
  news: INews[] = [];
  showResults = false;
  private news$: Observable<INews[]>;
  private newsSubs: Subscription;
    
  constructor(@Inject(DOCUMENT) private document: Document,
              public toaster: ToasterService,
              private facade: AdminFacade,
              public route: ActivatedRoute,
              public router: Router,
              public popoverController: PopoverController,
              public alertController: AlertController) {
    this.news$ = this.facade.allNews$;
  }

  ngOnInit() {
    this.facade.getAllNews();

    this.newsSubs = this.news$.subscribe((data: INews[]) => {
      if(data) {
        if(data.length > 0) {
          this.news = data;
          this.showResults = true;
        } else {
          this.showResults = false;
          this.toaster.showToaster('Няма добавени новини все още.', 'danger');
        }
        this.facade.resetNews();
      }
    });
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
            this.facade.deleteNews(news_id);
            setTimeout(() => {
              this.facade.getAllNews();
            }, 1500);
          },
        },
      ],
    });

    await alert.present();
  }

  async addNews(event: Object) {
    const popover = await this.popoverController.create({
      component: AddNewsComponent,
      cssClass: 'my-custom-class',
      componentProps: {news: event['news'], edit: event['edit']},
      translucent: true,
    });
    return await popover.present();
  }

  goToNews(link: string): void {
    this.document.location.href = link;
  }

  ngOnDestroy(): void {
    this.newsSubs.unsubscribe();
  }
}
