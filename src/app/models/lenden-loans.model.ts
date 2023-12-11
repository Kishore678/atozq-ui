export interface LendenLoan {
    lendenLoanId: number;
    total_investment: number | null;
    open_date: string | null;
    maturity_date: string | null;
    scheme_id: string | null;
    is_closed: boolean | null;
    expected_returns: number | null;
    auto_renew: boolean | null;
    net_roi: number | null;
    actual_returns: number | null;
    tenure: number | null;
    tenure_type: string | null;
    investment_type: string | null;
    investment_name: string | null;
    portfolio_health: boolean | null;
    file_url: string | null;
    mandate_status: string | null;
    source: string | null;
    loan_id: string | null;
    amount_received: number;
    expected_amount: number;
    invested_amount: number;
    loan_type: string | null;
    borrower_name: string | null;
    isSuccess: boolean;
    errorMessage: string | null;
    createdDate: string;
    modifiedDate: string;
}

export interface LendenLoanStatus
{
    scheme_id: string | null;
    status: string | null;
}