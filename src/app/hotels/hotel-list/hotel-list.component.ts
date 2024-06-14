import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/service/http.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit{

  

  searchHotelObj:any={

    city:"",
    checkInDate:null,
    checkOutDate:null,
    selRooms:""

  }
  hotelList:any;
  constructor(private activatedRoute: ActivatedRoute,private http:HttpService) {
    this.searchHotelObj.city = this.activatedRoute.snapshot.queryParamMap.get("city");
    this.searchHotelObj.checkInDate = this.activatedRoute.snapshot.queryParamMap.get("checkIn");
    this.searchHotelObj.checkOutDate = this.activatedRoute.snapshot.queryParamMap.get("checkOut");
    this.searchHotelObj.selRooms = this.activatedRoute.snapshot.queryParamMap.get("rooms");

    console.log("Search Hotel Obj", this.searchHotelObj)
  }

  
  ngOnInit(){
    let endPoint="search-hotels";

    this.http.getHotelsDataFromServer(endPoint,this.searchHotelObj).subscribe((el:any)=>{
      if(el && el.response && el.response.personalizedSections){
         this.hotelList = el.response.personalizedSections[0].hotels;
         console.log("Hotels",this.hotelList)
      }
    });
  }

}
