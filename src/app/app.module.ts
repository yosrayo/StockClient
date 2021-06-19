import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import {  HttpClientModule, HttpClient , HTTP_INTERCEPTORS} from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WebStorageModule } from 'h5webstorage';
import {NgxPaginationModule} from 'ngx-pagination';
import { HighchartsChartModule } from 'highcharts-angular';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    WebStorageModule.forRoot(),
    RouterModule,
    ComponentsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    HttpClientModule,
    NgxPaginationModule,
    HighchartsChartModule    
   
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
