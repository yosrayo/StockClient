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
  s = {} as any ;
 nom: string;
 symb : string;
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

  detail(m){
    this.symb= m.symbole
    console.log("h", this.symb);
    localStorage.setItem("societeP",this.s)
    localStorage.setItem("symboleSoci",this.symb);
    localStorage.setItem("nom",m.nom);
    localStorage.setItem("logo",m.logo);
    localStorage.setItem("symbole",m.symbole);
    window.location.replace("#/details")
   }


   
}
