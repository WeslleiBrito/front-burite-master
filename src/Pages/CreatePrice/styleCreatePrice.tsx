import styled from "styled-components";
import { Button } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';

type ConfigStyle = {
    styleItem?: boolean
}

type ConfigTableRow = {
    isFocusedItem: boolean
}

export const ButtonUpdate = (titleButton: string, createPriceProduct: Function) => {
    return (
        <Button
            variant="contained"
            endIcon={<UpdateIcon />}
            onClick={() => { createPriceProduct() }}
            style={{
                width: "10vw"
            }}
        >
            {titleButton}
        </Button>
    )
}
export const Header = styled.header``

export const LableCodeNf = styled.label``

export const LableProvider = styled.label``

export const LableDatePurchase = styled.label``

export const LableValuePurchse = styled.label``

export const CodeNf = styled.p``

export const Provider = styled.p``

export const DatePurchase = styled.p``

export const ValuePurchase = styled.p``

export const Main = styled.main`
    height: 100%;
    width: 100%;
    padding-left: 1vw;
 
`

export const TableWrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`

export const Table = styled.table`
    border-collapse: collapse;
`

export const TableHead = styled.thead``

export const RowHead = styled.tr`
    display: flex;
    width: 95vw;
    font-weight: 700;
    text-align: center;
`

export const TableBody = styled.tbody`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
    width: 1vw; /* Largura da barra de rolagem */
    
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Cor de fundo da barra de rolagem */
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888; /* Cor do controle da barra de rolagem */
    border-radius: 6px; /* Borda do controle da barra de rolagem */
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Cor do controle da barra de rolagem ao passar o mouse */
  }
`

export const TableRow = styled.tr<ConfigTableRow>`
    display: flex;
    width: 95vw;
    font-weight: 500;
    font-size: 2.5vh;
    text-align: center;
    border: 1px solid #f1f1f1;
    height: 6.5vh;
    align-items: center;
    margin-bottom: 0.3vh;
    justify-content: space-around;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    box-shadow: ${props => props.isFocusedItem ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'};
    &:hover {
    }

`

export const CodeProduct = styled.td`
    width: 4.5vw;
    text-align: center;
    height: 4vh;
    margin-right: 1vw;
`

export const Description = styled.td`
    width: 45vw;
    height: 4vh;
    text-align: start;
`

export const Quantity = styled.td`
    width: 6vw;
`

export const Cost = styled.td`
    width: 5vw;
`

export const ExpenseFixed = styled.td`
    width: 6vw;
`

export const ExpenseVariable = styled.td`
    width: 5vw;
`

export const Commission = styled.td<ConfigStyle>`
    display: flex;
    width: 8vw;
    justify-content: space-around;
    padding: 0.5vh;
    background-color: ${props => props.styleItem ? 'whitesmoke' : "none"};
    border-radius: 0.2vw;
    margin-right: 1vw;
`

export const Profit = styled.td<ConfigStyle>`
    display: flex;
    width: 9vw;
    justify-content: space-around;
    padding: 0.5vh;
    background-color: ${props => props.styleItem ? 'whitesmoke' : "none"};
    border-radius: 0.2vw;
    margin-right: 1vw;
`

export const Discount = styled.td<ConfigStyle>`
    display: flex;
    width: 9vw;
    justify-content: space-around;
    padding: 0.5vh;
    background-color: ${props => props.styleItem ? 'whitesmoke' : "none"};
    border-radius: 0.2vw;
    margin-right: 1vw;
`

export const SalePrice = styled.td`
    display: flex;
    justify-content: center;
    width: 5vw;
    align-items: center;
`
export const DiscountValue = styled.p`
    width: 3.5vw;
    color: coral;
`
export const CommissionValue = styled.p`
    width: 3.5vw;
    color: coral;
`
export const InputCommissionPorcentage = styled.input.attrs({ type: "number" })`
    width: 3.5vw;
    &:focus {
        outline: none;
    };
    input[type="number"]&::-webkit-inner-spin-button,
    input[type="number"]&::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    };
    height: 4vh;
  
`

export const InputDiscountPorcentage = styled.input.attrs({ type: "number" })`
    width: 4vw;
    &:focus {
        outline: none;
    };
    input[type="number"]&::-webkit-inner-spin-button,
    input[type="number"]&::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    };
    height: 4vh;
`

export const InputProfitPorcentage = styled.input.attrs({ type: "number" })`
    width: 3.5vw;
    input[type="number"]&::-webkit-inner-spin-button,
    input[type="number"]&::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    };
    height: 4vh;
`

export const InputProfitValue = styled.input.attrs({ type: "number" })`
    width: 3.5vw;
    &:focus {
        outline: none;
    };
    input[type="number"]&::-webkit-inner-spin-button,
    input[type="number"]&::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    };
    height: 4vh;
`

export const InputPrice = styled.input.attrs({ type: "number" })`
    width: 4vw;
    &:focus {
        outline: none;
    };
    input[type="number"]&::-webkit-inner-spin-button,
    input[type="number"]&::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    };
    height: 3.5vh;
`
