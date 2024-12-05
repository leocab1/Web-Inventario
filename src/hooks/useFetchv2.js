// useFetchv2.jsx

export const useFetchv2 = () => {
    const makeRequest = async (url, method, data = null) => {
        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            if (data) options.body = JSON.stringify(data);

            const response = await fetch(url, options);

            let responseData = null;

            if (response.ok) {
                try {
                    const contentType = response.headers.get("Content-Type");
                    // Si la respuesta es JSON
                    if (contentType && contentType.includes("application/json")) {
                        responseData = await response.json(); // Parsear como JSON
                    } else {
                        responseData = await response.text(); // Parsear como texto plano si no es JSON
                    }
                } catch {
                    responseData = null; // Si no se puede parsear, asignar null
                }
            }

            return {
                error: !response.ok,
                message: response.ok
                    ? "Respuesta exitosa"
                    : `Error HTTP ${response.status}: ${response.statusText}`,
                data: responseData,
            };
        } catch (error) {
            console.error(`Error en la solicitud ${method}:`, error);
            return {
                error: true,
                message: `Ocurrió un error en la solicitud ${method}`,
            };
        }
    };

    // Métodos específicos para manejar distintos tipos de solicitud
    const getData = (url) => makeRequest(url, "GET");
    const setData = (url, data) => makeRequest(url, "POST", data);
    const updateData = (url, data) => makeRequest(url, "PUT", data);
    const deleteData = (url) => makeRequest(url, "DELETE");

    return {
        getData,
        setData,
        updateData,
        deleteData,
    };
};
