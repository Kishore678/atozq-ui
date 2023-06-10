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
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { JwtHelper } from './helpers/jwt-helper';
import { SpinnerService } from './services/spinner.service';
import { LinkifyPipe } from './helpers/linkify.pipe';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProductService } from './services/product.service';
import { AuthenticationService } from './services/authentication.service';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { ChangePwdSuccessComponent } from './components/change-pwd-success/change-pwd-success.component';
import { CategoryService } from './services/category.service';
import { DetailComponent } from './components/detail/detail.component';
import { NavigationService } from './services/navigation.service';
import { ShareService } from './services/share.service';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent,HomeComponent, LoginComponent, RegisterComponent, ReferralComponent, ShoppingComponent, LogoutComponent, DialogBoxComponent, LinkifyPipe, PagenotfoundComponent, ForgotpassComponent, ResetpassComponent, ChangePwdSuccessComponent, DetailComponent, UploadComponent],
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
  providers: [{provide:HTTP_INTERCEPTORS,useClass:JwtHelper,multi:true},{provide: LocationStrategy, useClass:  PathLocationStrategy},AuthenticationService,ProductService,CategoryService,SpinnerService,NavigationService,ShareService],
  bootstrap: [AppComponent],
})
export class AppModule {}
