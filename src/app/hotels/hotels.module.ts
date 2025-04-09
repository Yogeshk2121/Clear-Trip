import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './hotels.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelFilterComponent } from './hotel-filter/hotel-filter.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';

// In @NgModule declaration mention all the componant which we neeed in the module for ex.hotls,hotelList,hotelFilter like this
@NgModule({
  declarations: [
    HotelsComponent,
    HotelListComponent,
    HotelFilterComponent,
    HotelDetailsComponent
  ],
  //this are the module which repuired in our componant or module of this features 
  imports: [
    CommonModule, //ngIf ngFor 
    HotelsRoutingModule, //navigate from one componant to another componant
    BsDatepickerModule, //to create the daate picker 
    FormsModule //To bind the properties in componant
  ],
  exports: [
    HotelListComponent // Export the component if needed outside the module
  ]
})
export class HotelsModule { }
// all the componant and methods features include in the module we need to import and export regarding the componant
