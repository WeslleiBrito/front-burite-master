import React, { ReactNode, useEffect, useState } from 'react'
import { ContextInterface, ListShopping, Subgroup } from '../types/type'
import { DataContext } from './dataContext'
import { useFachtData } from '../hooks/useFetchDataHook'
import axios, { AxiosError }  from 'axios';
import { BASE_URL_LOCAL } from '../../src/constants/BASE_URL'


interface DataContextProps {
    children: ReactNode
}

export const GlobalDataProvider: React.FC<DataContextProps> = (props) => {

    const {error, loading, usersNameAPI, setLoading, setError} = useFachtData()
    const [usersName, setUsersName] = useState<string[]>([])
    const [subgroups, setSubgroups] = useState<Subgroup[]>([])
    const [shoppingList, setShoppingList] = useState<ListShopping[]>([])
    
    useEffect(() => setUsersName([...usersNameAPI]), [usersNameAPI])

    const updateSubgroup = async () => {

        try {
            setLoading(true)
            const result = await axios.get(BASE_URL_LOCAL + '/subgroup', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            setSubgroups([...result.data])
            setLoading(false)
        } catch (error) {     
           setError(true)
           setLoading(false)

            if(error instanceof AxiosError){
                console.log("Erro do axios", error);
                
                if(error.response?.status === 401){
                    localStorage.removeItem('token')
                }
            }else{
                console.log(error)
            }
        }
    }

    const updatedShoppingList = async () => {

        try {
            setLoading(true)
            const result = await axios.get(BASE_URL_LOCAL + '/price-formation')

            setShoppingList([...result.data])
            setLoading(false)
        } catch (error) {     
           setError(true)
           setLoading(false)

            if(error instanceof AxiosError){
                console.log("Erro do axios");
            }else{
                console.log(error)
            }
        }
    }

    const context: ContextInterface = {
        usersName,
        error,
        loading,
        updateSubgroup,
        subgroups,
        updatedShoppingList,
        shoppingList
    }

    return <DataContext.Provider value={context}>{props.children}</DataContext.Provider>
}