import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.scss']
})
export class NewsComponent implements OnInit {
  public news = 'https://www.bulgariansnooker.com/index.php/2012-10-25-10-49-34/128-2018-04-30-09-29-35.html';
  constructor(public router: Router) {}
  ngOnInit() {}

  //kakto na rabotata s otdelen prozorec
  navigateToNews(): void {
      this.router.navigateByUrl(this.news);
  }
}
