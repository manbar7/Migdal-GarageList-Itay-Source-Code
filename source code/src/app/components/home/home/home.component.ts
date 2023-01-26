import { Component, OnInit } from '@angular/core';
import { Observable,Observer } from 'rxjs';
import { Areas, Garage } from 'src/app/models/garage.model';
import { HomeService } from 'src/app/services/home.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  garage:Garage | undefined;
  garages:Garage[] = [] ;
  areas:any;
  isLoading: boolean = false;
  unit:number = 1.609344;
  currentLat:number = 0 ;
  currentLong:number = 0;
  lat1:number = 0;
  lon1:number = 0;
  lat2:number = 0;
  lon2:number =0;
  garages$!: Observable<Garage[]>;
  searchValue:string = "";
  noResults:boolean = false;
  AreaPick:string | undefined;
  constructor(private homeService: HomeService){ }

  ngOnInit(): void {
    this.isLoading = true;
   this.callApi();
   this.getAreas();
  
   this.getPosition().subscribe(pos => {
    console.log(pos);
    this.currentLong = pos.coords.longitude;
    this.currentLat = pos.coords.latitude;
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);
 });
  }


  calcLocation(garages:Garage[]) {
    garages.map(garage => {
     garage.Distance = (this.getDistance(garage.Location.Latitude,garage.Location.Longitude, this.currentLat, this.currentLong)).toString();
     console.log(garage.Distance,"distance ")
    })
    
    garages.sort((a, b) =>parseInt(a.Distance)  - parseInt(b.Distance));
  }

  getPosition(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      },
        error => observer.error(error));
    });
}

 getDistance(lat1:number, lon1:number, lat2:number, lon2:number) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344 
		return Math.round(dist * 100) / 100
   
	}
}

searchByCity() {
  this.isLoading = true;
  this.homeService.getGarages(this.searchValue).subscribe(
    (res: any) => {
      this.isLoading = false;
      this.garages = res.Data.GaragesList
      if (this.garages.length < 1) {      
       this.noResults = true;
      } 
      //this.garages$ = this.garages;
      this.calcLocation(this.garages);
      console.log(this.garages)
    },
    (error:any) => {
      console.log("error...");
    }
  );
}


getByArea(event:any) {
  this.isLoading = true;
  if (this.searchValue === "") {
    this.homeService.getGaragesByArea(event.target.value).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.garages = res.Data.GaragesList
        if (this.garages.length < 1) {      
         this.noResults = true;
        } 
        //this.garages$ = this.garages;
        this.calcLocation(this.garages);
        console.log(this.garages)
      },
      (error:any) => {
        console.log("error...");
      }
    );
  } else {
    this.homeService.getGaragesByArea(event.target.value,this.searchValue).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.garages = res.Data.GaragesList
        if (this.garages.length < 1) {      
         this.noResults = true;
        } 
        //this.garages$ = this.garages;
        this.calcLocation(this.garages);
        console.log(this.garages)
      },
      (error:any) => {
        console.log("error...");
      }
    );
  }
  
}

selectOption(event:any) {
  console.log(event.value);
}

getSearchValue(event:any) {
  this.searchValue = event.target.value;
}

getAreas(){
  this.homeService.getGarageAreas("").subscribe(
    (res: any) => {
      this.isLoading = false;
      this.areas = res.Data;
      console.log(this.areas)
    },
    (error:any) => {
      console.log("error...");
    }
  );
}
callApi() {
    this.noResults = false;
    this.searchValue = "";
    this.AreaPick = "default"
    this.isLoading = true;
    this.homeService.getGarages("").subscribe(
      (res: any) => {
        this.isLoading = false;
        this.garages = res.Data.GaragesList
       
        //this.garages$ = this.garages;
        this.calcLocation(this.garages);
        console.log(this.garages)
      },
      (error:any) => {
        console.log("error...");
      }
    );
  }
}
