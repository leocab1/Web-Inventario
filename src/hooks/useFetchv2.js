export const useFetchv2 = () => {
    // Método GET
    const getData = async (url) => {
        const request = fetch(url, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        });
        if (!request.ok)
            return {
                error: true,
                message: "Ocurrió un error"
            }
        else
            return {
                error: false,
                message: "Respuesta exitosa",
                data: await request.json()
            }
    }

    // Método POST
    const setData = async (url, data) => {
        const request = fetch(url, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            body: JSON.stringify(data)
        });
        if (!request.ok)
            return {
                error: true,
                message: "Ocurrió un error"
            }
        else
            return {
                error: false,
                message: "Respuesta exitosa",
                data: await request.json()
            }
    }

    // Método PUT
    const updateData = async (url, data) => {
        const request = fetch(url, {
            method: "PUT", // Corregido de "update" a "PUT"
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            body: JSON.stringify(data)
        });
        if (!request.ok)
            return {
                error: true,
                message: "Ocurrió un error"
            }
        else
            return {
                error: false,
                message: "Respuesta exitosa",
                data: await request.json()
            }
    }

    // Método DELETE
    const deleteData = async (url) => {
        const request = fetch(url, {
            method: "DELETE", // Corregido de "delete" a "DELETE"
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        });
        if (!request.ok)
            return {
                error: true,
                message: "Ocurrió un error"
            }
        else
            return {
                error: false,
                message: "Respuesta exitosa",
                data: await request.json()
            }
    }

    // Devolver los métodos como un objeto
    return {
        getData,
        setData,
        updateData,
        deleteData
    }
}
