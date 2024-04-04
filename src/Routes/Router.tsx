import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignInSide } from '../Pages/Login/Login'



export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignInSide />} />
            </Routes>
        </BrowserRouter>
    )
}