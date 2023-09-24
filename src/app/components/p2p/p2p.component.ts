// import { Component, OnInit } from '@angular/core';
// import { P2PModel } from 'src/app/models/p2-pmodel.model';
// import { P2pService } from 'src/app/services/p2p.service';
// import Swal from 'sweetalert2';
// // #docplaster
// import { JsonPipe, NgFor } from '@angular/common';

// import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
// // #docregion validator-imports
// import { Validators } from '@angular/forms';
// // #enddocregion validator-imports
// import { FormArray } from '@angular/forms';

// @Component({ 
//   selector: 'app-p2p',
//   templateUrl: './p2p.component.html',
//   styleUrls: ['./p2p.component.css']
// })
// export class P2pComponent implements OnInit {
// p2pSettings!:P2PModel;
//   constructor(private p2pService:P2pService,private fb: FormBuilder) { }

//   ngOnInit(): void {
//     this.p2pService.GetSettings().subscribe({
//       next:(res)=> { this.p2pSettings = res;},
//       error:(err)=>{console.log(err);}
//     });
//   }

//   ngAfterViewInIt()
//   {
//     this.profileForm.patchValue({
//       SettingsId:this.p2pSettings.SettingsId,
//       isEnabled:this.p2pSettings.IsEnabled,
//       limitPerDay:this.p2pSettings.LimitPerDay,
//       investAmt:this.p2pSettings.InvestAmt,
//       minInvestAmt:this.p2pSettings.MinInvestAmt,
//       createdOn:this.p2pSettings.CreatedOn,
//       modifiedDate:this.p2pSettings.ModifiedDate,
//       TPin:this.p2pSettings.TPin
//     }); 
//   }

//   ResetProfile() {
//     this.profileForm.patchValue({
//       SettingsId: '1'  
//     });
//   }


 

//   onSubmit() {
//     console.warn(this.profileForm.value);
//   }

//   profileForm = this.fb.group({
//     SettingsId: ['', Validators.required],
//     IsEnabled: [''],
    
//       LimitPerDay: [''],
//       InvestAmt: [''],
//       MinInvestAmt: [''],
//       TPin: [''],
//       CreatedOn: [''],
//       ModifiedDate: ['']
//   });
// }




import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActiveBorrowers } from 'src/app/models/active-borrowers.model';
import { P2PModel } from 'src/app/models/p2-pmodel.model';
import { P2pService } from 'src/app/services/p2p.service';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-p2p',
  templateUrl: './p2p.component.html',
  styleUrls: ['./p2p.component.css']
})
export class P2pComponent implements OnInit {
	isValidFormSubmitted!:boolean;
	userForm!: FormGroup;
  settings!:P2PModel[];
  borrowers!:ActiveBorrowers[];
	
  constructor(private p2pService:P2pService,private formBuilder: FormBuilder) { }
	ngOnInit() {

    this.userForm = this.formBuilder.group({
      settingsId: 0,
      isEnabled: false,
      limitPerDay: 0,
      investAmt: 0,
      minInvestAmt: 0,
      createdOn: 0,
      modifiedDate: 0,
      tPin: ''			
    });

  	
	}

  ngAfterViewInit()
  {   
    this.p2pService.GetSettings().subscribe({
      next:(res)=> { 
this.settings = res;

this.userForm.patchValue({
  settingsId: this.settings[0].settingsId,
  isEnabled: this.settings[0].isEnabled,
  limitPerDay: this.settings[0].limitPerDay,
  investAmt: this.settings[0].investAmt,
  minInvestAmt: this.settings[0].minInvestAmt,
  createdOn: this.settings[0].createdOn,
  modifiedDate: this.settings[0].modifiedDate,
  tPin: this.settings[0].tPin		
});

      },
      error:(err)=>{ Swal.fire('Something went wrong!');}
    });	  
    this.LoadBorrowers();  
  }

  get settingsId() {
		return this.userForm.get('settingsId');
	}
  get isEnabled() {
		return this.userForm.get('isEnabled');
	}
  get limitPerDay() {
		return this.userForm.get('limitPerDay');
	}
  get investAmt() {
		return this.userForm.get('investAmt');
	}
  get minInvestAmt() {
		return this.userForm.get('minInvestAmt');
	}
  get createdOn() {
		return this.userForm.get('createdOn');
	}
  get modifiedDate() {
		return this.userForm.get('modifiedDate');
	}
  get tPin() {
		return this.userForm.get('tPin');
	}

	onFormSubmit() {
		this.isValidFormSubmitted = false;
		if (this.userForm.invalid) {
			return;
		}

    let model = new P2PModel();

    model.settingsId = this.userForm.get('settingsId')?.value;
    model.isEnabled = this.userForm.get('isEnabled')?.value;
    model.limitPerDay = this.userForm.get('limitPerDay')?.value;
    model.investAmt = this.userForm.get('investAmt')?.value;
    model.minInvestAmt = this.userForm.get('minInvestAmt')?.value;
    model.tPin = this.userForm.get('tPin')?.value;
    model.createdOn = this.userForm.get('createdOn')?.value;
    model.modifiedDate = this.userForm.get('modifiedDate')?.value;

    this.p2pService.SaveSettings(model.settingsId,model).subscribe({
      next:(res)=>{
        this.settings = res;
this.userForm.patchValue({
  settingsId: this.settings[0].settingsId,
  isEnabled: this.settings[0].isEnabled,
  limitPerDay: this.settings[0].limitPerDay,
  investAmt: this.settings[0].investAmt,
  minInvestAmt: this.settings[0].minInvestAmt,
  createdOn: this.settings[0].createdOn,
  modifiedDate: this.settings[0].modifiedDate,
  tPin: this.settings[0].tPin		
});
      },
      error:(err)=>{
        Swal.fire('Something went wrong!');
      }
    });
		this.isValidFormSubmitted = true;			
	}	

  restoreUserValues() {
    this.userForm.patchValue({      
      isEnabled:this.settings[0].isEnabled,
      limitPerDay: this.settings[0].limitPerDay,
      investAmt: this.settings[0].investAmt,
      minInvestAmt:this.settings[0].minInvestAmt,    
      tPin: this.settings[0].tPin			
    });
	}

	patchUserValues() {
    this.userForm.patchValue({      
      isEnabled: true,
      limitPerDay: 5,
      investAmt: 1000,
      minInvestAmt: 1000,      
      tPin: '2898'		
    });
	}


  LoadBorrowers()
  {
    this.p2pService.GetActiveBorrowers().subscribe({
      next:(event)=>{
        this.borrowers = event;
      },
      error:(err)=>{
        Swal.fire('Something went wrong. Please try again after sometime.');   
        console.log(err);
      }
    });    
  }

DeleteWatchListItem(w:ActiveBorrowers)
{
  var confirmMessage =  w.loadId+' '+w.riskCategory+' '+w.creditBureauScore+' '+w.interestCurrentRate+'%'+' '+(w.tenure+' '+(w.tenureType=='d'?'D':'M'))+' removed from Active Borrowers List.';
  Swal.fire({
    title: 'Are you sure?',
    text: 'Remove '+confirmMessage,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think',
  }).then((result) => {
    if (result.value) {      
      this.p2pService.DeleteBorrower(w.activeBorrowersId).subscribe({
        next:(event)=>{
          this.borrowers = event;
            Swal.fire('Removed!', confirmMessage,'success');                 
        },
        error:(err)=>{console.log(err);
          Swal.fire('Cancelled','Something went wrong. Please try again.', 'error');
        }
      });
      
    } 
  });

}

} 

  
