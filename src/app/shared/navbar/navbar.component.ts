import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SocieteService } from 'app/services/societe.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    sign: string;
    list = {} as any ;
    constructor(public location: Location, private element : ElementRef,private societeService:SocieteService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
      
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

        this.societeService .getSocietes().subscribe((res) => {
            this.list = res;
            console.log("societe",this.list);
            
          });
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    
   
      c() {
        if(localStorage.getItem('name') === '') {
          return false;
        } else {
          return true;
        }
      }
      //llogout
      logout() {
        window.location.replace("login");
        localStorage.setItem("name","");
        localStorage.removeItem("role");
       
      }
      rec(m){
       localStorage.setItem("symboleSoci",m.symbole);
       localStorage.setItem("nom",m.nom);
       localStorage.setItem("logo",m.logo);
       localStorage.setItem("symbole",m.symbole);
       window.location.replace("#/details");
       location.reload();
      }
    
}
