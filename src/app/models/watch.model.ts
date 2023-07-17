export class WatchModel
{
    // watchId:number=0;
    // itemId:number=0; 
    WatchId!:number
    AnonymousID!:string
    Code!:string
    IsWatch!:boolean
    Nme!:string;//time when added from ui
    CreatedLTP!:number;//time when added from ui
    CreatedLTPAsOn!:Date;//time when added from ui
    ModifiedLTP!:number;//latest from bhavcopy
    ModifiedLTPAsOn!:Date;//latest from bhavcopy
    Change!:number; //auto cal
    PercentChange!:number;//auto cal
}