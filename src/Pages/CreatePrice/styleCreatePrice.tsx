import styled from "styled-components";

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
`

export const TableWrapper = styled.div``

export const Table = styled.table`
    border-collapse: collapse;
    width: 100vw;
`

export const TableHead = styled.thead``

export const TableBody = styled.tbody`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
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

export const TableRow = styled.tr`
    display: flex;
    width: 100%;
`

export const CodeProduct = styled.td`
    width: 4vw;
    text-align: center;
    background-color: orange;
`

export const Description = styled.td`
    width: 35vw;
    text-align: start;
    background-color: cyan;
`

export const Quantity = styled.td`
    width: 5.5vw;
    background-color: #4682B4;
`

export const Cost = styled.td`
    width: 5vw;
    background-color: #00FF7F;
`

export const ExpenseFixed = styled.td`
    width: 7vw;
    background-color: #FF8C00;
`

export const ExpenseVariable = styled.td`
    width: 5vw;
    background-color: #D8BFD8;
`

export const Commission = styled.td`
    display: flex;
    width: 8vw;
    justify-content: center;
    background-color: #EEE8AA;
`

export const Profit = styled.td`
    display: flex;
    width: 8vw;
    justify-content: center;
    background-color: #0000CD;
`

export const Discount = styled.td`
    display: flex;
    width: 8vw;
    justify-content: center;
    background-color: #F08080;
`

export const SalePrice = styled.td`
    display: flex;
    width: 6vw;
`

export const InputCommissionPorcentage = styled.input.attrs({type: "number"})`
    width: 45%;
`

export const InputCommissionValue = styled.input.attrs({type: "number"})`
    width: 45%;
`

export const InputDiscountValue = styled.input.attrs({type: "number"})`
    width: 45%;
`

export const InputDiscountPorcentage = styled.input.attrs({type: "number"})`
     width: 45%;
`

export const InputProfitPorcentage = styled.input.attrs({type: "number"})`
     width: 45%;
`

export const InputProfitValue = styled.input.attrs({type: "number"})`
     width: 45%;
`

export const InputPrice = styled.input.attrs({type: "number"})`
     width: 90%;
`
