import { Injectable } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, from, Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private router: Router,
    private http: HttpClient) { }



    header = new HttpHeaders({     'Content-Type': 'application/json'   })
     
 
 //Evolution
 EvolutionD(symbol: String){
  return new Promise((resolve, reject) => {
    this.http.get(environment.rglobal +'/predict?symbol=' +symbol).subscribe(
      (response) => {
        resolve(response);
      
      },
      (error) => {
        reject(error);
      }
    );
  });
 }

//convert Devise

 ConvertDevise(currency_base: String ,currency_to:String , quantity: number){
  return new Promise((resolve, reject) => {
    this.http.get(environment.rglobal +'/convert?currency_base='+currency_base+'&currency_to='+currency_to+'&quantity='+quantity).subscribe(
      (response) => {
        resolve(response);
        
        console.log("result",response['result'])
        console.log("error",response['error'])

        
      },
      (error) => {
        reject(error);
      }
    );
  });

 }

}
