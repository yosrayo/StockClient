import { Component, OnInit } from '@angular/core';
import { SocieteService } from '../../services/societe.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [NgbPaginationConfig] 
})
export class CartComponent implements OnInit {
  public page =1;
  public pageSize = 3;
  list = {} as any ;
 nom: string;
  constructor(private societeService:SocieteService,config: NgbPaginationConfig) {  
     // customize default values of paginations used by this component tree
    config.size = 'sm';
    config.boundaryLinks = true;
  }

 
  ngOnInit(): void {
   
    this.societeService .getSocietes().subscribe((res) => {
      this.list = res;
      console.log("societe",this.list);
      
    });

   
     
  }

  detail(){
    localStorage.setItem("id",JSON.stringify(this.list.nom));
    if(this.nom==localStorage.getItem("id")){
      localStorage.setItem("id",JSON.stringify(this.list));
    }
   }


   
}
