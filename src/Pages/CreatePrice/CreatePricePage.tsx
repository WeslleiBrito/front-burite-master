import React, { ChangeEvent, useEffect, useState } from "react";
import { InputProductSalePrice, InputValuesCreatePrice, NfPurchase, ProductsNf } from "../../types/type";
import axios, {AxiosError} from "axios";
import { BASE_URL_LOCAL } from "../../constants/BASE_URL";
import { useParams } from "react-router-dom";
import { CodeProduct, Commission, Cost, Description, ExpenseFixed, ExpenseVariable, InputCommissionPorcentage, InputCommissionValue, InputProfitPorcentage, InputProfitValue, Main, Profit, Quantity, Table, TableHead, TableRow, TableWrapper, InputPrice, Discount, InputDiscountValue, InputDiscountPorcentage, SalePrice, TableBody, RowHead } from "./styleCreatePrice";

type keyObjectValues = "inputFraction" | "inputCommissionPorcentage" | "inputCommissionValue" | "inputDiscountPorcentage" | "inputDiscountValue" | "inputPrice" | "inputProfitPorcentage" | "inputProfitValue"

export const CreatePrice: React.FC = () => {

    const [nf, setNf] = useState<NfPurchase>()
    
    const pathParams = useParams();

    useEffect(() => {
        const getNf = async () => {
            try {
             
                const result = await axios.post(BASE_URL_LOCAL + `/price-formation/${pathParams.nf}`)
                setNf({...result.data})

            } catch (error) {
                if(error instanceof AxiosError){
                    console.log("Erro do axios", error);
                    
                    if(error.response?.status === 401){
                        localStorage.removeItem('token')
                    }
                }else{
                    console.log(error)
                }
            }
        }

        getNf()
    }, [])

    const RowProducts = (props: { product: ProductsNf }): JSX.Element => {
        
            const { product } = props

            const [ objectValues, setObjectValues] = useState<InputValuesCreatePrice>({
                expenseVariable: product.expenseVariableUnit,
                inputCommissionPorcentage: product.commission,
                inputCommissionValue: product.commission * product.newSalePrice,
                inputDiscountPorcentage: product.discountPercentageMax,
                inputDiscountValue: product.discountValueMax,
                inputPrice: product.newSalePrice,
                inputProfitPorcentage: product.profitPercentage,
                inputProfitValue: product.profitUnit 
            })

            const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
                const { name, value } = event.target;
                const valueNumber = Number(value.replace(',', '.'))

                const products: InputProductSalePrice[] = [
                    {
                        codeProduct: product.code,
                        cost: product.costValue,
                        commission: name === "inputCommissionPorcentage" ? valueNumber : undefined,
                        discount: name === 'inputDiscountPorcentage' ? valueNumber : undefined,
                        fraction: name === 'inputFraction' ? valueNumber : undefined,
                        profitPercentage: name === 'inputProfitPorcentage' ? valueNumber : undefined,
                        profitValue: name === 'inputProfitValue' ? valueNumber : undefined
                    }
                ]
                try {
                    
                } catch (error) {
                    
                }
                setObjectValues({...objectValues, [name]: value})

            }
            return(
                    <TableRow>
                        <CodeProduct>{product.code}</CodeProduct>
                        <Description>{product.nameProduct}</Description>
                        <Quantity>{product.inputQuantity}</Quantity>
                        <Cost>{product.costValue}</Cost>
                        <ExpenseFixed>{product.expenseFixedUnit}</ExpenseFixed>
                        <ExpenseVariable>
                            {product.expenseVariableUnit}
                        </ExpenseVariable>
                        <Commission>
                            <InputCommissionValue value={objectValues.inputCommissionValue} name="inputCommissionValue" onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event)}}/>
                            <InputCommissionPorcentage value={objectValues.inputCommissionPorcentage} name="inputCommissionPorcentage"/>
                        </Commission>
                        <Discount>
                            <InputDiscountValue value={objectValues.inputDiscountValue}/>
                            <InputDiscountPorcentage value={objectValues.inputDiscountPorcentage}/>
                        </Discount>
                        <Profit>
                            <InputProfitValue value={objectValues.inputProfitValue}/>
                            <InputProfitPorcentage value={objectValues.inputProfitPorcentage}/>
                        </Profit>
                        <SalePrice>
                            <InputPrice value={objectValues.inputPrice}/>
                        </SalePrice>
                    </TableRow>
                )
    }
    useEffect(() => {console.log(nf)}, [nf])
    
    return (
        <Main>
            <TableWrapper>
                <Table>
                    <TableHead>
                        <RowHead>
                            <CodeProduct>Código</CodeProduct>
                            <Description>Descrição</Description>
                            <Quantity>Quant.</Quantity>
                            <Cost>Custo</Cost>
                            <ExpenseFixed>Desp. Fixa</ExpenseFixed>
                            <ExpenseVariable>Desp. Vr</ExpenseVariable>
                            <Commission>Comissão</Commission>
                            <Discount>Desconto</Discount>
                            <Profit>Lucro</Profit>
                            <SalePrice>Venda</SalePrice>
                        </RowHead>
                    </TableHead>
                    <TableBody>
                        {
                            nf ? nf.products.map((product) => {
                                return(
                                    <RowProducts product={product} key={product.code}/>
                                )
                            }) : null
                        }
                    </TableBody>
                </Table>
            </TableWrapper>
        </Main>
    )
}