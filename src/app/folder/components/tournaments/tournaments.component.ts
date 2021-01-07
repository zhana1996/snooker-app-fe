import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tournaments',
  templateUrl: 'tournaments.component.html',
  styleUrls: ['tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
    public tournaments = [
        {
            "name": "Ранконг Турнир No1",
            "location": "The Academy, София",
            "date": "22/10/2020"
        },
        {
            "name": "Ранконг Турнир No2",
            "location": "Stix, София",
            "date": "19/11/2020"
        },
        {
            "name": "Ранконг Турнир No3",
            "location": "Emotion, София",
            "date": "14/12/2020"
        },
        {
            "name": "Ранконг Турнир No4",
            "location": "The Academy, София",
            "date": "15/01/2021"
        },
        {
            "name": "Ранконг Турнир No5",
            "location": "Emotion, София",
            "date": "13/02/2021"
        }
    ];
  constructor(public router: Router) {}
  ngOnInit() {}
}
