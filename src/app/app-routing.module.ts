import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ReferralComponent } from './components/referral/referral.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { AuthenticationService } from './services/authentication.service';
import { ChangePwdSuccessComponent } from './components/change-pwd-success/change-pwd-success.component';
import { DetailComponent } from './components/detail/detail.component';
import { UploadComponent } from './components/upload/upload.component';
import { LogComponent } from './components/log/log.component';
import { DataPortStatusComponent } from './components/data-port-status/data-port-status.component';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { HelpComponent } from './components/help/help.component';
import { TermsComponent } from './components/terms/terms.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { FundamentalsComponent } from './components/fundamentals/fundamentals.component';
import { LearnComponent } from './components/learn/learn.component';
import { ValuepickrComponent } from './components/valuepickr/valuepickr.component';
import { P2p8678Component } from './components/p2p/p2p8678.component';
import { P2pmanComponent } from './components/p2pman/p2pman.component';
import { P2pComponent } from './components/p2p/p2p.component';
import { MfComponent } from './components/mf/mf.component';
import { SgbComponent } from './components/sgb/sgb.component';
import { FdComponent } from './components/fd/fd.component';
import { RefComponent } from './components/ref/ref.component';
import { RefmanComponent } from './components/refman/refman.component';
import { LendenclubComponent } from './components/lendenclub/lendenclub.component';
import { CcmsComponent } from './components/ccms/ccms.component';
import { TrackloanComponent } from './components/trackloan/trackloan.component';

const routes: Routes = [
  {path:'',component:ValuepickrComponent},
  {path:'stock',component:ValuepickrComponent},
  
  // {path:':page',component:HomeComponent},
  // {path:'app/search',component:HomeComponent},
  // {path:'app/search/:id',component:HomeComponent},
  // {path:'account/login',component:LoginComponent},
  // {path:'account/register',component:RegisterComponent},
  // {path:'account/forgotpass',component:ForgotpassComponent},
  // {path:'account/pwdsuccess',component:ChangePwdSuccessComponent},
  // {path:'account/profile',component:ResetpassComponent},
  // {path:'account/resetpass/:user/:token',component:ResetpassComponent},
  // {path:'account/logout',component:LogoutComponent},
  {path:'account',component:AnonymousComponent},
  {path:'lendenclub',component:LendenclubComponent},
  {path:'ccms',component:CcmsComponent},
  {path:'track',component:TrackloanComponent},
  // {path:'app/referral',component:ReferralComponent},
  // {path:'app/detail/:id',component:DetailComponent},
  // {path:'app/shopping',component:ShoppingComponent},
  // {path:'app/dashboard',component:DashboardComponent,canActivate:[AuthenticationService]},
  {path:'dps',component:DataPortStatusComponent},
  // {path:'app/stock',component:UploadComponent},
  {path:'log',component:LogComponent},
  // {path:'app/help',component:HelpComponent},
  {path:'termsofuse',component:TermsComponent},
  {path:'disclaimer',component:DisclaimerComponent},
  {path:'privacypolicy',component:PrivacyComponent},
  // {path:'app/stock/:id',component:FundamentalsComponent},
  {path:'learn',component:LearnComponent},
  {path:'valuepickr',component:ValuepickrComponent},
  {path:'fd',component:FdComponent},
  {path:'p2p',component:P2pComponent},
  {path:'mf',component:MfComponent},
  {path:'sgb',component:SgbComponent},
  {path:'ref',component:RefComponent},
  {path:'p2p8678',component:P2p8678Component},
  {path:'p2pman8678',component:P2pmanComponent},
  {path:'refman',component:RefmanComponent},
  {path:'**', pathMatch: 'full',component:PagenotfoundComponent},

];
export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top', useHash: false }),
  JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      allowedDomains: ["http://localhost:24288","api.atozq.com","atozq.somee.com"],
      disallowedRoutes: []
    }
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
