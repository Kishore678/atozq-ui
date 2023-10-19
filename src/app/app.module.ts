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
import { DatePipe, LocationStrategy, PathLocationStrategy, TitleCasePipe } from '@angular/common';
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
import { UploadComponent } from './components/upload/upload.component';
import { LogComponent } from './components/log/log.component';
import { LogService } from './services/log.service';
import { ScriptdetailsService } from './services/scriptdetails.service';
import { ScriptDetailsDialogComponent } from './components/script-details-dialog/script-details-dialog.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TooltipListPipe } from './pipes/tooltip-list.pipe';
import { DataPortStatusComponent } from './components/data-port-status/data-port-status.component';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { ChatService } from './services/chat.service';
import { UserIDService } from './services/user-id.service';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { WarnDialogComponent } from './components/warn-dialog/warn-dialog.component';
import { HelpComponent } from './components/help/help.component';
import { TermsComponent } from './components/terms/terms.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { UtcToLocalTimePipe } from './pipes/utc-to-local-time.pipe';
import { FundamentalsComponent } from './components/fundamentals/fundamentals.component';
import { UtcConverterService } from './pipes/utc-converter.service';
import { LearnComponent } from './components/learn/learn.component';
import { ValuepickrComponent } from './components/valuepickr/valuepickr.component';
import { P2p8678Component } from './components/p2p/p2p8678.component';
import { P2pService } from './services/p2p.service';
import { P2pmanComponent } from './components/p2pman/p2pman.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CibilMasterFormDialogComponent } from './components/cibil-master-form-dialog/cibil-master-form-dialog.component';
import { InvestSettingsRulesFormDialogComponent } from './components/invest-settings-rules-form-dialog/invest-settings-rules-form-dialog.component';
import { SmtpSettingsFormDialogComponent } from './components/smtp-settings-form-dialog/smtp-settings-form-dialog.component';
import { ServiceSettingsFormDialogComponent } from './components/service-settings-form-dialog/service-settings-form-dialog.component';
import { FdComponent } from './components/fd/fd.component';
import { MfComponent } from './components/mf/mf.component';
import { SgbComponent } from './components/sgb/sgb.component';
import { P2pComponent } from './components/p2p/p2p.component';
import { RefComponent } from './components/ref/ref.component';
@NgModule({
  declarations: [AppComponent, DashboardComponent,HomeComponent, LoginComponent, RegisterComponent, ReferralComponent, ShoppingComponent, LogoutComponent, DialogBoxComponent, LinkifyPipe, PagenotfoundComponent, ForgotpassComponent, ResetpassComponent, ChangePwdSuccessComponent, DetailComponent, UploadComponent, LogComponent, ScriptDetailsDialogComponent, TooltipListPipe, DataPortStatusComponent, ChatDialogComponent, AnonymousComponent, WarnDialogComponent, HelpComponent, TermsComponent, DisclaimerComponent, PrivacyComponent, UtcToLocalTimePipe, FundamentalsComponent, LearnComponent, ValuepickrComponent, P2p8678Component, P2pmanComponent, ConfirmationDialogComponent, CibilMasterFormDialogComponent, InvestSettingsRulesFormDialogComponent, SmtpSettingsFormDialogComponent, ServiceSettingsFormDialogComponent, FdComponent, MfComponent, SgbComponent, P2pComponent, RefComponent],
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
  entryComponents: [ConfirmationDialogComponent],
  providers: [UtcToLocalTimePipe,TitleCasePipe,DatePipe,{provide:HTTP_INTERCEPTORS,useClass:JwtHelper,multi:true},{provide: LocationStrategy, useClass:  PathLocationStrategy},AuthenticationService,ProductService,CategoryService,SpinnerService,NavigationService,ShareService,LogService,ScriptdetailsService,DeviceDetectorService,ChatService,UserIDService,UtcConverterService,P2pService],
  bootstrap: [AppComponent],
})
export class AppModule {}
