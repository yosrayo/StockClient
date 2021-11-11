import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartService } from 'app/services/chart.service';
import * as Highcharts from 'highcharts';
import { data } from 'jquery';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  n: string;
  sy:string;
  p: Highcharts.Point[]=new Array();
  real = [] as any;
  list = [] as any;
  date = [] as any;
  ANAS = [] as any;
  x=[] as any;
  predicted =[] as any;
  symbole: string;
  logo:string;
  nom: string;
  close: Highcharts.Point[]=new Array();
  preds : Highcharts.Point[]=new Array();
  future = [] as any;
  err  = [] as any;
  new = [] as any;
  verif : boolean = false;
  constructor(private chartService: ChartService,private router: Router) { }

  ngOnInit() {
    this.nom= localStorage.getItem("nom")
    this.symbole= localStorage.getItem("symbole")
    this.logo= localStorage.getItem("logo")
   localStorage.getItem('symboleSoci');
   this.n= JSON.stringify(localStorage.getItem('symboleSoci'));
   console.log("this", this.n)
   //this.prediction();
    //location.reload()
   
  }

 
  prediction(){
    //this.predicted
    //this.real
    //this.close
    //this.ANAS
    //this.preds
  this.sy= localStorage.getItem('symboleSoci')
  //appel service
  this.chartService.EvolutionD(this.sy).then((data)=>{
  //list real
    this.real=JSON.parse(data['real'])
    //console.log("real", this.real)
  //list predicted  
    this.predicted= JSON.parse(data['predicted'])
  
    //message d'erreur en ca n'il ya pas de prediction 
    this.err= JSON.parse(data['err'])
    
    console.log("g", data)
    console.log("p",this.predicted )
    console.log("p",this.err )
    //#######Msg Erreur######   No predictions done yet, try again later !
    //console.log("pre", this.predicted)
    if ( this.err ==""){
    while(this.close.length>0){
      this.close.pop();
      this.real.pop();
      this.ANAS.pop();
      
    }

    while(this.preds.length>0){
      this.preds.pop();
      this.predicted.pop();
      this.ANAS.pop();
      
    }

    
 //liste close
  this.real.forEach(element => {
    this.close.push(element['close'])
    this.ANAS.push(null)
    //this.date.push(element['dateTime'])
    h.redraw();
   });

   //liste prediction
   this.predicted.forEach(element => {
    this.preds.push(element['pridiction'])
    //this.future.push(element['dateTime'])
    h.redraw();
   });
   this.predicted.forEach(element => {
    this.ANAS.push(element['pridiction'])
    this.future.push(element['dateTime'])
    h.redraw();
   }
   );
   while((this.new.length>0) && (!this.verif)){
    this.new.pop();  
  }
   for(let i=0; i<4 ; i++){
    
   this.new.push(this.predicted[i]);  
  }
  }else{
    alert(this.err)
    while(this.close.length>0){
      this.close.pop();
      this.real.pop();
    }
 //liste close
  this.real.forEach(element => {
    this.close.push(element['close'])
    //this.date.push(element['dateTime'])
    h.redraw();
   });
  }
  });

   let h= Highcharts.chart('barChart', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Evolution '
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: "%e. %b",
        month: "%b '%y",
        year: "%Y"
      },
      title: {
        text: 'Date',
      
      },
      
    
    },
    yAxis: {
      
      title: {
        text: 'Prediction (Dollars)',
        align: 'high'
      }
      
      
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
    series: [
      
      
      {
        type: undefined,
        name: 'Close',
        color : 'red',
        data:this.close
      },
     {
        type: undefined,
        name: 'Prediction',
        color : 'green',
        data: this.ANAS
      }
      
    
   ]
  });
  
  // h.series[0].data=this.preds
  // h.series[1].data=this.close
   h.redraw();
   console.log("h.series[Close]", h.series[0].data)
   console.log("h.series[Predictions]", h.series[1].data)
   //console.log("ff", h.series[1].data)
 console.log("err", this.err)
 this.verif= true; 
  
  
}


 
}