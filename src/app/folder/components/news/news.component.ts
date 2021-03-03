import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { FolderFacade } from '../../store/facade/folder.facade';
import { INews } from '../../store/models/news';

@Component({
  selector: 'news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  readonly env = environment;
  news: INews[] = [];
  showResults = false;
  private news$: Observable<INews[]>;
  private newsSubs: Subscription;

  constructor(@Inject(DOCUMENT) private document: Document,
              public router: Router,
              public toaster: ToasterService,
              private facade: FolderFacade) {
    this.news$ = this.facade.allNews$;
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.newsSubs.unsubscribe();
  }

  goToNews(link: string): void {
    this.document.location.href = link;
  }
}
