import React, { useEffect, useState } from "react";
import { NfPurchase, ProductsNf } from "../../types/type";
import axios, {AxiosError} from "axios";
import { BASE_URL_LOCAL } from "../../constants/BASE_URL";
import { useParams } from "react-router-dom";
import { CodeProduct, Commission, Cost, Description, ExpenseFixed, ExpenseVariable, InputCommissionPorcentage, InputCommissionValue, InputProfitPorcentage, InputProfitValue, Main, Profit, Quantity, Table, TableHead, TableRow, TableWrapper, InputPrice, Discount, InputDiscountValue, InputDiscountPorcentage, SalePrice, TableBody } from "./styleCreatePrice";


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

            return(
                    <TableRow>
                        <CodeProduct>{product.code}</CodeProduct>
                        <Description>{product.nameProduct}</Description>
                        <Quantity>{product.inputQuantity}</Quantity>
                        <Cost>{product.costValue}</Cost>
                        <ExpenseFixed>{product.expenseFixedUnit}</ExpenseFixed>
                        <ExpenseVariable>{product.expenseVariableUnit}</ExpenseVariable>
                        <Commission>
                            <InputCommissionValue value={product.commission}/>
                            <InputCommissionPorcentage value={(product.commission / product.newSalePrice).toFixed(2)}/>
                        </Commission>
                        <Discount>
                            <InputDiscountValue value={product.discountValueMax}/>
                            <InputDiscountPorcentage value={product.discountPercentageMax}/>
                        </Discount>
                        <Profit>
                            <InputProfitValue value={product.profitUnit}/>
                            <InputProfitPorcentage value={product.profitPercentage}/>
                        </Profit>
                        <SalePrice>
                            <InputPrice value={product.newSalePrice}/>
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
                        <TableRow>
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
                        </TableRow>
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