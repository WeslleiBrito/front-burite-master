import { useContext, useEffect } from "react";
import { DataContext } from '../../context/dataContext'
import { useNavigate } from "react-router-dom";
import { goCreatePrice, goLoading } from "../../Routes/coordinator";
import { ContainerSearch, Main, Search, Table, TableBody, TableHead, TableWrapper,  TableRow} from "../Subgroups/styleSubgroup";
import { ListShopping } from "../../types/type";
import { CodNF, Provider, PurchaseDate, PurchaseValue, TableRowHeader } from "./styleShoopingListPage";



const createShoppingList = (input: ListShopping) => {
    const {date, nf, provider, value} = input

    return {
        date,
        nf,
        provider,
        value
    }
}

export const ShoopingListPage: React.FC = () => {

    const context = useContext(DataContext)
    const navigate = useNavigate()
    const { shoppingList, updatedShoppingList} = context

    useEffect(() => {
        if(localStorage.getItem('token')){
            updatedShoppingList()
        }else{
            goLoading(navigate)
        }
    }, [])

    const Row = (props: {row: ReturnType<typeof createShoppingList>}): JSX.Element => {

        const {row} = props

        const date = new Date(row.date)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        const dateFormated = `${day}/${month}/${year}`

        return (
            <TableRow onClick={() => {goCreatePrice(navigate, row.nf)}}>
                <CodNF>{row.nf}</CodNF>
                <Provider>{row.provider}</Provider>
                <PurchaseDate>{dateFormated}</PurchaseDate>
                <PurchaseValue>{row.value}</PurchaseValue>
            </TableRow>
        )
    }

    return(
        <Main>
            <ContainerSearch>
                <Search 
                    placeholder='Buscar'
                    id='search'
                    name='search'  
                />
            </ContainerSearch>
            <TableWrapper>
                <Table>
                    <TableHead>
                        <TableRowHeader>
                            <CodNF>Número</CodNF>
                            <Provider>Fornecedor</Provider>
                            <PurchaseDate>Data</PurchaseDate>
                            <PurchaseValue>Total</PurchaseValue>
                        </TableRowHeader>
                    </TableHead>
                    <TableBody>
                        {
                            shoppingList.map((row) => {
                                return(
                                    <Row key={row.nf} row={row}/>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableWrapper>
        </Main>
    )
}