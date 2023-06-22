export interface Scriptdetails {
    BasicDetails: BasicDetails
    PriceDetails: PriceDetails
    FinancialsDetails: FinancialsDetails
    MarginDetails:MarginDetails
    DeliveryPosition:DeliveryPosition
    Announcements: Announcement[]
  }
  
  export interface DeliveryPosition {
    TradeDate: string
    QtyTraded: string
    DeliverableQty: string
    PercentDeliverableQty: string
  }
 
  export interface MISDetails
  {
      IsMIS:boolean
      VarELMAdhocMargin:string
      MISMarginPercent:string
      MISMultiplier:string
      COMarginPercent:string
      COUpperTrigger:string
      COMultiplier:string
  }
  export interface MarginDetails {
    AMR: string
    ELR: string
    IndexVar: string
    VRMar: string
    SecurityVar: string
    MISDetails:MISDetails
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
  
