export const useFetchv2 = () => {
    
    const getData = async (url) => {
        try {
            const request = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!request.ok) {
                return {
                    error: true,
                    message: `Error HTTP ${request.status}: ${request.statusText}`,
                };
            }

            const data = await request.json();
            return {
                error: false,
                message: "Respuesta exitosa",
                data,
            };
        } catch (error) {
            console.error('Error en la solicitud GET:', error);
            return {
                error: true,
                message: "Ocurrió un error en la solicitud GET",
            };
        }
    };

    // Método POST
    const setData = async (url, data) => {
        try {
            console.log('URL de la solicitud:', url);
            console.log('Datos enviados:', JSON.stringify(data));

            const request = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!request.ok) {
                return {
                    error: true,
                    message: `Error HTTP ${request.status}: ${request.statusText}`,
                };
            }

            const responseData = await request.json();
            return {
                error: false,
                message: "Respuesta exitosa",
                data: responseData,
            };
        } catch (error) {
            console.error('Error en la solicitud POST:', error);
            return {
                error: true,
                message: "Ocurrió un error en la solicitud POST",
            };
        }
    };

    // Método PUT
    const updateData = async (url, data) => {
        try {
            const request = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!request.ok) {
                return {
                    error: true,
                    message: `Error HTTP ${request.status}: ${request.statusText}`,
                };
            }

            const responseData = await request.json();
            return {
                error: false,
                message: "Respuesta exitosa",
                data: responseData,
            };
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
            return {
                error: true,
                message: "Ocurrió un error en la solicitud PUT",
            };
        }
    };

    // Método DELETE
    const deleteData = async (url) => {
        try {
            const request = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Intentar obtener el cuerpo JSON solo si la respuesta es válida
            let responseData = null;
            if (request.ok) {
                try {
                    responseData = await request.json();
                } catch (e) {
                    responseData = null; // Si no hay cuerpo JSON
                }
            }

            return {
                error: !request.ok,
                message: request.ok ? "Respuesta exitosa" : `Error HTTP ${request.status}: ${request.statusText}`,
                data: responseData,
            };
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
            return {
                error: true,
                message: "Ocurrió un error en la solicitud DELETE",
            };
        }
    };

    return {
        getData,
        setData,
        updateData,
        deleteData,
    };
};
