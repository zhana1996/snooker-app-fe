import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { FolderFacade } from '../../store/facade/folder.facade';
import { INews } from '../../store/models/news';

@Component({
  selector: 'news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  public news: INews[] = [];
  private news$: Observable<INews[]>;
  private newsSubs: Subscription;

  public showResults = false;

  constructor(@Inject(DOCUMENT) private document: Document,
              public router: Router,
              public toaster: ToasterService,
              private facade: FolderFacade) {
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
      }
    });
  }

  goToNews(link: string): void {
    this.document.location.href = link;
  }

  ngOnDestroy(): void {
    this.newsSubs.unsubscribe();
  }
}
