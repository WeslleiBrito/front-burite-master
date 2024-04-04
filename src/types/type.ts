
export interface ContextInterface {
    usersName: string[],
    error: boolean, 
    loading: boolean,
    updateSubgroup: () => void,
    subgroups: Subgroup[]
}

export interface Subgroup {
    codSubgroup: number,
    nameSubgroup: string,
    amountQuantity: number,
    amountQuantityReturned: number,
    amountInvoicing: number,
    amountCost: number,
    amountDiscount: number,
    amountFixed: number,
    fixedUnitExpense: number,
    plucro: number,
    amountVariableExpense: number,
    subgroupProfit: number,
    discountPercentage: number,
    invoicingPercentage: number,
    costPercentage: number,
    fixedExpensePercentage: number,
    subgroupProfitPercentage: number,
    updatedAt: string
}
