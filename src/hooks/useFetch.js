import { useEffect, useState } from "react"
export const useFetch = (url,metodo,obj) => {
    
    const [state,setState]=useState({
        data: null,
        isLoading:true,
        hasError:false,
        error:null
    });
    const initState=() =>{
        setState({
            data:null,
            isLoading:true,
            hasError:false,
            error:null,
        });
    }
    useEffect(()=>{
        console.log('Realizando peticion...');
    },[])
    const getFetch =async()=>{
        const options ={
            method: metodo,
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: metodo=== 'POST' ||  metodo=== 'PUT' ||  metodo=== 'DELETE' ? JSON.stringify(obj) : null
        }
        const response =await fetch(url,options)
        console.log(response);
        if(!response.ok){
                setState({
                    data:null,
                    isLoading:false,
                    hasError:true,
                    error:{
                        code: response.status,
                        message:response.statusText,
                    }
                });
            return;
        }
        const data = await response.json();
        setState({
            data,
            isLoading:false,
            hasError:false,
            error: null,
        });
        
    }
  return (
    {
        data:state.data,
        isLoading:state.isLoading,
        hasError: state.hasError,
        error: state.error
    }
  )
}