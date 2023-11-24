export class CreateMangerDto {

    name:string
    money:number
}

export class TransforMoneyDto{
    fromId:number  //发起人
    toId:number // 接受
    money:number  //转账的钱

}
