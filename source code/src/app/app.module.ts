import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeService } from './services/home.service';
import { HomeComponent } from './components/home/home/home.component';
import { Routes, RouterModule } from '@angular/router'; 
import { ROUTES } from './app.router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [RouterModule],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
