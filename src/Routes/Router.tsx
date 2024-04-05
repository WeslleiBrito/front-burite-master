import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignInSide } from '../Pages/Login/Login'
import { SubgroupsPage } from '../Pages/Subgroups/SubgroupPage'



export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignInSide/>} />
                <Route path='/subgroups' element={<SubgroupsPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}