import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { AuthService } from './services/auth.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { JwtHelper } from './helpers/jwt-helper';
import { SpinnerService } from './services/spinner.service';

@NgModule({
  declarations: [AppComponent, DashboardComponent,HomeComponent, LoginComponent, RegisterComponent, ReferralComponent, ShoppingComponent, LogoutComponent, DialogBoxComponent],
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
  providers: [{provide:HTTP_INTERCEPTORS,useClass:JwtHelper,multi:true},{provide: LocationStrategy, useClass:  PathLocationStrategy},AuthService,ItemService,SpinnerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
