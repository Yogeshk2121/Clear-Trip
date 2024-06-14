import { Component } from '@angular/core';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent {
  city:string="";
  selectedDate!:Date[];
  selRooms:string="";
  checkInDate:any="";
  checkOutDate:any="";

  roomsOptArr:any=["1 Rooms 1 Adults","1 Rooms 2 Adults","2 Rooms 4 Adults"];




  dateChange() {
    if(this.selectedDate && this.selectedDate.length==2){
this.checkInDate = this.selectedDate[0];
this.checkOutDate = this.selectedDate[1];

    }


  }
  searchHotel(){
    console.log("sel",this.city);
    console.log("sel Date",this.selectedDate);

  }

  selectRooms(option:string){
    this.selRooms = option;

  }

}
