 
  export interface DataPortStatus {
    FileName: string
    GroupDetails: GroupDetail[]
    SourceTotal: number
    ProcessedTotal: number
    CacheddTotal: number
    PostTotal: number
    OverallStatus: any
  }
  
  export interface GroupDetail {
    Id: number
    Group: string
    Source: number
    Processed: number
    Cached: number
    Post: number
    Status: any
  }