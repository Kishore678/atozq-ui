export interface InvestSettingsRules {
    investSettingsRulesId: number;
    ruleName: string | null;
    riskType: string | null;
    isBaseRule: boolean;
    minAge: number;
    maxAge: number;
    loanAmt: number;
    tenureD: number;
    tenureM: number;
    investAmt: number;
    minInvest: number;
    allowNoCibil: boolean;
    cibilMasterID: number;
    maxAllowNoCibil: number;
    isAutoInvest: boolean;
    autoInvestLimit: number;
    tPin: number;
    user: string | null;
    pwd: string | null;
    source: string | null;
    escroBal: number;
    investLimitBal: number;
    alertIfBalLow: number;
    createdDatec: string;
    modifedDate: string;
}