import { Router } from './Routes/Router';
import { GlobalDataProvider } from './context/globalData';

function App() {

  return (
    <GlobalDataProvider>
      <Router />
    </GlobalDataProvider>
  )
}

export default App
