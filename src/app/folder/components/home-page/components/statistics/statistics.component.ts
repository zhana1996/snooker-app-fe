import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']
})
export class StatisticComponent implements OnInit {
  public players = [
    {
      name: 'Братислав Кръстев',
      age: '31',
      break: '123',
      club: 'The Academy, София',
      startPeriod: '2001',
      titles: 12,
      rank: 1,
      wins: 30,
      lost: 49,
      matches: 115,
      points: 234,
      img: 'assets/images/profile_1.png'
  },
  {
    name: 'Георги Величков',
    age: '25',
    break: '141',
    club: 'The Academy, София',
    startPeriod: '2001',
    titles: 24,
    rank: 2,
    wins: 45,
    lost: 35,
    matches: 105,
    points: 200,
    img: 'assets/images/profile_2.png'
},
{
    name: 'Виктор Гайдов',
    age: '31',
    break: '89',
    club: 'The Academy, София',
    startPeriod: '2001',
    titles: 1,
    rank: 3,
    wins: 30,
    lost: 49,
    matches: 115,
    points: 170,
    img: 'assets/images/profile_3.png'
},
{
    name: 'Теодор Чомовски',
    age: '22',
    break: '119',
    club: 'The Academy, София',
    startPeriod: '2001',
    titles: 9,
    rank: 4,
    wins: 30,
    lost: 49,
    points: 111,
    matches: 115,
    img: 'assets/images/profile_1.png'
}
  ];
  constructor() {}
  ngOnInit() {}
}
