import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { ChartService } from 'app/services/chart.service';
import * as Highcharts from 'highcharts';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { data } from 'jquery';


const states = ['TND', 'AED', 'ARS', 'AUD', 'BBD', 'BHD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EGP', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KRW',
 'KWD', 'LBP', 'LKR', 'MAD', 'MXN', 'MYR', 'NAD', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PHP', 'PKR', 'PLN', 'QAR', 'RON', 'RUB', 'SAR', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'USD', 'VEF', 'XAF', 'XCD', 'XOF', 'ZAR'];
@Component({
  selector: 'app-devise',
  templateUrl: './devise.component.html',
  styleUrls: ['./devise.component.css']
})
export class DeviseComponent implements OnInit {
  ngOnInit(): void {
    
    
    
  }
  constructor(private chartService: ChartService,private router: Router ){}
  model2: any;
  model: any;
  quantity: number;
  list = {} as any ;
  dataChart={} as any;
  dateTime=new Array();
  closeData: number[]=[];
  result ='';
  error = '';
  x=[] as any;
  ar: Highcharts.Point[]=new Array();
  op: Highcharts.Point[]=new Array();
  hi: Highcharts.Point[]=new Array();
  low: Highcharts.Point[]=new Array();

  
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }




 

  @ViewChild('instance2', {static: true}) instance2: NgbTypeahead;
  focus2$ = new Subject<string>();
  click2$ = new Subject<string>();

  search2: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click2$.pipe(filter(() => !this.instance2.isPopupOpen()));
    const inputFocus$ = this.focus2$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }


 
  convert(){
 
  this.chartService.ConvertDevise(this.model, this.model2 , this.quantity).then((data)=>{
    if(this.model==this.model2 || this.error!=''){
      alert("Even currencies you've chosen are the same!\nor you can't convert these too currencies!\ntry EUR-->USD, USD-->TND, CHF-->CAD");

    }
    //console.log(data['result'])
    this.result=data['result']
    this.error=data['error']
  //console.log("x",data['chart'])
  this.x=data['chart']
  console.log("this", this.x);
  while(this.ar.length>0){
    this.ar.pop();
    this.hi.pop();
    this.low.pop();
    this.op.pop();
  }
  this.x.forEach(element => {
    //console.log("jj", element['close'])
    this.ar.push(element['close']);
    this.op.push(element['open']);
    this.hi.push(element['high']);
    this.low.push(element['low']);
    
  });

  })
 console.log("xx",this.ar)
 let h= Highcharts.chart('barChart', {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Evolution '
  },
  xAxis: {
    title: {
      text: 'Prediction (Dollars)',
      align: 'high'
    },
  },
  yAxis: {
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
    name: 'Close',
    color : 'Red',
    data:this.ar
  }, {
    type: undefined,
    name: 'Open',
    data: this.op
   
  },
  {
    type: undefined,
    name: 'Low',
    data: this.low
   
  },
  {
    type: undefined,
    name: 'High',
    data: this.hi
   
  },
 ]
});
 h.series[0].data=this.ar
 h.series[1].data=this.op
 h.series[2].data= this.low
 h.series[3].data= this.hi
 //h.update({series:this.ar},true, true)
 console.log("hhhh",h.series[0].data)
  h.redraw();
  
}



  }

