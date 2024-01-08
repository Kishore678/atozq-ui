export interface LendenClubTransaction {
    accountStatementNo: string | null;
    page: number;
    sno: number;
    date: Date;
    transactionID: string | null;
    transactionType: string | null;
    schemeID: string | null;
    remark: string | null;
    credit: number | null;
    debit: number | null;
    isFetched: boolean;
    createdDate: string;
    modifiedDate: string;
}

export interface LendenClubTransactionSummary {
    accountStatementNo: string | null;
    accountID: string | null;
    periodFrom: string;
    periodTo: string;
    totalBalance: number | null;
    totalInvestment: number | null;
    expectedReturns: number | null;
    fundsWithdrawn: number | null;
    calTotalWithdrawn: number | null; 
    calTotalDeposit: number | null; 
    calTotalLend: number | null;
    calTotalRepay: number | null;
    totalNewInvestments: number | null;
    newInvestmentStartDate: string;
    createdDate: string;
    modifiedDate: string;
    lendenClubTransactions: LendenClubTransaction[];
}