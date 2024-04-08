import { Router } from './Routes/Router';
import { GlobalDataProvider } from './context/globalData';
import { GlobalStyle } from './globalStyled';

function App() {

  return (
    <GlobalDataProvider>
      <GlobalStyle/>
      <Router />
    </GlobalDataProvider>
  )
}

export default App
