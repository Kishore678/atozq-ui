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

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'product',component:HomeComponent},
  {path:'product/:id',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgotpass',component:ForgotpassComponent},
  {path:'pwdsuccess',component:ChangePwdSuccessComponent},
  {path:'profile',component:ResetpassComponent},
  {path:'resetpass/:user/:token',component:ResetpassComponent},
  {path:'logout',component:LogoutComponent},
  {path:'referral',component:ReferralComponent},
  {path:'shopping',component:ShoppingComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthenticationService]},
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
      allowedDomains: ["http://localhost:24288","api.atozq.com"],
      disallowedRoutes: []
    }
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
