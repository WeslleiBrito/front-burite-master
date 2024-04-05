import React, { ChangeEvent, useEffect, useState } from 'react';
import { useContext } from "react";
import { DataContext } from '../../context/dataContext'
import { useNavigate } from "react-router-dom";
import { goLoading } from '../../Routes/coordinator';
import { Subgroup } from '../../types/type';
import { useForm } from '../../hooks/useForm';
import { Box, 
    IconButton, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead,
    TableRow,
    Paper, 
    TextField
} from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material'


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
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="right">{row.codSubgroup}</TableCell>
                <TableCell component="th" scope="row">{row.nameSubgroup}</TableCell>
                <TableCell align="right">{row.fixedUnitExpense}</TableCell>
                <TableCell align="right">{row.plucro}</TableCell>
            </TableRow>
            
        </React.Fragment>
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
        <Box>
            <TextField
                component={Paper}
                placeholder='Buscar'
                id='search'
                name='search'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); filterListSubgroups(event)}}
                value={form.search}
            />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Código</TableCell>
                            <TableCell align="left">Descrição</TableCell>
                            <TableCell align="right">Despesa Fixa (R$)</TableCell>
                            <TableCell align="right">Lucro (%)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listSubgroups.map((row) => (
                            <Row key={row.codSubgroup} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    )
}

