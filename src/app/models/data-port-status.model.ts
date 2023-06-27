export interface DataPortStatus {
    FileName: string
    GroupStatus: GroupStatu[]
    TotalActual: number
    TotalCurrent: number
    OverallStatus: boolean
  }
  
  export interface GroupStatu {
    Id: number
    Group: string
    Actual: number
    Current: number
    Status: boolean
  }