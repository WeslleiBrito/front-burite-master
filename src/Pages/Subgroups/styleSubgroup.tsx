import {styled} from 'styled-components'

export const Main = styled.main`
    width: 98vw;
`
export const ContainerSearchSubgroup = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    height: 10vh;
`
export const SearchSubgroup = styled.input.attrs({type: 'text', autoComplete: "off"})`
    width: 100%;
    height: 6vh;
`

export const TableWrapper = styled.div`
  width: 100%;
`;

export const Table = styled.table`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const TableHead = styled.thead`
   display: flex;
   width: 100%; 
`
export const TableBody = styled.tbody`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 80vh;
    overflow-y: auto;
`
export const TableRow = styled.tr`
    width: 100%;
`


export const TableCellCod = styled.td`
  width: 7vw;
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
  height: 1.5vh;
`;

export const TableCellDescription = styled.td`
  width: 63vw;
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
  height: 1.5vh;
`;

export const TableCellFixedExpense = styled.td`
  width: 15vw;
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
  height: 1.5vh;
`;

export const TableCellProfitPorcentage = styled.td`
  width: 10vw;
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
  height: 1.5vh;
`;


