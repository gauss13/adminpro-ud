import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  @Input() leyenda: string = 'Leyenda';
  @Input() public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() public doughnutChartData: number[] = [350, 450, 100];
  @Input() public doughnutChartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
