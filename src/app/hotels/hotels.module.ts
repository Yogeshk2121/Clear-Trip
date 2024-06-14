import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './hotels.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { HotelListComponent } from './hotel-list/hotel-list.component';

@NgModule({
  declarations: [
    HotelsComponent,
    HotelListComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    BsDatepickerModule,
    FormsModule
  ],
  exports: [
    HotelListComponent // Export the component if needed outside the module
  ]
})
export class HotelsModule { }
