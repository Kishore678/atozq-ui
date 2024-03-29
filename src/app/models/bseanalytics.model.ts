import { WatchModel } from "./watch.model"

export interface BSEDetails {
    FileName: string
    BSEAnalytics: Bseanalytic[]
    ChatCount:ChatCount[]
    StockCount:number
    Watches:WatchModel[]
  }
  export interface ChatCount
  {
    ChatID:string  
    Count:number
  }
  export interface Bseanalytic {
    BSEAnalyticsId: number
    Code: string
    Flg: number
    Nme: string
    Grp: string
    Chat:string
    LTP: number
    Vol: number
    Cnt: number
    Opn: number
    Hig: number
    Low: number
    Avg: number
    Prv: number
    Tvr: number
    Chg: number
    Cpg: number
    Cpg1: number
    Cpg2: number
    Cpg3: number
    Cpg4: number
    Cpg5: number
    Growth: number    
    Rank:number,
    Signal:string,
    SignalDays:number,
    SignalIndicator:number,
    CreatedDate:Date,
    Mst: boolean
    Wrn: string
    Fund: Fund
    IsWatch:boolean
    ChatCnt:number
    SttlmPric:number
    TradDt:string
    MarketCap:number
    AvgVol3M:number
    SC_SYMBOL:string
  }
  
  export interface Fund {
    Ful: string
    Ntc: string
    Cat: string
    Ind: string
    ID: string
    Slt: string
    Int: string
    Bst: string
    Mis: string
    Mrg: string
    Lev: string
    Tdt: string
    Prc: string
    Opn: string
    Hig: string
    Low: string
    Prv: string
    F2H: string
    F2L: string
    UC: string
    LC: string
    UCP: string
    LCP: string
    PCg: string
    PCp: string
    Mcp: string
    FV: string
    EPS: string
    CPS: string
    PE: string
    ROE: string
    FY: string
    Rnu: string
    Npt: string
    AMR: string
    ELR: string
    IV: string
    VAR: string
    SV: string
    Dty: string
    Dtp: string
    Nws: Nw[]
    PB: string
    Dtd: string
    Sdt: string
  }
  
  export interface Nw {
    NDt: string
    Des: string
  }
  