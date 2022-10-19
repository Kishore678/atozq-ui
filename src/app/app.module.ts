import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReferralComponent } from './components/referral/referral.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ItemService } from './services/item.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, RegisterComponent, DashboardComponent, ReferralComponent, ShoppingComponent, LogoutComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule    
  ],
  providers: [ItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
