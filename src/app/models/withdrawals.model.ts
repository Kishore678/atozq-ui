export interface Withdrawals {
    withdrawalsId: number
    wType: string
    month: number
    year: number
    amount: number
    status: boolean
    message: string
    manual: boolean
    createdDate: Date
    modifiedDate: Date
  }