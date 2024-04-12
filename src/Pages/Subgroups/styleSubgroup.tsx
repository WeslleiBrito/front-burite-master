import {styled} from 'styled-components'

export const Main = styled.main`
`
export const ContainerSearch = styled.div`
    width: 55.5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6vh;
    font-size: 0.7vh;
    margin-bottom: 1vh;
    margin-left: 0.3vw;
`
export const Search = styled.input.attrs({type: 'text', autoComplete: "off"})`
    height: 100%;
    width: 100%;
    padding-left: 0.5vw;
`

export const TableWrapper = styled.div`
`;

export const Table = styled.table`
  border-collapse: collapse;
  
`;

export const TableHead = styled.thead`
   display: flex;
`
export const TableBody = styled.tbody`
    display: flex;
    flex-direction: column;
    height: 80vh;
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
  margin-top: 0.5vh;
  background-color: rgb(135,206,250, 0.5);
  user-select: none;
  &:hover {
      box-shadow: inset 1px 0 0 rgba(255,255,255,0.2), inset -1px 0 0 rgba(255,255,255,0.2), 0 0 4px 0 rgba(95,99,104,.6), 0 0 6px 2px rgba(95,99,104,.6);
      z-index: 1;
  }
`


export const TableCellCod = styled.td`
  width: 6vw;
  padding: 8px;
  text-align: left;
  height: 1.5vh;
  
`;

export const TableCellDescription = styled.td`
  width: 35vw;
  padding: 8px;
  text-align: left;
  height: 1.5vh;
`;

export const TableCellFixedExpense = styled.td`
  width: 7vw;
  padding: 8px;
  text-align: left;
  height: 1.5vh;

`;

export const TableCellProfitPorcentage = styled.td`
  width: 7vw;
  padding: 8px;
  text-align: left;
  height: 1.5vh;
`;


