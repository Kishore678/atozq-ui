import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActiveBorrowers } from 'src/app/models/active-borrowers.model';
import { ManageBorrowers } from 'src/app/models/manage-borrowers.model';
import { P2PModel } from 'src/app/models/p2-pmodel.model';
import { P2pService } from 'src/app/services/p2p.service';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-p2p8678',
  templateUrl: './p2p8678.component.html',
  styleUrls: ['./p2p8678.component.css']
})
export class P2p8678Component implements OnInit {
	isValidFormSubmitted!:boolean;
	userForm!: FormGroup;
  settings!:P2PModel[];
  borrowers!:ManageBorrowers[];
	
  constructor(private p2pService:P2pService,private formBuilder: FormBuilder) { }
	ngOnInit() {

    this.userForm = this.formBuilder.group({
      settingsId: 0,
      isEnabled: false,
      limitPerDay: 0,
      investAmt: 0,
      minInvestAmt: 0,
      investAmtA:0,
      investAmtB:0,
      investAmtC:0,
      investAmtD:0, 
      investAmtE:0, 
      investAmtX:0,
      cibilPoor:0,
      cibilAverage:0,
      cibilGood:0,
      cibilExcellent:0,
      tPin: '',	
      smtpFromUser:'',
      smtpFromEmailAddress:'',
      smtpHost:'',
      smtpPort:0,
      smtpUserName:'',
      smtpPassword:'',
      createdOn: new Date(),
      modifiedDate: new Date(),
      isGroupEnabled:false,
      amountPerBorrowerGroup:0,
      cibilBest:0,
      gCibilGood:0,
      investmentLimit:0,
     escroBalance:0,
     balanceThreshold:0
    });

  	
	}

  LoadSettings()
  {
    this.p2pService.GetSettings().subscribe({
      next:(res)=> {         
        this.settings=[];
this.settings = res;
this.userForm.patchValue({
  settingsId: this.settings[0].settingsId,
  isEnabled: this.settings[0].isEnabled,
  limitPerDay: this.settings[0].limitPerDay,
  investAmt: this.settings[0].investAmt,
  minInvestAmt: this.settings[0].minInvestAmt,
  tPin: this.settings[0].tPin,
  investAmtA:this.settings[0].investAmtA,
  investAmtB:this.settings[0].investAmtB,
  investAmtC:this.settings[0].investAmtC,
  investAmtD:this.settings[0].investAmtD,
  investAmtE:this.settings[0].investAmtE,
  investAmtX:this.settings[0].investAmtX,
  cibilPoor: this.settings[0].cibilPoor,
  cibilAverage: this.settings[0].cibilAverage,
  cibilGood: this.settings[0].cibilGood,
  cibilExcellent: this.settings[0].cibilExcellent,
  smtpFromUser: this.settings[0].smtpFromUser,
  smtpFromEmailAddress: this.settings[0].smtpFromEmailAddress,
  smtpHost:this.settings[0].smtpHost,
  smtpPort:this.settings[0].smtpPort,
  smtpUserName:this.settings[0].smtpUserName,
  smtpPassword:this.settings[0].smtpPassword, 
  createdOn: this.settings[0].createdOn,
  modifiedDate: this.settings[0].modifiedDate,
  isGroupEnabled:this.settings[0].isGroupEnabled,
  amountPerBorrowerGroup:this.settings[0].amountPerBorrowerGroup,
  cibilBest:this.settings[0].cibilBest,
  gCibilGood:this.settings[0].gCibilGood,
  investmentLimit:this.settings[0].investmentLimit,
     escroBalance:this.settings[0].escroBalance,
     balanceThreshold:this.settings[0].balanceThreshold
});

      },
      error:(err)=>{ Swal.fire('Something went wrong!');}
    });	
  }
  ngAfterViewInit()
  {   
    this.LoadSettings();
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
   get investAmtA() {
		return this.userForm.get('investAmtA');
	}  
  get investAmtB() {
		return this.userForm.get('investAmtB');
	}  
  get investAmtC() {
		return this.userForm.get('investAmtC');
	}  
  get investAmtD() {
		return this.userForm.get('investAmtD');
	}  
  get investAmtE() {
		return this.userForm.get('investAmtE');
	} 
  get investAmtX() {
		return this.userForm.get('investAmtX');
	}  
  get cibilPoor() {
		return this.userForm.get('cibilPoor');
	}
  get cibilAverage() {
		return this.userForm.get('cibilAverage');
	}
  get cibilGood() {
		return this.userForm.get('cibilGood');
	}
  get cibilExcellent() {
		return this.userForm.get('cibilExcellent');
	}
  get smtpFromUser() {
		return this.userForm.get('smtpFromUser');
	}
  get smtpFromEmailAddress() {
		return this.userForm.get('smtpFromEmailAddress');
	}
  get smtpHost() {
		return this.userForm.get('smtpHost');
	}
  get smtpPort() {
		return this.userForm.get('smtpPort');
	}
  get smtpUserName() {
		return this.userForm.get('smtpUserName');
	}
  get smtpPassword() {
		return this.userForm.get('smtpPassword');
	}

  
  get isGroupEnabled() {
		return this.userForm.get('isGroupEnabled');
	}


get amountPerBorrowerGroup() {
  return this.userForm.get('amountPerBorrowerGroup');
}


get cibilBest() {
  return this.userForm.get('cibilBest');
}


get gCibilGood() {
  return this.userForm.get('gCibilGood');
}

get investmentLimit() {
  return this.userForm.get('investmentLimit');
}

get escroBalance() {
  return this.userForm.get('escroBalance');
}

get balanceThreshold() {
  return this.userForm.get('gCibilGood');
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
    model.tPin = this.userForm.get('tPin')?.value;  
    model.investAmt = this.userForm.get('investAmt')?.value;
    model.minInvestAmt = this.userForm.get('minInvestAmt')?.value;        
    model.investAmtA = this.userForm.get('investAmtA')?.value;    
    model.investAmtB = this.userForm.get('investAmtB')?.value;    
    model.investAmtC = this.userForm.get('investAmtC')?.value;    
    model.investAmtD = this.userForm.get('investAmtD')?.value;    
    model.investAmtE = this.userForm.get('investAmtE')?.value; 
    model.investAmtX = this.userForm.get('investAmtX')?.value;
    model.cibilPoor = this.userForm.get('cibilPoor')?.value;
    model.cibilAverage = this.userForm.get('cibilAverage')?.value;
    model.cibilGood = this.userForm.get('cibilGood')?.value;
    model.cibilExcellent = this.userForm.get('cibilExcellent')?.value;
    model.smtpFromUser = this.userForm.get('smtpFromUser')?.value;
    model.smtpFromEmailAddress = this.userForm.get('smtpFromEmailAddress')?.value;
    model.smtpHost = this.userForm.get('smtpHost')?.value;
    model.smtpPort = this.userForm.get('smtpPort')?.value;
    model.smtpUserName = this.userForm.get('smtpUserName')?.value;
    model.smtpPassword = this.userForm.get('smtpPassword')?.value;
    model.createdOn = this.userForm.get('createdOn')?.value;
    model.modifiedDate = this.userForm.get('modifiedDate')?.value;    
    model.isGroupEnabled = this.userForm.get('isGroupEnabled')?.value;
    model.amountPerBorrowerGroup = this.userForm.get('amountPerBorrowerGroup')?.value;
    model.cibilBest = this.userForm.get('cibilBest')?.value;
    model.gCibilGood = this.userForm.get('gCibilGood')?.value;
    model.investmentLimit = this.userForm.get('investmentLimit')?.value;
    model.escroBalance = this.userForm.get('escroBalance')?.value;
    model.balanceThreshold = this.userForm.get('balanceThreshold')?.value; 

    this.p2pService.SaveSettings(model.settingsId,model).subscribe({
      next:(res)=>{
        this.settings = res;
this.userForm.patchValue({
  settingsId: this.settings[0].settingsId,
  isEnabled: this.settings[0].isEnabled,
  limitPerDay: this.settings[0].limitPerDay,
  investAmt: this.settings[0].investAmt,
  minInvestAmt: this.settings[0].minInvestAmt,
  tPin: this.settings[0].tPin,
  investAmtA:this.settings[0].investAmtA,
  investAmtB:this.settings[0].investAmtB,
  investAmtC:this.settings[0].investAmtC,
  investAmtD:this.settings[0].investAmtD,
  investAmtE:this.settings[0].investAmtE,
  investAmtX:this.settings[0].investAmtX,
  cibilPoor: this.settings[0].cibilPoor,
  cibilAverage: this.settings[0].cibilAverage,
  cibilGood: this.settings[0].cibilGood,
  cibilExcellent: this.settings[0].cibilExcellent,
  smtpFromUser: this.settings[0].smtpFromUser,
  smtpFromEmailAddress: this.settings[0].smtpFromEmailAddress,
  smtpHost: this.settings[0].smtpHost,
  smtpPort: this.settings[0].smtpPort,
  smtpUserName: this.settings[0].smtpUserName,
  smtpPassword: this.settings[0].smtpPassword,
  createdOn: this.settings[0].createdOn,
  modifiedDate: this.settings[0].modifiedDate,
  isGroupEnabled: this.settings[0].isGroupEnabled,
  amountPerBorrowerGroup: this.settings[0].amountPerBorrowerGroup,
  cibilBest: this.settings[0].cibilBest,
  gCibilGood: this.settings[0].gCibilGood,
  investmentLimit:this.settings[0].investmentLimit,
  escroBalance:this.settings[0].escroBalance,
  balanceThreshold:this.settings[0].balanceThreshold 
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
      tPin: this.settings[0].tPin,
      investAmtA:this.settings[0].investAmtA,
      investAmtB:this.settings[0].investAmtB,
      investAmtC:this.settings[0].investAmtC,
      investAmtD:this.settings[0].investAmtD,
      investAmtE:this.settings[0].investAmtE,
      investAmtX:this.settings[0].investAmtX,
      cibilPoor: this.settings[0].cibilPoor,
      cibilAverage: this.settings[0].cibilAverage,
      cibilGood: this.settings[0].cibilGood,
      cibilExcellent: this.settings[0].cibilExcellent,
      smtpFromUser: this.settings[0].smtpFromUser,
      smtpFromEmailAddress: this.settings[0].smtpFromEmailAddress,
      smtpHost: this.settings[0].smtpHost,
      smtpPort: this.settings[0].smtpPort,
      smtpUserName: this.settings[0].smtpUserName,
      smtpPassword: this.settings[0].smtpPassword, 
      isGroupEnabled: this.settings[0].isGroupEnabled, 
      amountPerBorrowerGroup: this.settings[0].amountPerBorrowerGroup, 
      cibilBest: this.settings[0].cibilBest, 
      gCibilGood: this.settings[0].gCibilGood, 
      investmentLimit:this.settings[0].investmentLimit,
      escroBalance:this.settings[0].escroBalance,
      balanceThreshold:this.settings[0].balanceThreshold
    });
	}

	patchUserValues() {
    this.userForm.patchValue({      
      isEnabled: true,
      limitPerDay: 5,
      investAmt: 1000,
      minInvestAmt: 1000,      
      tPin: '2898',
      investAmtA:1000,
      investAmtB:1000,
      investAmtC:1000,
      investAmtD:1000,
      investAmtE:1000,
      investAmtX:1000,
      cibilPoor:300,
      cibilAverage:500,
      cibilGood:650,
      cibilExcellent:750,
      smtpFromUser:'i2i Live',
      smtpFromEmailAddress:'noreply@aznet.in',
      smtpHost:'smtppro.zoho.in',
      smtpPort:587,
      smtpUserName:'noreply@aznet.in',
      smtpPassword:'t@x$!m%uC2EFZxg',
      isGroupEnabled:true,
      amountPerBorrowerGroup:500,
      gCibilGood:650,
      cibilBest:750,
      investmentLimit:10000,
      escroBalance:10000,
      balanceThreshold:10000		
    });
	}


  LoadBorrowers()
  {    
    this.p2pService.GetActiveBorrowers().subscribe({
      next:(event)=>{
        this.borrowers = [];        
        this.borrowers = event;        
      },
      error:(err)=>{
        Swal.fire('Something went wrong. Please try again after sometime.');   
        console.log(err);
      }
    });    
  }

ForceInvest(w:ManageBorrowers)
{
  var confirmMessage =  'Loan:'+w.loan+' '+w.risk+' '+w.cibil+' '+w.interest+'%'+' '+(w.tenure+' '+(w.tenureType=='d'?'D':'M'));
  Swal.fire({
    title: 'Are you sure?',
    text: 'Force Invest '+ confirmMessage,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think',
  }).then((result) => {
    if (result.value) {      
      this.p2pService.DeleteBorrower(w.keyId,w.risk=='LendenClub'?'LC-M':(w.isGroup?'I2I-G':'I2I-M')).subscribe({
        next:(event)=>{
          this.borrowers = event;
            Swal.fire('Force Invested', confirmMessage,'success');                        
        },
        error:(err)=>{console.log(err);
          Swal.fire('Cancelled','Something went wrong. Please try again.', 'error');
        }
      });
      
    } 
  });

}

} 

  
