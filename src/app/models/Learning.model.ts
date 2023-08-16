export interface Learning {
    LearningId:number
    ItemText:string
    ItemUrl:string
    Source:string
    Description:string
    Order:number
    CreatedOn:Date
}

export interface LearningModel {   
    Learnings: Learning[]   
    LearningCount:number    
  }