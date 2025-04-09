import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/service/http.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit{


  hotelId!:number;
  hotelDetails: any;
  

  //types of services inject into constructor
  //Injects ActivatedRoute, which helps access the query parameters and route parameters from the URL.
  //Injects HttpService, which is a custom Angular service that handles HTTP requests.

  constructor(private activatedRoute:ActivatedRoute, private http:HttpService ){

  }

  //ngOnInit() is a lifecycle hook in Angular that runs after the component is initialized.

  // ngOnInit(){
  //   // .queryParams gives access to query parameters from the current route.
  //   //Since queryParams is an Observable, we must subscribe() to read its values.

  //   this.activatedRoute.queryParams.subscribe(params => {
      
  //     //+params['id'] converts the string "101" into a number 101.
  //     this.hotelId = +params['id']; // from Query param get the hotel ID 
  //     this.getHotelDetails();
  //   });
    
  // }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('Query Params:', params); // Log the query parameters
      this.hotelId = params['id']? params['id'].toString() : ''; // Ensure this is the correct parameter name
      console.log('Extracted hotelId:', this.hotelId); // Log extracted ID
  
      if (this.hotelId) {
        console.log('Hotel ID received:', this.hotelId); // Check the ID
        this.getHotelDetails();
      } else {
        console.warn('No hotel ID found in query parameters');
      }
    });
  }
  
  
  getHotelDetails() {
    this.http.getHotelById(this.hotelId).subscribe({
      next: (response) => {
        console.log('API Response:', response); // Log the full response to check structure
        if (response && response.length > 0) {
          this.hotelDetails = response[0]; // Ensure it is an array and pick the first item
          console.log('Hotel Details:', this.hotelDetails); // Log the hotel details
        } else {
          console.warn('No hotel data found for ID:', this.hotelId); // No data
        }
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }
  
  
}
