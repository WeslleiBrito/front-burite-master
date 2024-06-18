import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { InputProductSalePrice, InputValuesCreatePrice, NfPurchase, ProductsNf } from "../../types/type";
import axios, { AxiosError } from "axios";
import { BASE_URL_LOCAL } from "../../constants/BASE_URL";
import { useParams } from "react-router-dom";
import UpdateIcon from '@mui/icons-material/Update';
import { Button } from "@mui/material";
import { CodeProduct, Commission, Cost, Description, ExpenseFixed, ExpenseVariable, InputCommissionPorcentage, InputProfitPorcentage, InputProfitValue, Main, Profit, Quantity, Table, TableHead, TableRow, Discount, InputDiscountPorcentage, SalePrice, TableBody, RowHead, DiscountValue, CommissionValue, InputPrice } from "./styleCreatePrice";

type keyObjectValues = "inputCommission" | "inputDiscountPorcentage" | "inputPrice" | "inputProfitPorcentage" | "inputProfitValue" | "inputFraction" | ""

const RowProducts = (props: { product: ProductsNf, handleModifiedProducts: Function }): JSX.Element => {

    const { product, handleModifiedProducts } = props

    const [objectValues, setObjectValues] = useState<InputValuesCreatePrice>({
        codeProduct: product.code,
        inputCommission: product.commissionPorcentage.toFixed(2),
        inputDiscountPorcentage: product.discountPercentageMax.toFixed(2),
        inputPrice: product.newSalePrice.toFixed(2),
        inputProfitPorcentage: product.profitPercentage.toFixed(2),
        inputProfitValue: product.profitUnit.toFixed(2),
        inputFraction: product.fraction.toFixed(2)
    })

    const [focusedRow, setFocusedRow] = useState<number | null>(null);

    useEffect(() => {
        setObjectValues({
            codeProduct: product.code,
            inputCommission: product.commissionPorcentage.toFixed(2),
            inputDiscountPorcentage: product.discountPercentageMax.toFixed(2),
            inputPrice: product.newSalePrice.toFixed(2),
            inputProfitPorcentage: product.profitPercentage.toFixed(2),
            inputProfitValue: product.profitUnit.toFixed(2),
            inputFraction: product.fraction.toFixed(2)
        })
    }, [product])
    const [modify, setModify] = useState<keyObjectValues>("")

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setObjectValues((prevForm) => ({ ...prevForm, [name]: value }))

    }

    useEffect(() => {
        if (modify.length > 0) {
            const newValues: InputProductSalePrice = {
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

            handleModifiedProducts(newValues)
        }
    }, [objectValues])

    const formatNumber = (event: FocusEvent<HTMLInputElement>) => {

        const { name, value } = event.target
        setObjectValues((prevForm) => ({ ...prevForm, [name]: Number(value).toFixed(2) }))
    }


    return (
        <TableRow key={product.code}
            isFocusedItem={focusedRow === product.code}
            onMouseEnter={() => { setFocusedRow(product.code) }}
            onMouseLeave={() => { setFocusedRow(null) }}
        >
            <CodeProduct>{product.code}</CodeProduct>
            <Description>{product.nameProduct}</Description>
            <Quantity>{product.inputQuantity.toFixed(2).replace('.', ',')}</Quantity>
            <Cost>{product.costValue.toFixed(2).replace('.', ',')}</Cost>
            <ExpenseFixed>{product.expenseFixedUnit.toFixed(2).replace('.', ',')}</ExpenseFixed>
            <ExpenseVariable>
                {product.expenseVariableUnit.toFixed(2).replace('.', ',')}
            </ExpenseVariable>
            <Commission styleItem={true}>
                <InputCommissionPorcentage
                    value={objectValues.inputCommission}
                    name="inputCommission"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handleInput(event); setModify('inputCommission') }}
                    onBlur={(event: FocusEvent<HTMLInputElement>) => { formatNumber(event) }}
                    min={0}
                />
                <CommissionValue>{product.commission.toFixed(2).replace('.', ',')}</CommissionValue>
            </Commission>
            <Discount styleItem={true}>
                <InputDiscountPorcentage
                    value={objectValues.inputDiscountPorcentage}
                    name="inputDiscountPorcentage"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handleInput(event); setModify('inputDiscountPorcentage') }}
                    onBlur={(event: FocusEvent<HTMLInputElement>) => { formatNumber(event) }}
                    min={0}
                />
                <DiscountValue>{product.discountValueMax.toFixed(2).replace('.', ',')}</DiscountValue>
            </Discount>
            <Profit styleItem={true}>
                <InputProfitPorcentage
                    value={objectValues.inputProfitPorcentage}
                    name="inputProfitPorcentage"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handleInput(event); setModify('inputProfitPorcentage') }}
                    onBlur={(event: FocusEvent<HTMLInputElement>) => { formatNumber(event) }}
                    min={0}
                />

                <InputProfitValue
                    value={objectValues.inputProfitValue}
                    name="inputProfitValue"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handleInput(event); setModify('inputProfitValue') }}
                    onBlur={(event: FocusEvent<HTMLInputElement>) => { formatNumber(event) }}
                    min={0}
                />
            </Profit>
            <SalePrice>
                <InputPrice
                    value={objectValues.inputPrice}
                    name="inputPrice"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handleInput(event); setModify('inputPrice') }}
                    onBlur={(event: FocusEvent<HTMLInputElement>) => { formatNumber(event) }}
                    min={0}
                />
            </SalePrice>
        </TableRow>
    )
}

export const CreatePrice: React.FC = () => {

    const [nf, setNf] = useState<NfPurchase>()
    const [order, setOrder] = useState<boolean>(true)
    const [modifiedProducts, setModifiedProducts] = useState<{ products: InputProductSalePrice[] }>({ products: [] })
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

    const handleModifiedProducts = (value: InputProductSalePrice) => {

        const copyModifiedProducts = Object.assign({}, modifiedProducts)
        const indexProduct = modifiedProducts.products.findIndex((item) => { return item.codeProduct === value.codeProduct })

        if (indexProduct !== -1) {
            copyModifiedProducts.products[indexProduct] = value
            setModifiedProducts({ ...copyModifiedProducts })

        } else {
            copyModifiedProducts.products.push(value)
            setModifiedProducts({ ...copyModifiedProducts })
        }

    }

    const createPriceProduct = async () => {

        try {

            if (nf && modifiedProducts.products.length > 0) {

                const result: NfPurchase = (await axios.post(BASE_URL_LOCAL + "/price-formation/products", modifiedProducts)).data
                const { products } = result

                const copyNf = { ...nf }

                products.forEach((item) => {
                    const index = nf.products.findIndex((prod) => prod.code === item.code)
                    copyNf.products[index] = item
                })


                setNf(copyNf)
                setModifiedProducts({products: []})
            }

        } catch (error) {
            console.log(error);
        }
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
                        nf ? nf.products.map((product, index) => {
                            return (
                                <RowProducts product={product} key={index + product.code} handleModifiedProducts={handleModifiedProducts} />
                            )
                        }) : null
                    }
                </TableBody>
            </Table>
            <Button variant="contained" endIcon={<UpdateIcon />} onClick={createPriceProduct}
                style={{
                    display: "flex",
                    justifySelf: "end",
                    width: "10vw",
                }}
            >
                Atualizar
            </Button>
        </Main>
    )
}