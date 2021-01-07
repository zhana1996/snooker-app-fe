import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(public router: Router,
              public route: ActivatedRoute) {}
  ngOnInit() {}

  logOut(): void {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/login');
  }
}
