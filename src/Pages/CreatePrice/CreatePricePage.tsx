import React, { ChangeEvent, useEffect, useState } from "react";
import { InputProductSalePrice, InputValuesCreatePrice, NfPurchase, ProductsNf } from "../../types/type";
import axios, { AxiosError } from "axios";
import { BASE_URL_LOCAL } from "../../constants/BASE_URL";
import { useParams } from "react-router-dom";
import UpdateIcon from '@mui/icons-material/Update';
import { CodeProduct, Commission, Cost, Description, ExpenseFixed, ExpenseVariable, InputCommissionPorcentage, InputProfitPorcentage, InputProfitValue, Main, Profit, Quantity, Table, TableHead, TableRow, TableWrapper, InputPrice, Discount, InputDiscountPorcentage, SalePrice, TableBody, RowHead } from "./styleCreatePrice";

type keyObjectValues = "inputCommission" | "inputDiscountPorcentage" | "inputPrice" | "inputProfitPorcentage" | "inputProfitValue" | "inputFraction" | ""

export const CreatePrice: React.FC = () => {

    const [nf, setNf] = useState<NfPurchase>()
    const [order, setOrder] = useState<boolean>(true)

    const pathParams = useParams();

    useEffect(() => {
        const getNf = async () => {
            try {

                const result = await axios.post(BASE_URL_LOCAL + `/price-formation/${pathParams.nf}`)
                setNf({ ...result.data })

            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log("Erro do axios", error);

                    if (error.response?.status === 401) {
                        localStorage.removeItem('token')
                    }
                } else {
                    console.log(error)
                }
            }
        }

        getNf()
    }, [])

    const RowProducts = (props: { product: ProductsNf }): JSX.Element => {

        const { product } = props

        const [objectValues, setObjectValues] = useState<InputValuesCreatePrice>({
            inputCommission: product.commissionPorcentage.toFixed(2),
            inputDiscountPorcentage: product.discountPercentageMax.toFixed(2),
            inputPrice: product.newSalePrice.toFixed(2),
            inputProfitPorcentage: product.profitPercentage.toFixed(2),
            inputProfitValue: product.profitUnit.toFixed(2),
            inputFraction: product.fraction.toFixed(2)
        })


        const [modify, setModify] = useState<keyObjectValues>("")

        const handleInput = async (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setObjectValues((prevForm) => ({ ...prevForm, [name]: String(Number(value).toFixed(2)) }))
        }

        const createPriceProduct = async () => {

            const newObjectPrice: { products: InputProductSalePrice[] } = {

                products: [
                    {
                        codeProduct: product.code,
                        cost: product.costValue,
                        commission: Number(objectValues.inputCommission),
                        discount: Number(objectValues.inputDiscountPorcentage),
                        fraction: Number(objectValues.inputFraction),
                        profitPercentage: modify === 'inputProfitPorcentage' ? Number(objectValues.inputProfitPorcentage) : undefined,
                        profitValue: modify === 'inputProfitValue' ? Number(objectValues.inputProfitValue) : undefined,
                        price: modify === 'inputPrice' ? Number(objectValues.inputPrice) : undefined,
                        quantity: product.inputQuantity / product.fraction
                    }
                ]
            }

            try {
                
                if(nf && modify.length > 0) {

                    const result: NfPurchase = (await axios.post(BASE_URL_LOCAL + "/price-formation/products", newObjectPrice)).data
                    const { products } = result

                    const copyNf = { ...nf }

                    nf.products.forEach((product, index) => {
                        const element = products.find((item) => {
                            return item.code === product.code
                        })

                        if(element){
                            copyNf.products[index] = element
                        }
                    })

                    setNf(copyNf)

                }


            } catch (error) {
                console.log(error);
            }
        }
        return (
            <TableRow>
                <CodeProduct>{product.code}</CodeProduct>
                <Description>{product.nameProduct}</Description>
                <Quantity>{product.inputQuantity.toFixed(2).replace('.', ',')}</Quantity>
                <Cost>{product.costValue.toFixed(2).replace('.', ',')}</Cost>
                <ExpenseFixed>{product.expenseFixedUnit.toFixed(2).replace('.', ',')}</ExpenseFixed>
                <ExpenseVariable>
                    {product.expenseVariableUnit.toFixed(2).replace('.', ',')}
                </ExpenseVariable>
                <Commission>
                    <InputCommissionPorcentage
                        value={objectValues.inputCommission}
                        name="inputCommission"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => { handleInput(event); setModify('inputCommission') }}
                        min={0}
                    />
                </Commission>
                <Discount>
                    <InputDiscountPorcentage
                        value={objectValues.inputDiscountPorcentage}
                        name="inputDiscountPorcentage"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => { handleInput(event); setModify('inputDiscountPorcentage') }}
                        min={0}
                    />
                </Discount>
                <Profit>
                    <InputProfitValue
                        value={objectValues.inputProfitValue}
                        name="inputProfitValue"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => { handleInput(event); setModify('inputProfitValue') }}
                        min={0}
                    />
                    <InputProfitPorcentage
                        value={objectValues.inputProfitPorcentage}
                        name="inputProfitPorcentage"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => { handleInput(event); setModify('inputProfitPorcentage') }}
                        min={0}
                    />
                </Profit>
                <SalePrice>
                    <InputPrice
                        value={objectValues.inputPrice}
                        name="inputPrice"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => { handleInput(event); setModify('inputPrice') }}
                        min={0}
                    />
                </SalePrice>
                <UpdateIcon onClick={() => { createPriceProduct() }} />
            </TableRow>
        )
    }

    const orderListQuantity = () => {

        const newOrder = nf?.products.sort((a, b) => {

            if (a.inputQuantity > b.inputQuantity) {
                if (!order) {
                    return 1
                } else {
                    return -1
                }
            }

            if (a.inputQuantity < b.inputQuantity) {
                if (!order) {
                    return -1
                } else {
                    return 1
                }
            }
            return 0
        }) as ProductsNf[]

        if (nf) {

            setNf({ ...nf, products: newOrder })
        }

        setOrder(!order)
    }

    return (
        <Main>
            <TableWrapper>
                <Table>
                    <TableHead>
                        <RowHead>
                            <CodeProduct>Código</CodeProduct>
                            <Description>Descrição</Description>
                            <Quantity onClick={() => { orderListQuantity() }}>Quant.</Quantity>
                            <Cost>Custo</Cost>
                            <ExpenseFixed>D. Fixa</ExpenseFixed>
                            <ExpenseVariable>D. Vr</ExpenseVariable>
                            <Commission>Comissão</Commission>
                            <Discount>Desconto</Discount>
                            <Profit>Lucro</Profit>
                            <SalePrice>Venda</SalePrice>
                        </RowHead>
                    </TableHead>
                    <TableBody>
                        {
                            nf ? nf.products.map((product) => {
                                return (
                                    <RowProducts product={product} key={product.code} />
                                )
                            }) : null
                        }
                    </TableBody>
                </Table>
            </TableWrapper>
        </Main>
    )
}