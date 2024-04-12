import React, { useEffect, useState } from "react";
import { NfPurchase } from "../../types/type";
import axios, {AxiosError} from "axios";
import { BASE_URL_LOCAL } from "../../constants/BASE_URL";
import { useParams } from "react-router-dom";

export const CreatePrice: React.FC = () => {

    const [nf, setNf] = useState<NfPurchase>()
    
    const pathParams = useParams();

    useEffect(() => {
        const getNf = async () => {
            try {
             
                const result = await axios.post(BASE_URL_LOCAL + `/price-formation/${pathParams.nf}`)
                setNf({...result.data})

            } catch (error) {
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

        getNf()
    }, [])

    useEffect(() => {console.log(nf)}, [nf])
    
    return (<></>)
}