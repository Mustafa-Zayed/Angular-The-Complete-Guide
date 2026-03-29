import { Component } from '@angular/core';
import { DashboardItem } from '../shared/dashboard-item/dashboard-item';

@Component({
  selector: 'app-traffic',
  imports: [DashboardItem],
  templateUrl: './traffic.html',
  styleUrl: './traffic.css',
})
export class Traffic {
  image = { src: 'globe.png', alt: 'A globe' };
  title = 'Traffic';

  dummyTrafficData = [
    {
      id: 'd1',
      value: 433,
    },
    {
      id: 'd2',
      value: 260,
    },
    {
      id: 'd3',
      value: 290,
    },
    {
      id: 'd4',
      value: 410,
    },
    {
      id: 'd5',
      value: 397,
    },
    {
      id: 'd6',
      value: 488,
    },
    {
      id: 'd47',
      value: 589,
    },
  ];

  maxTraffic = Math.max(...this.dummyTrafficData.map((data) => data.value));
}
