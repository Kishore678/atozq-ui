export class UserModel
{
    AnonymousID!:string
    UserName!:string
    Email!:string
    IPAddress!:string
    Status!:boolean
    ErrorMessage!:string
}

export interface User {    
    AnonymousID: string
    UserName: string
    Email: string
    Visited: number
    TotalVisits: number
    IPAddress: string
    CreatedDate: Date
    ModifiedDate: Date
  }