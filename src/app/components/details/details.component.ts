import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { data } from 'jquery';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
   
    this.barChartPopulation();
  }

  barChartPopulation() {
    Highcharts.chart('barChart', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Evolution '
      },
      xAxis: {
        categories: ['2021-06-11','2021-06-12', '2021-06-13','2021-06-14', '2021-06-15' ,'2021-06-16','2021-06-17' ],
      },
      yAxis: {
        min :0,
        categories: ['1000','1500', '2000','2500', '3000','3500','4000'],
        title: {
          text: 'Prediction (Dollars)',
          align: 'high'
        },

        
      },
      tooltip: {
        valueSuffix: ' Dollars'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: undefined,
        name: 'valid',
        data: [1.93282, 4.36565, 3.2822,6.31235]
      }, {
        type: undefined,
        name: 'Prediction',
        data: [null, null, null,6.31235, 5.1285, 3.3263,3.42715],
       
      },  ]
    });
  }

}