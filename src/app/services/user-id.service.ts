import { Injectable } from '@angular/core';
import {getCurrentBrowserFingerPrint} from '@rajesh896/broprint.js';

@Injectable({
  providedIn: 'root'
})
export class UserIDService {
  constructor() {};
 getUserId():Promise<string>
  {   
  return getCurrentBrowserFingerPrint(); 
  }
}
