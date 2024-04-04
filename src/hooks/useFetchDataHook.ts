import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BASE_URL_REMOTE } from '../constants/BASE_URL'

export interface UseFetch {
    usersNameAPI: string[],
    loading: boolean,
    error: boolean,
    setLoading: Function,
    setError: Function
}


export const useFachtData = (): UseFetch => {

    const [ usersNameAPI, setUsersName ] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    try {
        
        useEffect(() => {

                const getDatas = async () => {
                    const names = await axios.get(BASE_URL_REMOTE + '/users')
                    setUsersName(names.data)
                    setLoading(false)
                }

                getDatas()
        }, [])

    } catch (error) {
        setLoading(false)
        setError(true)

        if (error instanceof AxiosError) {
            console.log(error.response?.status);
        }
    }

    return {
        usersNameAPI,
        loading,
        error,
        setLoading,
        setError
    }

}