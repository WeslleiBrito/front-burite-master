import React, { ChangeEvent, useEffect, useState } from 'react';
import { useContext } from "react";
import { DataContext } from '../../context/dataContext'
import { useNavigate } from "react-router-dom";
import { goLoading } from '../../Routes/coordinator';
import { Subgroup } from '../../types/type';
import { useForm } from '../../hooks/useForm';
import { ContainerSearch, Main, Search, TableWrapper, Table, TableRow, TableBody, TableHead, TableCellCod, TableCellDescription, TableCellFixedExpense, TableCellProfitPorcentage } from './styleSubgroup';



const createData = (
    input: Subgroup
) => {
    const {
        amountCost,
        amountDiscount,
        amountFixed,
        amountInvoicing,
        amountQuantity,
        amountQuantityReturned,
        amountVariableExpense,
        codSubgroup,
        costPercentage,
        discountPercentage,
        fixedExpensePercentage,
        fixedUnitExpense,
        invoicingPercentage,
        nameSubgroup,
        plucro,
        subgroupProfit,
        subgroupProfitPercentage,
        updatedAt
    } = input

    return {
        nameSubgroup,
        codSubgroup,
        fixedUnitExpense,
        plucro,
        collapseData: {
            amountCost,
            amountDiscount,
            amountFixed,
            amountInvoicing,
            amountQuantity,
            amountQuantityReturned,
            amountVariableExpense,
            costPercentage,
            discountPercentage,
            fixedExpensePercentage,
            invoicingPercentage,
            subgroupProfit,
            subgroupProfitPercentage,
            updatedAt
        }
    };
}

const Row = (props: { row: ReturnType<typeof createData> }) => {
    const { row } = props;

    return (

        <TableRow>
            <TableCellCod>{row.codSubgroup}</TableCellCod>
            <TableCellDescription>{row.nameSubgroup}</TableCellDescription>
            <TableCellFixedExpense>{row.fixedUnitExpense}</TableCellFixedExpense>
            <TableCellProfitPorcentage>{row.plucro}</TableCellProfitPorcentage>
        </TableRow>
    );
}

type searchMethods = "nameSubgroup" | "codSubgroup"

export const SubgroupsPage: React.FC = () => {

    const context = useContext(DataContext)
    const navigate = useNavigate()
    const { subgroups, updateSubgroup } = context

    const [listSubgroups, setListSubgroups] = useState<ReturnType<typeof createData>[]>([])
    const [typeSearchMethod, setTypeSearchMethod] = useState<searchMethods>("nameSubgroup")


    useEffect(() => {

        const update = async () => {
            if (localStorage.getItem('token')) {
                updateSubgroup()
            } else {
                goLoading(navigate)
            }
        }

        update()

    }, [])

    useEffect(() => {
        const newRows = subgroups.map((item) => {
            const row: ReturnType<typeof createData> = {
                collapseData: {
                    amountCost: item.amountCost,
                    amountDiscount: item.amountDiscount,
                    amountFixed: item.amountFixed,
                    amountInvoicing: item.amountInvoicing,
                    amountQuantity: item.amountQuantity,
                    amountQuantityReturned: item.amountQuantityReturned,
                    amountVariableExpense: item.amountVariableExpense,
                    costPercentage: item.costPercentage,
                    discountPercentage: item.discountPercentage,
                    fixedExpensePercentage: item.fixedExpensePercentage,
                    invoicingPercentage: item.invoicingPercentage,
                    subgroupProfit: item.subgroupProfit,
                    subgroupProfitPercentage: item.subgroupProfitPercentage,
                    updatedAt: item.updatedAt
                },
                fixedUnitExpense: item.fixedUnitExpense,
                nameSubgroup: item.nameSubgroup,
                plucro: item.plucro,
                codSubgroup: item.codSubgroup,
            }

            return row
        })

        setListSubgroups([...newRows])

    }, [subgroups])

    const [form, onChange] = useForm(
        {
            search: ""
        }
    )

    const filterListSubgroups = (event: ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value

        const newList: Subgroup[] = subgroups.filter((subgroup) => {

            if (typeSearchMethod === "nameSubgroup") {
                return subgroup.nameSubgroup.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
            } else {
                return subgroup.codSubgroup.toString().includes(search)
            }
        })

        setListSubgroups(newList.map((item) => {
            const row: ReturnType<typeof createData> = {
                collapseData: {
                    amountCost: item.amountCost,
                    amountDiscount: item.amountDiscount,
                    amountFixed: item.amountFixed,
                    amountInvoicing: item.amountInvoicing,
                    amountQuantity: item.amountQuantity,
                    amountQuantityReturned: item.amountQuantityReturned,
                    amountVariableExpense: item.amountVariableExpense,
                    costPercentage: item.costPercentage,
                    discountPercentage: item.discountPercentage,
                    fixedExpensePercentage: item.fixedExpensePercentage,
                    invoicingPercentage: item.invoicingPercentage,
                    subgroupProfit: item.subgroupProfit,
                    subgroupProfitPercentage: item.subgroupProfitPercentage,
                    updatedAt: item.updatedAt
                },
                fixedUnitExpense: item.fixedUnitExpense,
                nameSubgroup: item.nameSubgroup,
                plucro: item.plucro,
                codSubgroup: item.codSubgroup,
            }

            return row
        }))
    }

    return (
        <Main>
            <ContainerSearch>
                <Search 
                    placeholder='Buscar'
                    id='search'
                    name='search'
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); filterListSubgroups(event)}}
                    value={form.search}
                />
            </ContainerSearch>
            <TableWrapper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCellCod>Código</TableCellCod>
                            <TableCellDescription>Descrição</TableCellDescription>
                            <TableCellFixedExpense>Des. Fixa (R$)</TableCellFixedExpense>
                            <TableCellProfitPorcentage>Lucro (%)</TableCellProfitPorcentage>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listSubgroups.map((row) => (
                            <Row key={row.codSubgroup} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
        </Main>

    )
}

