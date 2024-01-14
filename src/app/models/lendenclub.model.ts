export interface Lendenclub {
    deposit: number
    withdraw: number
    pendingWithdraw: number
    lending: number
    repayment: number
    pendingRepayment: number
    depositDetails: StatementDetail[]
    withdrawDetails: StatementDetail[]
    lendingDetails: StatementDetail[]
    repaymentDetails: StatementDetail[]
  }
  
  export interface StatementDetail {
    transactionType: string
    date: string
    transactionID: string
    schemeID:string
    credit: number
    debit: number
  }

  
  