export interface Scriptdetails {
    BasicDetails: BasicDetails
    PriceDetails: PriceDetails
    FinancialsDetails: FinancialsDetails
    Announcements: Announcement[]
  }
  
  export interface BasicDetails {
    Company: string
    ScriptCode: string
    ScriptID: string
    ASMText: string
    IRPText: string
    GSMText: string
    Category: string
    Group: string
    SettlementType: string
    Industry: string
    TrdeDate: string
  }
  
  export interface PriceDetails {
    LTP: string
    High: string
    Low: string
    Avg: any
    Previous: string
    Fifty2WksHigh: string
    Fifty2WksLow: string
    UpperCktPrice: string
    LowerCktPrice: string
    UpperCktPercent: string
    LowerCktPercent: string
    Open: string
    PriceChange: string
    PricePercentChange: string
  }
  
  export interface FinancialsDetails {
    McapFullCr: string
    FaceValue: string
    EPS: string
    CEPS: string
    PE: string
    PB: string
    ROE: string
    FY: string
    Revenue: string
    NetProfit: string
  }
  
  export interface Announcement {
    Date: string
    AnnouncementNote: string
    Id: string
  }
  
