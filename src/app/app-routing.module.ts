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

const routes: Routes = [
  {path:'',component:UploadComponent},
  {path:':page',component:HomeComponent},
  {path:'app/search',component:HomeComponent},
  {path:'app/search/:id',component:HomeComponent},
  {path:'account/login',component:LoginComponent},
  {path:'account/register',component:RegisterComponent},
  {path:'account/forgotpass',component:ForgotpassComponent},
  {path:'account/pwdsuccess',component:ChangePwdSuccessComponent},
  {path:'account/profile',component:ResetpassComponent},
  {path:'account/resetpass/:user/:token',component:ResetpassComponent},
  {path:'account/logout',component:LogoutComponent},
  {path:'account/anonymous',component:AnonymousComponent},
  {path:'app/referral',component:ReferralComponent},
  {path:'app/detail/:id',component:DetailComponent},
  {path:'app/shopping',component:ShoppingComponent},
  {path:'app/dashboard',component:DashboardComponent,canActivate:[AuthenticationService]},
  {path:'app/dps',component:DataPortStatusComponent},
  {path:'app/stock',component:UploadComponent},
  {path:'app/log',component:LogComponent},
  {path:'app/help',component:HelpComponent},
  {path:'app/terms',component:TermsComponent},
  {path:'app/disclaimer',component:DisclaimerComponent},
  {path:'app/privacy',component:PrivacyComponent},
  {path:'app/stock/:id',component:FundamentalsComponent},
  {path:'app/learn',component:LearnComponent},
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
