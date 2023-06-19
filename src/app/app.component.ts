import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { SpinnerService } from './services/spinner.service';
import { DatePipe } from '@angular/common';

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
  online:number=54;
  visited:number=2458;
  dt:any;
  private _mobileQueryListener: () => void;

  constructor(private datepipe:DatePipe,public changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public auth:AuthenticationService,private router:Router,public spinnerService:SpinnerService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); 
    this.dt =this.datepipe.transform((new Date), 'MM/dd/yyyy');
  }
  
  ngAfterContentChecked(): void {   
   this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logOut()
  {
    this.auth.logOut(); 
    this.router.navigate(["/account/logout"]);
  }
}

