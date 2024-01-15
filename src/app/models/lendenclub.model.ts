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
    lendenClubPnLReport:LendenClubPnLReport[]
    allCount: number
    lossCount: number
    profitCount: number
    closedCount: number
    lossAmount: number
    profitAmount: number
  }
  
  export interface StatementDetail {
    transactionType: string
    date: string
    transactionID: string
    schemeID:string
    credit: number
    debit: number
  }

  export interface LendenClubPnLReport {
    schemeID: string | null;
    invested: number | null;
    repaid: number | null;
    rPercnt: number | null;
    pnL: number | null;
    cibil: string | null;
    lc: string | null;
    loanType: string | null;
    loanAmount: number | null;
    roi: number | null;
    tenure: number | null;
    tenureType: string | null;
    empType: string | null;
    income: number | null;
    age: number | null;
    sex: string | null;
    city: string | null;
    openDate: string | null;
    closeDate: string | null;
    closed: boolean | null;
    loss: boolean | null;
    profit: boolean | null;
}

  
  