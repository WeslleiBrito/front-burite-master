import { NavigateFunction } from 'react-router-dom';

export const goSubgroups = (navigate: NavigateFunction): void => {
    navigate('/subgroups')
}

export const goLoading = (navigate: NavigateFunction): void => {
    navigate('/')
}

export const goCreatePrice = (navigate: NavigateFunction, nf: string): void => {
    navigate(`/create-price/${nf}`)
}

export const goListShopping = (navigate: NavigateFunction): void => {
    navigate('/list-shopping')
}