import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timer } from 'rxjs/internal/observable/timer';
import { EmailAccount } from 'src/app/models/email-account.model';
import { LendenLoan } from 'src/app/models/lenden-loans.model';
import { LendenClubTransactionSummary } from 'src/app/models/lendenclub-account-statement.model';
import { ManageBorrowers } from 'src/app/models/manage-borrowers.model';
import { MaturityData } from 'src/app/models/maturity-data.model';
import { P2PModel } from 'src/app/models/p2-pmodel.model';
import { P2PAccount } from 'src/app/models/p2p-account.model';
import { Withdrawals } from 'src/app/models/withdrawals.model';
import { P2pService } from 'src/app/services/p2p.service';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-p2p8678',
  templateUrl: './p2p8678.component.html',
  styleUrls: ['./p2p8678.component.css']
})
export class P2p8678Component implements OnInit {

  ClearWithdrawDepositTotals()
  {
    this.allFDeposit=0;
    this.allFWithdraw=0;
    this.allFPending=0;
    this.i2iFDeposit=0;
    this.i2iFWithdraw=0;
    this.i2iFPending=0;
    this.lcFDeposit=0;
    this.lcFWithdraw=0;
    this.lcFPending=0;
  }
  i2iWithdrawPending:number=0;
  allFDeposit:number=0;
  allFWithdraw:number=0;
  allFPending:number=0;
  i2iFDeposit:number=0;
  i2iFWithdraw:number=0;
  i2iFPending:number=0;
  lcFDeposit:number=0;
  lcFWithdraw:number=0;
  lcFPending:number=0;
	isValidFormSubmitted!:boolean;
	userForm!: FormGroup;
  settings!:P2PModel[];
  borrowers!:ManageBorrowers[];
	i2IProfitLoss!:boolean;
  isI2IDiffAmount!:boolean;
  isEligibleOnly:boolean=true;
  isI2iOnly!:boolean;
  isLCOnly!:boolean;
  isFundedOnly!:boolean;
  isNotFundedOnly!:boolean;
  selectedCount:number=0;
  lendenLoansOriginal!:LendenLoan[];
  lendenLoansFiltered!:LendenLoan[];
  hiddenLC:boolean=false;
  hiddenSettings:boolean=false;
  emailAccounts!:EmailAccount[];
  lcInvested:number=0;
  lcReceived:number=0;
  lcPending:number=0;
  showPwd:boolean=false;
  maturityDetails!:MaturityData[];
  hiddenMaturity:boolean=false;
  hiddenWithdrawals:boolean=false;
  hiddenEmail:boolean=false;
  hiddenBorrowers:boolean=false;
  spinner:boolean=false;
  lcRecoveryPending:number=0;


  showHideMaturity()
  {
    this.hiddenMaturity = !this.hiddenMaturity;
  }
showHideWithdrawals()
{
  this.hiddenWithdrawals = !this.hiddenWithdrawals;
}
showHideEmail()
{
  this.hiddenEmail = !this.hiddenEmail;
}
showHideBorrowers()
{
  this.hiddenBorrowers = !this.hiddenBorrowers;  
}

  LoadMaturityDetails()
  {
    this.p2pService.GetMaturityData().subscribe({
      next:(val)=>{
        this.maturityDetails = val;
      },
      error:(err)=>{Swal.fire('Maturity Data Load Fail.')}
    })
  }
  
  showHidePass()
  {
    this.showPwd = !this.showPwd;
  }
  showHideSettings()
  {
    this.hiddenSettings = !this.hiddenSettings;
  }
  showHideLC()
  {
    this.hiddenLC = !this.hiddenLC;
  }
  constructor(private p2pService:P2pService,private formBuilder: FormBuilder) { }

  ActivateEmail(id:number)
  {
    this.p2pService.UpdateEmailAccount(id).subscribe({
      next:(val)=>{
        Swal.fire('Email Account Activated');
        this.LoadEmailAccounts();
      },
      error:(err)=>{
        Swal.fire('Something went wrong!')
      }
    })
  }

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
     balanceThreshold:0,
     groupLoanI2IFundingEnabled:false,
     memberLoanI2IFundingEnabled:false,	
     memberLoanLendenClubEnabled:false,	
     withdrawaI2IFundingEnabled:false,	
     withdrawaLendenClubEnabled:false,	
     i2IWithdrawAmt:0,	
     lcWithdrawAmt:0,	
     lendenEscroBalance:0,
     i2IPrincipalBalance:0,
     i2ITotalInvested:0,
     i2ITotalWithdrawn:0,
     i2IMyInvestmentBalance:0,
     i2IDiffAmount:0,
     i2IAmtProposal:0,
     i2IAmtDisburse:0,
     i2ICurrentAccValue:0,
     i2IProfitOrLoss:0,
     enableLCAlerts:false,
     lcPortfolioValue:0,
     lcNetReturns:0,
     lcroi:0,
     lcTotalInvested:0,
     lcHighCreditOnly: false,
     lcShortPeriodOnly: false,
     isLCAIEnabled:false,
     lcTotalReceived:0,
     rbiP2PInvestLimit:0,
     lcWithdrawEnable:false,
     lendBoxMemberLoanEnabled:false,
     enableLBAlerts:false,
     isLBAIEnabled:false
    });
  }
sumamounts(val:LendenLoan)
{
  this.lcInvested+=val.total_investment??0;
          this.lcReceived+=val.amount_received;
          this.lcPending+=(val.total_investment??0)-val.amount_received;
}

LoadEmailAccounts()
{
  this.p2pService.GetEmailAccounts().subscribe({
    next:(val)=>{
      this.emailAccounts = val;
    },
    error:(err)=>{Swal.fire('Load Email Account Fail');}
  });
}
p2pAddWithdrawMoney!:P2PAccount[];
unusedLCAmount:number=0;
repaidToLC:number=0;
repaidToLCBank:number=0;
LoadP2PAccountAddWithdrawDetails()
{
  this.p2pService.GetP2PAddWithdrawStatement().subscribe({
    next:(val)=>{
      this.ClearWithdrawDepositTotals();
      for(var i=0;i<val.length;i++)
      {
      this.allFDeposit+=val[i].transactType=='DEPOSIT'&&(val[i].status=='Completed'||val[i].status=='SUCCESS')?val[i].amount:0;        
      this.allFWithdraw+=val[i].transactType=='WITHDRAW'&&(val[i].status=='Completed'||val[i].status=='SUCCESS')?val[i].amount:0;
      
      this.i2iFDeposit+=val[i].p2PName=='I2I'&&val[i].transactType=='DEPOSIT'&&val[i].status=='Completed'?val[i].amount:0;
      this.i2iFWithdraw+=val[i].p2PName=='I2I'&&val[i].transactType=='WITHDRAW'&&val[i].status=='Completed'?val[i].amount:0;
     
      this.lcFDeposit+=val[i].p2PName=='LC'&&val[i].transactType=='DEPOSIT'&&val[i].status=='SUCCESS'?val[i].amount:0;
      this.lcFWithdraw+=val[i].p2PName=='LC'&&val[i].transactType=='WITHDRAW'&&val[i].status=='SUCCESS'?val[i].amount:0;
      
      this.repaidToLC+=val[i].repaidToAccount=='LC'&&val[i].p2PName=='LC'&&val[i].transactType=='WITHDRAW'&&val[i].status=='SUCCESS'?val[i].amount:0;
      this.repaidToLCBank+=val[i].repaidToAccount=='Bank'&&val[i].p2PName=='LC'&&val[i].transactType=='WITHDRAW'&&val[i].status=='SUCCESS'?val[i].amount:0;
     
      this.lcWithdrawPending += (val[i].p2PName=='LC'&&val[i].transactType=='WITHDRAW'&&(val[i].status=='SCHEDULED' || val[i].status=='PROCESSING'))?val[i].amount:0;     
     this.i2iWithdrawPending += (val[i].p2PName=='I2I'&&val[i].transactType=='WITHDRAW'&&val[i].status=='Pending')?val[i].amount:0;
    }

      this.lcFWithdraw+=this.lcWithdrawPending;  
      this.repaidToLC+=this.lcWithdrawPending;
      
      this.allFPending = this.allFDeposit-this.allFWithdraw;
      this.i2iFPending = this.i2iFDeposit-this.i2iFWithdraw;
      this.lcFPending = this.lcFDeposit-this.lcFWithdraw;
      
      this.p2pAddWithdrawMoney = val;
    },
    error:(err)=>{Swal.fire('Load Email Account Fail');}
  });
}
  LoadLendenLoans()
  {
    this.spinner=true;
    this.lcInvested=0;
    this.lcReceived=0;
    this.lcPending=0;
    this.successCnt=0
    this.failCnt=0;
    this.closedCnt=0;
    this.lossCnt=0;
    this.profitCnt=0;
    this.lendenLoansOriginal=[];
    this.lendenLoansFiltered=[];
    this.p2pService.GetLendenLoans().subscribe({
      next:(val)=>{
        this.lendenLoansOriginal=val;       
        this.lendenLoansFiltered=this.lendenLoansOriginal.filter((val,inde,arr)=>{
          if(val.total_investment==null&&val.loan_id==null)
           return true;
          this.sumamounts(val);
          if(val.isSuccess)
          this.successCnt++;
          if(!val.isSuccess)
          this.failCnt++;
          if(val.is_closed)
          this.closedCnt++;
          if(val.isProfit!=null&&!val.isProfit)
          this.lossCnt++;
          if(val.isProfit!=null&&val.isProfit)
          this.profitCnt++;
         return true;
       });      
      },
      error:(err)=>{
        this.spinner=false;
        Swal.fire('Something went wrong.')
      },
      complete:()=>{
        this.spinner=false;
        this.play=true;
        this.observableTimer();
      }
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
     balanceThreshold:this.settings[0].balanceThreshold,
     groupLoanI2IFundingEnabled:this.settings[0].groupLoanI2IFundingEnabled,
     memberLoanI2IFundingEnabled:this.settings[0].memberLoanI2IFundingEnabled,	
     memberLoanLendenClubEnabled:this.settings[0].memberLoanLendenClubEnabled,	
     withdrawaI2IFundingEnabled:this.settings[0].withdrawaI2IFundingEnabled,	
     withdrawaLendenClubEnabled:this.settings[0].withdrawaLendenClubEnabled,	
     i2IWithdrawAmt:this.settings[0].i2IWithdrawAmt,	
     lcWithdrawAmt:this.settings[0].lcWithdrawAmt,	
     lendenEscroBalance:this.settings[0].lendenEscroBalance,
     i2IPrincipalBalance:this.settings[0].i2IPrincipalBalance,
     i2ITotalInvested:this.settings[0].i2ITotalInvested,
     i2ITotalWithdrawn:this.settings[0].i2ITotalWithdrawn,
     i2IMyInvestmentBalance:this.settings[0].i2IMyInvestmentBalance,
     i2IDiffAmount:this.settings[0].i2IDiffAmount,
     i2IAmtProposal:this.settings[0].i2IAmtProposal,
     i2IAmtDisburse:this.settings[0].i2IAmtDisburse,
     i2ICurrentAccValue:this.settings[0].i2ICurrentAccValue,
     i2IProfitOrLoss:this.settings[0].i2IProfitOrLoss,

     enableLCAlerts:this.settings[0].enableLCAlerts,
     lcPortfolioValue:this.settings[0].lcPortfolioValue,
     lcNetReturns:this.settings[0].lcNetReturns,
     lcroi:this.settings[0].lcroi,
     lcTotalInvested:this.settings[0].lcTotalInvested,

     lcHighCreditOnly:this.settings[0].lcHighCreditOnly,
     lcShortPeriodOnly:this.settings[0].lcShortPeriodOnly,

     isLCAIEnabled:this.settings[0].isLCAIEnabled,
     lcTotalReceived:this.settings[0].lcTotalReceived,
     rbiP2PInvestLimit:this.settings[0].rbiP2PInvestLimit,
     lcWithdrawEnable:this.settings[0].lcWithdrawEnable,

     lendBoxMemberLoanEnabled:this.settings[0].lendBoxMemberLoanEnabled,
     enableLBAlerts:this.settings[0].enableLBAlerts,
     isLBAIEnabled:this.settings[0].isLBAIEnabled,
});

this.i2IProfitLoss=this.settings[0].i2IProfitOrLoss>0;
this.isI2IDiffAmount = this.settings[0].i2IDiffAmount==0;

      },
      error:(err)=>{ Swal.fire('Something went wrong!');}
    });	
  }

  ngAfterViewInit()
  {  
    this.LoadSettings();
    this.LoadI2IWithdrawAmt();
    this.LoadBorrowers();  
    this.LoadLendenLoans();
    this.LoadEmailAccounts();
    this.LoadMaturityDetails();
    this.LoadP2PAccountAddWithdrawDetails();
    this.LoadLendenTransactionStatement();
   
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
  return this.userForm.get('balanceThreshold');
}
get groupLoanI2IFundingEnabled()
{
  return this.userForm.get('groupLoanI2IFundingEnabled');
}
get memberLoanI2IFundingEnabled()
{
  return this.userForm.get('memberLoanI2IFundingEnabled');
}	
get memberLoanLendenClubEnabled()
{
  return this.userForm.get('memberLoanLendenClubEnabled');
}
get withdrawaI2IFundingEnabled()
{
  return this.userForm.get('withdrawaI2IFundingEnabled');
}	
get withdrawaLendenClubEnabled()
{
  return this.userForm.get('withdrawaLendenClubEnabled');
}	
get i2IWithdrawAmt()
{
  return this.userForm.get('i2IWithdrawAmt');
}
get lcWithdrawAmt()
{
  return this.userForm.get('lcWithdrawAmt');
}	
get lendenEscroBalance()
{
  return this.userForm.get('lendenEscroBalance');
}
get i2IPrincipalBalance()
{
  return this.userForm.get('i2IPrincipalBalance');
}
get i2ITotalInvested()
{
  return this.userForm.get('i2ITotalInvested');
}
get i2ITotalWithdrawn()
{
  return this.userForm.get('i2ITotalWithdrawn');
}
get i2IMyInvestmentBalance()
{
  return this.userForm.get('i2IMyInvestmentBalance');
}
get i2IDiffAmount()
{
  return this.userForm.get('i2IDiffAmount');
}
get i2IAmtProposal()
{
  return this.userForm.get('i2IAmtProposal');
}
get i2IAmtDisburse()
{
  return this.userForm.get('i2IAmtDisburse');
}
get i2ICurrentAccValue()
{
  return this.userForm.get('i2ICurrentAccValue');
}
get i2IProfitOrLoss()
{
  return this.userForm.get('i2IProfitOrLoss');
}
get enableLCAlerts()
{
  return this.userForm.get('enableLCAlerts');
}
get lcPortfolioValue()
{
  return this.userForm.get('lcPortfolioValue');
}
get lcNetReturns()
{
  return this.userForm.get('lcNetReturns');
}
get lcroi()
{
  return this.userForm.get('lcroi');
}
get lcTotalInvested()
{
  return this.userForm.get('lcTotalInvested');
}
get lcHighCreditOnly()
{
  return this.userForm.get('lcHighCreditOnly');
}
get lcShortPeriodOnly()
{
  return this.userForm.get('lcShortPeriodOnly');
}
get isLCAIEnabled()
{
  return this.userForm.get('isLCAIEnabled');
}
get lcTotalReceived()
{
  return this.userForm.get('lcTotalReceived');
}
get rbiP2PInvestLimit()
{
  return this.userForm.get('rbiP2PInvestLimit');
}
get lcWithdrawEnable()
{
  return this.userForm.get('lcWithdrawEnable');
}
get lendBoxMemberLoanEnabled()
{
  return this.userForm.get('lendBoxMemberLoanEnabled');
}

get enableLBAlerts()
{
  return this.userForm.get('enableLBAlerts');
}

get isLBAIEnabled()
{
  return this.userForm.get('isLBAIEnabled');
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
    model.groupLoanI2IFundingEnabled = this.userForm.get('groupLoanI2IFundingEnabled')?.value;
    model.memberLoanI2IFundingEnabled = this.userForm.get('memberLoanI2IFundingEnabled')?.value;
    model.memberLoanLendenClubEnabled = this.userForm.get('memberLoanLendenClubEnabled')?.value;	
    model.withdrawaI2IFundingEnabled = this.userForm.get('withdrawaI2IFundingEnabled')?.value;	
    model.withdrawaLendenClubEnabled = this.userForm.get('withdrawaLendenClubEnabled')?.value;
    model.i2IWithdrawAmt = this.userForm.get('i2IWithdrawAmt')?.value;
    model.lcWithdrawAmt = this.userForm.get('lcWithdrawAmt')?.value;
    model.lendenEscroBalance = this.userForm.get('lendenEscroBalance')?.value;
    model.i2IPrincipalBalance = this.userForm.get('i2IPrincipalBalance')?.value;
    model.i2ITotalInvested = this.userForm.get('i2ITotalInvested')?.value;
    model.i2ITotalWithdrawn = this.userForm.get('i2ITotalWithdrawn')?.value;
    model.i2IMyInvestmentBalance = this.userForm.get('i2IMyInvestmentBalance')?.value;
    model.i2IDiffAmount = this.userForm.get('i2IDiffAmount')?.value;
    model.i2IAmtProposal = this.userForm.get('i2IAmtProposal')?.value;
    model.i2IAmtDisburse = this.userForm.get('i2IAmtDisburse')?.value;
    model.i2ICurrentAccValue = this.userForm.get('i2ICurrentAccValue')?.value;
    model.i2IProfitOrLoss = this.userForm.get('i2IProfitOrLoss')?.value;
    model.enableLCAlerts = this.userForm.get('enableLCAlerts')?.value;
    model.lcPortfolioValue = this.userForm.get('lcPortfolioValue')?.value;
    model.lcNetReturns = this.userForm.get('lcNetReturns')?.value;
    model.lcroi = this.userForm.get('lcroi')?.value;
    model.lcTotalInvested = this.userForm.get('lcTotalInvested')?.value;

    model.lcHighCreditOnly= this.userForm.get('lcHighCreditOnly')?.value;
    model.lcShortPeriodOnly= this.userForm.get('lcShortPeriodOnly')?.value;
   
    model.isLCAIEnabled = this.userForm.get('isLCAIEnabled')?.value;
    model.lcTotalReceived = this.userForm.get('lcTotalReceived')?.value;
    model.rbiP2PInvestLimit = this.userForm.get('rbiP2PInvestLimit')?.value;
    model.lcWithdrawEnable = this.userForm.get('lcWithdrawEnable')?.value;

    model.lendBoxMemberLoanEnabled= this.userForm.get('lendBoxMemberLoanEnabled')?.value;
    model.enableLBAlerts= this.userForm.get('enableLBAlerts')?.value;
    model.isLBAIEnabled= this.userForm.get('isLBAIEnabled')?.value;

    this.p2pService.SaveSettings(model.settingsId,model).subscribe({
      next:(res)=>{
        debugger;
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
  balanceThreshold:this.settings[0].balanceThreshold,
  groupLoanI2IFundingEnabled:this.settings[0].groupLoanI2IFundingEnabled,
  memberLoanI2IFundingEnabled:this.settings[0].memberLoanI2IFundingEnabled,	
  memberLoanLendenClubEnabled:this.settings[0].memberLoanLendenClubEnabled,	
  withdrawaI2IFundingEnabled:this.settings[0].withdrawaI2IFundingEnabled,	
  withdrawaLendenClubEnabled:this.settings[0].withdrawaLendenClubEnabled,	
  i2IWithdrawAmt:this.settings[0].i2IWithdrawAmt,	
  lcWithdrawAmt:this.settings[0].lcWithdrawAmt,	
  lendenEscroBalance:this.settings[0].lendenEscroBalance,
  i2IPrincipalBalance:this.settings[0].i2IPrincipalBalance,
  i2ITotalInvested:this.settings[0].i2ITotalInvested,
  i2ITotalWithdrawn:this.settings[0].i2ITotalWithdrawn,
  i2IMyInvestmentBalance:this.settings[0].i2IMyInvestmentBalance,
  i2IDiffAmount:this.settings[0].i2IDiffAmount,
  i2IAmtProposal:this.settings[0].i2IAmtProposal,
  i2IAmtDisburse:this.settings[0].i2IAmtDisburse,
   i2ICurrentAccValue:this.settings[0].i2ICurrentAccValue,
     i2IProfitOrLoss:this.settings[0].i2IProfitOrLoss,
     enableLCAlerts:this.settings[0].enableLCAlerts,
     lcPortfolioValue:this.settings[0].lcPortfolioValue,
     lcNetReturns:this.settings[0].lcNetReturns,
     lcroi:this.settings[0].lcroi,
     lcTotalInvested:this.settings[0].lcTotalInvested,
     lcHighCreditOnly:this.settings[0].lcHighCreditOnly,
     lcShortPeriodOnly:this.settings[0].lcShortPeriodOnly,
     isLCAIEnabled:this.settings[0].isLCAIEnabled,
     lcTotalReceived:this.settings[0].lcTotalReceived,
     rbiP2PInvestLimit:this.settings[0].rbiP2PInvestLimit,
     lcWithdrawEnable:this.settings[0].lcWithdrawEnable,
     lendBoxMemberLoanEnabled:this.settings[0].lendBoxMemberLoanEnabled,
     enableLBAlerts:this.settings[0].enableLBAlerts,
     isLBAIEnabled:this.settings[0].isLBAIEnabled,
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
      balanceThreshold:this.settings[0].balanceThreshold,
      groupLoanI2IFundingEnabled:this.settings[0].groupLoanI2IFundingEnabled,
      memberLoanI2IFundingEnabled:this.settings[0].memberLoanI2IFundingEnabled,	
      memberLoanLendenClubEnabled:this.settings[0].memberLoanLendenClubEnabled,	
      withdrawaI2IFundingEnabled:this.settings[0].withdrawaI2IFundingEnabled,	
      withdrawaLendenClubEnabled:this.settings[0].withdrawaLendenClubEnabled,	
      i2IWithdrawAmt:this.settings[0].i2IWithdrawAmt,	
      lcWithdrawAmt:this.settings[0].lcWithdrawAmt,	
      lendenEscroBalance:this.settings[0].lendenEscroBalance,
      i2IPrincipalBalance:this.settings[0].i2IPrincipalBalance,
      i2ITotalInvested:this.settings[0].i2ITotalInvested,
      i2ITotalWithdrawn:this.settings[0].i2ITotalWithdrawn,
      i2IMyInvestmentBalance:this.settings[0].i2IMyInvestmentBalance,
      i2IDiffAmount:this.settings[0].i2IDiffAmount,
      i2IAmtProposal:this.settings[0].i2IAmtProposal,
      i2IAmtDisburse:this.settings[0].i2IAmtDisburse,
       i2ICurrentAccValue:this.settings[0].i2ICurrentAccValue,
     i2IProfitOrLoss:this.settings[0].i2IProfitOrLoss,
     enableLCAlerts:this.settings[0].enableLCAlerts,
     lcPortfolioValue:this.settings[0].lcPortfolioValue,
     lcNetReturns:this.settings[0].lcNetReturns,
     lcroi:this.settings[0].lcroi,
     lcTotalInvested:this.settings[0].lcTotalInvested,
     lcHighCreditOnly:this.settings[0].lcHighCreditOnly,
     lcShortPeriodOnly:this.settings[0].lcShortPeriodOnly,
     isLCAIEnabled:this.settings[0].isLCAIEnabled,
     lcTotalReceived:this.settings[0].lcTotalReceived,
     rbiP2PInvestLimit:this.settings[0].rbiP2PInvestLimit,
     lcWithdrawEnable:this.settings[0].lcWithdrawEnable,
     lendBoxMemberLoanEnabled:this.settings[0].lendBoxMemberLoanEnabled,
     enableLBAlerts:this.settings[0].enableLBAlerts,
     isLBAIEnabled:this.settings[0].isLBAIEnabled,
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
      balanceThreshold:10000,
      groupLoanI2IFundingEnabled:true,
      memberLoanI2IFundingEnabled:true,	
      memberLoanLendenClubEnabled:true,	
      withdrawaI2IFundingEnabled:true,	
      withdrawaLendenClubEnabled:true,	
      i2IWithdrawAmt:10000,	
      lcWithdrawAmt:10000,	
      lendenEscroBalance:0,
      i2IPrincipalBalance:0,
      i2ITotalInvested:0,
      i2ITotalWithdrawn:0,
      i2IMyInvestmentBalance:0,
      i2IDiffAmount:0,
      i2IAmtProposal:0,
      i2IAmtDisburse:0,
       i2ICurrentAccValue:0,
     i2IProfitOrLoss:0,
     enableLCAlerts:false,
     lcPortfolioValue:0,
     lcNetReturns:0,
     lcroi:0,
     lcTotalInvested:0,
     lcHighCreditOnly:false,
     lcShortPeriodOnly:false,
     isLCAIEnabled:false,
     lcTotalReceived:0,
     rbiP2PInvestLimit:0,
     lcWithdrawEnable:false,
     lendBoxMemberLoanEnabled:false,
     enableLBAlerts:false,
     isLBAIEnabled:false
    });
	}

withdras!:Withdrawals[];

GetI2IAccStatement()
{
  this.p2pService.GetI2IAccStatement().subscribe({
    next:(event)=>{
      this.LoadSettings();                           
    },
    error:(err)=>{console.log(err);
      Swal.fire('Cancelled','Something went wrong. Please try again.', 'error');
    }
  });  
}
LoadI2IWithdrawAmt()
{
  this.p2pService.I2IWithdrawAmtGet().subscribe({
    next:(event)=>{
       this.withdras = event;                          
    },
    error:(err)=>{console.log(err);
      Swal.fire('Cancelled','Something went wrong. Please try again.', 'error');
    }
  });
}

RequestLCWithdrawAmt(amt:number)
{
  this.RequestWithdraw(-2,amt);
}
  RequestI2IWithdrawAmt(amt:number)
  {
  this.RequestWithdraw(-1,amt);       
  }

  RequestWithdraw(id:number,amt:number)
  {
    var confirmMessage =  `Withdraw amount Rs.${amt}`;
    Swal.fire({
      title: 'Are you sure?',
      text: confirmMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {      
        this.p2pService.I2IWithdrawAmtPut(id).subscribe({
          next:(event)=>{
             this.LoadI2IWithdrawAmt();
              Swal.fire('Withdraw Requested', confirmMessage,'success');                        
          },
          error:(err)=>{console.log(err);
            Swal.fire('Cancelled','Something went wrong. Please try again.', 'error');
          }
        });
        
      } 
    });
  }
  LoadBorrowers()
  {    
    this.p2pService.GetActiveBorrowers().subscribe({
      next:(event)=>{
        this.borrowers = []; 

        if(this.isEligibleOnly && this.isI2iOnly)
        {
          this.borrowers = event.filter((val,index)=>{

            let q =  val.isEligible && val.risk.startsWith('I2I-');

            if(this.isFundedOnly)
            return q && val.statusMsg.indexOf('success')!=-1;
            else if(this.isNotFundedOnly)
            return q && val.statusMsg.indexOf('success')==-1;
            else
            return q;

          });            
        }
        else if(this.isI2iOnly)
        {
          this.borrowers = event.filter((val,index)=>{
            let q = val.risk.startsWith('I2I-');
            if(this.isFundedOnly)
            return q && val.statusMsg.indexOf('success')!=-1;
            else if(this.isNotFundedOnly)
            return q && val.statusMsg.indexOf('success')==-1;
            else
            return q;
          });        
        }
        else if(this.isEligibleOnly && this.isLCOnly)
        {
          this.borrowers = event.filter((val,index)=>{
            let q = val.isEligible && val.risk.startsWith('LC-');
            if(this.isFundedOnly)
            return q && val.statusMsg.indexOf('success')!=-1;
            else if(this.isNotFundedOnly)
            return q && val.statusMsg.indexOf('success')==-1;
            else
            return q;
          });        
        }   
        else if(this.isLCOnly)
        {
          this.borrowers = event.filter((val,index)=>{
            let q = val.risk.startsWith('LC-');
            if(this.isFundedOnly)
            return q && val.statusMsg.indexOf('success')!=-1;
            else if(this.isNotFundedOnly)
            return q && val.statusMsg.indexOf('success')==-1;
            else
            return q;
          });        
        }     
        else if(this.isEligibleOnly)
        {
          this.borrowers = event.filter((val,index)=>{
            let q = val.isEligible;
            if(this.isFundedOnly)
            return q && val.statusMsg.indexOf('success')!=-1;
            else if(this.isNotFundedOnly)
            return q && val.statusMsg.indexOf('success')==-1;
            else
            return q;
          });        
        } 
        else
        { 
          this.borrowers = event.filter((val,index)=>{
            let q = true;
            if(this.isFundedOnly)
            return q && val.statusMsg.indexOf('success')!=-1;
            else if(this.isNotFundedOnly)
            return q && val.statusMsg.indexOf('success')==-1;
            else
            return q;             
          });


         
               
        }
        this.selectedCount =  this.borrowers.length;
        
      },
      error:(err)=>{
        Swal.fire('Something went wrong. Please try again after sometime.');   
        console.log(err);
      }
    });    
  }

  fileName!:string;
  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.p2pService.UploadLendenClubStatement(formData);

        upload$.subscribe();
    }
}

lcAccTranSummary!:LendenClubTransactionSummary;
lastLCTrans!:Date;
lcWithdrawPending:number=0;
LoadLendenTransactionStatement()
{
  this.p2pService.GetLCAccountStatement().subscribe({
    next:(res)=>{
      this.lcAccTranSummary = res;
      let lastLCTransation = res.lendenClubTransactions.map(function(m){return m.date;});
      let mxDate = lastLCTransation.reduce(function (a, b) {
        return a > b ? a : b;
    });
      this.lastLCTrans = mxDate;
      // Swal.fire('Total Transactions: '+res.lendenClubTransactions.length.toString());
    },
    error:(err)=>{console.log('Something went wrong!');},
    complete:()=>{
  // this.lcRecoveryPending = (this.lcAccTranSummary!=null && this.lcAccTranSummary.calTotalDeposit!=null?this.lcAccTranSummary.calTotalDeposit:0) - ((this.lcAccTranSummary!=null&&this.lcAccTranSummary.calTotalWithdrawn!=null?this.lcAccTranSummary.calTotalWithdrawn:0)+(this.lendenEscroBalance?.value!=null?this.lendenEscroBalance?.value:0));

    }
  });
}

RestartWebSite(website:string)
{
  var confirmMessage =  `Restart Service ${website}`;
    Swal.fire({
      title: 'Are you sure?',
      text: confirmMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {      
        this.p2pService.StopWebsite(website).subscribe({
          next:(event)=>{
              if(event)            
              Swal.fire('Stopped Website Restart Soon.', confirmMessage,'success');
            else
            Swal.fire('Stop Website Request Failed! Retry again', confirmMessage,'error');

            setTimeout(()=>{              
              this.p2pService.StartWebsite(website);
              Swal.fire(`${website} Service Started`,'success');
            },25000);
          },
          error:(err)=>{console.log(err);
            Swal.fire('Cancelled','Something went wrong. Please try again.', 'error');
          }
        });
        
      } 
    });
}

upload() {
  if (!this.selectedFiles || this.selectedFiles.length === 0) {
    this.errorMsg = 'Please choose a file.';
    return;
  }

  const formData = new FormData();
  this.selectedFiles.forEach((f) => formData.append('files', f));


  const upload$ = this.p2pService.UploadLendenClubStatement(formData);

  upload$.subscribe({complete:()=>{

    this.LoadLendenTransactionStatement();
  
  }});

  // const req = new HttpRequest(
  //   'POST',
  //   `api/students/${this.studentId}/certificates`,
  //   formData,
  //   {
  //     reportProgress: true,
  //   }
  // );
  // this.uploading = true;
  // this.httpClient
  //   .request<CertificateSubmissionResult[]>(req)
  //   .pipe(
  //     finalize(() => {
  //       this.uploading = false;
  //       this.selectedFiles = null;
  //     })
  //   )
  //   .subscribe(
  //     (event) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.uploadProgress = Math.round(
  //           (100 * event.loaded) / event.total
  //         );
  //       } else if (event instanceof HttpResponse) {
  //         this.submissionResults = event.body as CertificateSubmissionResult[];
  //       }
  //     },
  //     (error) => {
  //       // Here, you can either customize the way you want to catch the errors
  //       throw error; // or rethrow the error if you have a global error handler
  //     }
  //   );
}

selectedFiles!: File[];
errorMsg = '';
chooseFile(files: FileList|null) {
  this.selectedFiles = [];
  this.errorMsg = '';
 
  if (files==null || files.length === 0) {
    return;
  }
  for (let i = 0; i < files.length; i++) {
    this.selectedFiles.push(files[i]);
  }
  if(this.selectedFiles.length>0)
  {
    this.upload();
  }
}

UpdateDataLendenLMS()
{
  this.play=true;
this.p2pService.RefreshLCLoanData().subscribe({
next:(val)=>{Swal.fire('Completed');},
error:(err)=>{Swal.fire('Something went wrong!')}
});
this.observableTimer();
}

observableTimer() {
  const source = timer(1000, 5000);
  const abc = source.subscribe(val => {
    if(this.play)
    this.GetRefreshStatusLendenLMS();  
  });
}

lcUpdateStatus:string='';
lcUpdateStatusOld:string='';
play:boolean=true;
playCnt:number=5;
GetRefreshStatusLendenLMS()
{ 
  this.p2pService.GetStatusLCLoanData('open').subscribe({
    next:(val)=>{
      this.lcUpdateStatusOld = this.lcUpdateStatus;

      if(this.playCnt>0 && (val.scheme_id==null&&val.status==null))
      {
        this.playCnt--;
        if(this.playCnt==0)
        this.play=false;
      }
      
      if(val.scheme_id!=null&&val.status!=null)
      {      
      this.lcUpdateStatus = val.scheme_id+' : '+val.status;
      if(this.lcUpdateStatusOld == this.lcUpdateStatus)
      {
        this.play = false;
      }
      }
    },
    error:(err)=>{Swal.fire('Something went wrong!')}
    });  
}

  lcSuccess:boolean=false;
  lcFail:boolean=false;
  successCnt:number=0;
  failCnt:number=0;
  closedCnt:number=0;
  lcClosed:boolean=false;
  profitCnt:number=0;
lcProfit:boolean=false;
lossCnt:number=0;
lcLoss:boolean=false;
  ApplyLCFilter()
  {  
    this.lcInvested=0;
    this.lcReceived=0;
    this.lcPending=0;
     
    if(this.lcSuccess && !this.lcFail)
    {     
      this.successCnt=0;
      this.lendenLoansFiltered=this.lendenLoansOriginal.filter((val,inde,arr)=>{
         if(val.isSuccess)
         {
          this.sumamounts(val);
         this.successCnt++;
         }
        return val.isSuccess;
      });
    }
    else if(this.lcFail && !this.lcSuccess)
    {
      this.failCnt=0;
      this.lendenLoansFiltered=this.lendenLoansOriginal.filter((val,inde,arr)=>{
        if(!val.isSuccess)
        {
          this.sumamounts(val);
        this.failCnt++;
        }
        return !val.isSuccess;
      });
    }
    else if(this.lcClosed && !this.lcSuccess && !this.lcFail)
    {
      this.closedCnt=0;
      this.lendenLoansFiltered=this.lendenLoansOriginal.filter((val,inde,arr)=>{
        if(val.is_closed)
        {
          this.sumamounts(val);
        this.closedCnt++;
        }
        return val.is_closed;
      });
    }
    else if(this.lcLoss && !this.lcSuccess && !this.lcFail)
    {
      this.lossCnt=0;
      this.lendenLoansFiltered=this.lendenLoansOriginal.filter((val,inde,arr)=>{
        if(val.isProfit!=null&&!val.isProfit)
        {
          this.sumamounts(val);
        this.lossCnt++;
        }
        return val.isProfit!=null&&!val.isProfit;
      });
    }
    else if(this.lcProfit && !this.lcSuccess && !this.lcFail)
    {
      this.profitCnt=0;
      this.lendenLoansFiltered=this.lendenLoansOriginal.filter((val,inde,arr)=>{
        if(val.isProfit!=null&&val.isProfit)
        {
          this.sumamounts(val);
        this.profitCnt++;
        }
        return val.isProfit!=null&&val.isProfit;
      });
    }
    else
    {
  
      this.successCnt=0;
      this.failCnt=0;
      this.lendenLoansFiltered=this.lendenLoansOriginal.filter((val,inde,arr)=>{
        this.sumamounts(val);
        if(val.isSuccess)
        this.successCnt++;
        if(!val.isSuccess)
        this.failCnt++;
       return true;
     });
     
    }    
       
  }
  ApplyFilter(chk:string)
  {   
    if(chk=='I2I')
    {
      this.isLCOnly=false;
    }
    else if(chk=='LC')
    {
      this.isI2iOnly=false;
    }
    else if(chk=='FUNDED')
    {
      this.isNotFundedOnly=false;
    }
    else if(chk=='NOTFUNDED')
    {
      this.isFundedOnly=false;
    }
    this.LoadBorrowers();
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
      this.p2pService.DeleteBorrower(w.keyId,w.risk.startsWith('LC-')?'LC-M':(w.isGroup?'I2I-G':'I2I-M')).subscribe({
        next:(event)=>{
          this.LoadBorrowers();
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

  
