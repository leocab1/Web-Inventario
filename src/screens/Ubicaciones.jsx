import { Footer, Menu, Navbar, Title } from "../components";
import React, { useState, useEffect } from 'react';
import QR from "../components/commons/QR";
import Swal from 'sweetalert2';

// Función para obtener ubicaciones
const obtenerUbicaciones = async () => {
    try {
        const response = await fetch('http://localhost/Inventario_Profe_Paulo/Api/ubicacion');
        if (response.ok) {
            const result = await response.json();
            console.log('Datos recibidos:', result);
            return result.data || [];
        } else {
            throw new Error('Error al obtener ubicaciones');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        return [];
    }
};

const eliminarUbicacion = async (id_ubicacion) => {
    try {
        const response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/ubicacion/${id_ubicacion}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Respuesta de la API:', data);  

            if (data.status === 'ok' && data.message === 'Ubicacion eliminada') {
                await Swal.fire({
                    icon: 'success',
                    title: '¡Ubicación eliminada!',
                    text: 'La ubicación se ha eliminado correctamente.',
                    showConfirmButton: false,
                    timer: 1000, 
                    position: 'top-end',
                    toast: true,
                    background: '#4BB543',
                    color: '#fff',  
                });
                return true;  
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema al eliminar la ubicación. Por favor, inténtelo de nuevo.',
                    showConfirmButton: true,
                    position: 'center',
                    background: '#F8D7DA',  // Fondo rojo claro
                    color: '#721C24',  // Color del texto rojo
                    showClass: {
                        popup: 'animate__animated animate__shakeX'  // Animación de sacudida para el error
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOut'
                    }
                });
                return false;  // Hubo un error al eliminar
            }
        } else {
            await Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: `Código de estado HTTP no es OK: ${response.status}`,
                showConfirmButton: true,
                position: 'center',
                background: '#F8D7DA',
                color: '#721C24',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOut'
                }
            });
            return false;
        }
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'Hubo un problema al conectar con el servidor.',
            showConfirmButton: true,
            position: 'center',
            background: '#F8D7DA',
            color: '#721C24',
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOut'
            }
        });
        console.error('Error de conexión:', error);
        return false;
    }
};




// Función para enviar una nueva ubicación
const enviarUbicacion = async (formData) => {
    try {
        const response = await fetch('http://localhost/Inventario_Profe_Paulo/Api/ubicacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error al agregar ubicación');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        throw error;
    }
};

// Validación del formulario
const validarFormulario = (formData) => {
    if (!formData.edificio || !formData.departamento || !formData.area) {
        return false;
    }
    return true;
};

export const Ubicaciones = () => {
    const [showModal, setShowModal] = useState(false);
    const [qrData, setQrData] = useState('');
    const [formData, setFormData] = useState({
        edificio: "",
        departamento: "",
        area: "",
    });
    const [ubicaciones, setUbicaciones] = useState([]);
    const [currentId, setCurrentId] = useState(null); 
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUbicaciones = async () => {
            const data = await obtenerUbicaciones();
            console.log('Datos recibidos:', data);
            setUbicaciones(data);
        };
        fetchUbicaciones();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            edificio: "",
            departamento: "",
            area: "",
        });
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormulario(formData)) {
            Swal.fire({
                icon: 'warning',
                title: 'Formulario incompleto',
                text: 'Por favor complete todos los campos antes de continuar.',
            });
            return;
        }

        try {
            if (isEditing) {
                const updatedUbicacion = await actualizarUbicacion(formData);
                if (updatedUbicacion && updatedUbicacion.status === 'ok') {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Ubicación actualizada!',
                        text: 'La ubicación se ha actualizado correctamente.',
                        toast: true,
                        position: 'top-end',
                        timer: 2500,
                    });
                    setFormData({
                        edificio: "",
                        departamento: "",
                        area: "",
                    });
                    const updatedUbicaciones = await obtenerUbicaciones();
                    setUbicaciones(updatedUbicaciones);
                    setIsEditing(false);
                } else {
                    throw new Error('La respuesta de la API no contiene los datos correctos.');
                }
            } else {
                const newUbicacion = await enviarUbicacion(formData);
                if (newUbicacion && newUbicacion.status === 'ok') {
                    const qrContent = JSON.stringify({
                        edificio: formData.edificio,
                        departamento: formData.departamento,
                        area: formData.area,
                    });
                    setQrData(qrContent); 
                    Swal.fire({
                        icon: 'success',
                        title: '¡Ubicación agregada!',
                        text: 'La ubicación se ha agregado correctamente.',
                        toast: true,
                        position: 'top-end',
                        timer: 2500,
                    });
                    setFormData({
                        edificio: "",
                        departamento: "",
                        area: "",
                    });
                    const updatedUbicaciones = await obtenerUbicaciones();
                    setUbicaciones(updatedUbicaciones);
                } else {
                    throw new Error('La respuesta de la API no contiene los datos correctos.');
                }
            }
        } catch (error) {
            console.error('Error al procesar la ubicación:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Hubo un problema al procesar la ubicación: ${error.message}`,
            });
        }
    };

    const actualizarUbicacion = async (formData) => {
        try {
            const response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/ubicacion/${currentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Error al actualizar ubicación');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            throw error;
        }
    };

   
    const handleDelete = async (id_ubicacion) => {
        // Llamamos a la función de eliminación
        const isDeleted = await eliminarUbicacion(id_ubicacion);
        
        // Si la eliminación fue exitosa, actualizamos el estado
        if (isDeleted) {
            try {
                const updatedUbicaciones = await obtenerUbicaciones();
                setUbicaciones(updatedUbicaciones); // Actualizamos las ubicaciones
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar las ubicaciones actualizadas. Intente de nuevo.',
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al eliminar la ubicación. Por favor, inténtelo de nuevo.',
            });
        }
    };
    
    
    
    

    const handleEdit = (ubicacion) => {
        setIsEditing(true);
        const updatedFormData = {
            id_ubicacion: ubicacion.id_ubicacion,
            edificio: ubicacion.edificio,
            departamento: ubicacion.departamento,
            area: ubicacion.area,
        };
        setFormData(updatedFormData);
        setCurrentId(ubicacion.id_ubicacion);
    };

    return (
        <>
            <Navbar />
            <Menu nombre="Invecastor" usuario="Castorcito uwu" />
            <div className="content-wrapper">
                <Title title="Ubicaciones" breadcrums={["Personas", "Menú"]} />
                <section className="content">
                    <div className="row">
                        <div className="col-4">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Agregar Ubicación</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Edificio(s)</label>
                                            <input
                                                name="edificio"
                                                className="form-control"
                                                placeholder="D-5"
                                                value={formData.edificio}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Departamento</label>
                                            <input
                                                name="departamento"
                                                className="form-control"
                                                placeholder="D-5"
                                                value={formData.departamento}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Área</label>
                                            <input
                                                name="area"
                                                className="form-control"
                                                placeholder="TICS"
                                                value={formData.area}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block">
                                                {isEditing ? 'Actualizar Ubicación' : 'Agregar Ubicación'}
                                            </button>
                                            <div className="mt-3">
                                            {qrData && <QR value={qrData} />}
                                        </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Ubicaciones Registradas</h3>
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Edificio</th>
                                                <th>Departamento</th>
                                                <th>Área</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ubicaciones.map((ubicacion) => (
                                                <tr key={ubicacion.id_ubicaciones}>
                                                    <td>{ubicacion.edificio}</td>
                                                    <td>{ubicacion.departamento}</td>
                                                    <td>{ubicacion.area}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning"
                                                            onClick={() => handleEdit(ubicacion)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                className="btn btn-danger"
                onClick={() => {
                    console.log('Eliminando ubicación con ID:', ubicacion.id_ubicacion);  // Verifica que el ID esté bien
                    handleDelete(ubicacion.id_ubicacion);
                }}
            >
                Eliminar
            </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};
