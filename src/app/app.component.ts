import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SpinnerService } from './services/spinner.service';

/** @title Responsive sidenav */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'atozq-ui';
  mobileQuery: MediaQueryList;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  private _mobileQueryListener: () => void;

  constructor(public changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private authservice:AuthService,private router:Router,public spinnerService:SpinnerService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  
  ngAfterContentChecked(): void {
   this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logOut()
  {
    this.authservice.logOut(); 
    this.router.navigate(["/logout"]);
  }
  isUserAuthenticated() {
   return this.authservice.isLoggedIn();
  }

}

