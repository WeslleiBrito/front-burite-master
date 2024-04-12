
export interface ContextInterface {
    usersName: string[],
    error: boolean,
    loading: boolean,
    updateSubgroup: () => void,
    subgroups: Subgroup[],
    updatedShoppingList: () => void,
    shoppingList: ListShopping[]
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

export interface ListShopping {
    nf: string,
    provider: string,
    value: number,
    date: string,
}

export interface ProductsPrice {
    item: number,
    code: number,
    nameProduct: string,
    codeSubgroup: number,
    nameSubgroup: string,
    unit: string,
    costValue: number,
    fraction: number,
    inputQuantity: number,
    newSalePrice: number
}

export interface NF_Price {
    nf: string,
    total: number,
    date: Date,
    provider: string
    products: ProductsPrice[]
}

export interface ProductsNf extends ProductsPrice {
    expenseFixedUnit: number,
    expenseVariableUnit: number,
    discountPercentageMax: number,
    discountValueMax: number,
    profitUnit: number,
    profitPercentage: number,
    commission: number,
    amountCost: number,
    amountInvoicing: number,
    limitedProfitPorcentage: {
        status: boolean,
        limit: number
    }
}

export interface NfPurchase {
    nf: string,
    total: number,
    date: Date,
    provider: string
    products: ProductsNf[]
}