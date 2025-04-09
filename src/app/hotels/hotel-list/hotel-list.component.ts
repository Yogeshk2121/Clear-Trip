import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {



  searchHotelObj: any = {

    city: "",
    checkInDate: null,
    checkOutDate: null,
    selRooms: ""

  }

  hotelList: any;
  hotelListCopy: any;

  selectedType: string = "";

  constructor(private activatedRoute: ActivatedRoute, private http: HttpService,private router:Router) {
    this.searchHotelObj.city = this.activatedRoute.snapshot.queryParamMap.get("city");
    this.searchHotelObj.checkInDate = this.activatedRoute.snapshot.queryParamMap.get("checkIn");
    this.searchHotelObj.checkOutDate = this.activatedRoute.snapshot.queryParamMap.get("checkOut");
    this.searchHotelObj.selRooms = this.activatedRoute.snapshot.queryParamMap.get("rooms");

    console.log("Search Hotel Obj", this.searchHotelObj)
  }


  ngOnInit() {
    let endPoint = "search-hotels";

    this.http.getHotelsDataFromServer(endPoint, this.searchHotelObj).subscribe((el: any) => {
      if (el && el.response && el.response.personalizedSections) {
        this.hotelList = el.response.personalizedSections[0].hotels;

        //copy one Array into another Array. 
        this.hotelListCopy = [...this.hotelList];
        console.log("Hotels", this.hotelListCopy)
      }
    });
  }

    //selected hotel details 
  selectHotel(hotelId:string){
    // Navigate to hotel details page
    this.router.navigate(['/hotels/hotel-details'], {queryParams:{id:hotelId}}); 

  }
  sortHotel(type: string) {
    this.selectedType = type;

    if (type == 'Rating') {
      this.hotelList.sort((a: any, b: any) => b.reviewSummary.cumulativeRating - a.reviewSummary.cumulativeRating);

    } else if (type == 'Highest') {
      this.hotelList.sort((a: any, b: any) => b.priceDetail.discountedPrice - a.priceDetail.discountedPrice);

    } else if (type == 'Lowest') {
      this.hotelList.sort((a: any, b: any) => a.priceDetail.discountedPrice - b.priceDetail.discountedPrice);

    }
  }

  getFilterCriteria(filterCriteria: any) {
    console.log("filter criteria", filterCriteria)
    //this for Single filter criteria 
    //this.filterHotels(filterCriteria);


    //this for Multi filter criteria 
    this.filterHotelsByMultiFilterAction(filterCriteria);

  }


  filterHotels(criteria: any) {
    if (criteria.type == "RATING" && criteria.isSelected) {
      //filter based on rating 
      this.hotelList = this.hotelListCopy.filter((el: any) => el.reviewSummary.cumulativeRating > criteria.filterValue)
    } else if (criteria.type == "HOTEL_PRICE_BUCKET" && criteria.isSelected) {
      //filter based on Price 
      this.hotelList = this.hotelListCopy.filter((el: any) => (el.priceDetail.discountedPrice > criteria.filterRange.min && el.priceDetail.discountedPrice < criteria.filterRange.max));

    } else {
      this.hotelList = this.hotelListCopy;
    }
  }

  filterHotelsByMultiFilterAction(criteriaArr: any) {
    if (!criteriaArr || criteriaArr.length === 0) {
      // Reset to original list if no filters are selected
      this.hotelList = [...this.hotelListCopy];
      return;
    }

    let filteredHotels = [...this.hotelListCopy];

    criteriaArr.forEach((criteria: any) => {
      if (criteria.type === "RATING") {
        // Filter hotels that meet rating criteria
        filteredHotels = filteredHotels.filter(
          (hotel: any) => hotel.reviewSummary.cumulativeRating >= criteria.filterValue
        );
      }
      if (criteria.type === "HOTEL_PRICE_BUCKET") {
        // Filter hotels that fall within the selected price range
        filteredHotels = filteredHotels.filter(
          (hotel: any) =>
            hotel.priceDetail.discountedPrice >= criteria.filterRange.min &&
            hotel.priceDetail.discountedPrice <= criteria.filterRange.max
        );
      }
    });

    // Update the hotel list with the filtered hotels
    this.hotelList = filteredHotels;
  }

  
 
 


}

