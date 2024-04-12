import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignInSide } from '../Pages/Login/Login'
import { SubgroupsPage } from '../Pages/Subgroups/SubgroupPage'
import { ShoopingListPage } from '../Pages/ShoppingList/ShoppingListPage'
import { CreatePrice } from '../Pages/CreatePrice/CreatePricePage'



export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignInSide/>} />
                <Route path='/subgroups' element={<SubgroupsPage/>}/>
                <Route path='/list-shopping' element={<ShoopingListPage/>}/>
                <Route path='/create-price/:nf' element={<CreatePrice/>}/>
                <Route path='*' element={<>Nada Por Aqui!</>}/>
            </Routes>
        </BrowserRouter>
    )
}