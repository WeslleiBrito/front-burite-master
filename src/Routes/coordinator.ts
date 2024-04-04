import { NavigateFunction } from 'react-router-dom';

export const goSubgroups = (navigate: NavigateFunction): void => {
    navigate('/subgroups')
}

export const goLoading = (navigate: NavigateFunction): void => {
    navigate('/')
}