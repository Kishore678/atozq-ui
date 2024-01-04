export interface P2PAccount {
  p2PAccountId: number
  p2PName: string
  amount: number
  transactID: string
  transactType: string
  repaidToAccount: string
  status: string
  transactDate: Date
  modifiedDate: Date
}
