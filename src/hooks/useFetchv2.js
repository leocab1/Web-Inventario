export const useFetchv2 = () => {

    //Metodo Get
    const getData = async (url) => {
        const request = fetch(url, {
            method: "get",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        });
        if (!request.ok)
            return {
                error: true,
                message: "Ocurrio un error"
            }
        else
            return {
                error: false,
                message: "Respuesta exitosa",
                data: await request.json()
            }
    }

    //Metodo Post
    const setData = async (url, data) => {
        const request = fetch(url, {
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            body: JSON.stringify(data)
        });
        if (!request.ok)
            return {
                error: true,
                message: "Ocurrio un error"
            }
        else
            return {
                error: false,
                message: "Respuesta exitosa",
                data: await request.json()
            }
    }

    //Metodo Put
    const updateData = async (url, data) => {
        const request = fetch(url, {
            method: "update",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            body: JSON.stringify(data)
        });
        if (!request.ok)
            return {
                error: true,
                message: "Ocurrio un error"
            }
        else
            return {
                error: false,
                message: "Respuesta exitosa",
                data: await request.json()
            }
    }

    //Metodo Delete
    const deleteData = async (url) => {
        const request = fetch(url, {
            method: "delete",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        });
        if (!request.ok)
            return {
                error: true,
                message: "Ocurrio un error"
            }
        else
            return {
                error: false,
                message: "Respuesta exitosa",
                data: await request.json()
            }
    }

    return (
        getData,
        setData,
        updateData,
        deleteData
    )
}