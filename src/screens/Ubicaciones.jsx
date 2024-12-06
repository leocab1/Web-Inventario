import { DTable, Footer, Menu, Navbar, Title } from "../components";
import React, { useState, useEffect } from 'react';
import QR from "../components/commons/QR";
import EliminarB from "./Deleteb";
import Editar from "./edit";
import Swal from 'sweetalert2';
import { Enviar } from '../screens/Enviar';

const columnas = [
    { name: 'Identificador', selector: row => row.matricula },
    { name: 'Edificio', selector: row => row.edificio },
    { name: 'Departamento', selector: row => row.departamento },
    { name: 'Área', selector: row => row.area },
    {
        name: 'Opciones',
        selector: row => row.action,
        cell: (props) => (
            <>
                <Editar onClick={() => handleEdit(props)} />
                <EliminarB onClick={() => handleDelete(props)} />
            </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
    },
];

// Funciones para obtener, editar y eliminar ubicaciones

const obtenerUbicaciones = async () => {
    try {
        const response = await fetch('http://localhost/Inventario_Profe_Paulo/Api/ubicacion');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al obtener ubicaciones');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        return [];
    }
};

const eliminarUbicacion = async (id) => {
    try {
        const response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/ubicacion/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Ubicación eliminada!',
                text: 'La ubicación ha sido eliminada correctamente.',
                toast: true,
                position: 'top-end',
                timer: 2500,
            });
            return true;
        } else {
            throw new Error('Error al eliminar ubicación');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al eliminar la ubicación.',
        });
        return false;
    }
};

const editarUbicacion = async (id, formData) => {
    try {
        const response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/ubicacion/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Ubicación actualizada!',
                text: 'La ubicación se ha actualizado correctamente.',
                toast: true,
                position: 'top-end',
                timer: 2500,
            });
            return true;
        } else {
            throw new Error('Error al actualizar ubicación');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar la ubicación.',
        });
        return false;
    }
};

// Funciones de manejo de formulario

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
            return await response.json(); // Si es exitoso, retornar la respuesta del servidor
        } else {
            throw new Error('Error al agregar ubicación');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        throw error; // Lanza el error para que lo maneje quien llame a esta función
    }
};

const validarFormulario = (formData) => {
    if (!formData.edificio || !formData.departamento || !formData.area) {
        return false; // Si falta algún campo, retornar false
    }
    return true; // Si todo está completo, retornar true
};

export const Ubicaciones = () => {
    const [showModal, setShowModal] = useState(false);
    const [qrData, setQrData] = useState('');
    const [formData, setFormData] = useState({
        edificio: "",
        departamento: "",
        area: "",
    });
    const [ubicaciones, setUbicaciones] = useState([]); // Estado para las ubicaciones

    useEffect(() => {
        const fetchUbicaciones = async () => {
            const data = await obtenerUbicaciones();
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
            await enviarUbicacion(formData);

            Swal.fire({
                icon: 'success',
                title: '¡Ubicación agregada!',
                text: 'La ubicación se ha agregado correctamente.',
                toast: true,
                position: 'top-end',
                timer: 2500,
            });

            // Restablecer los datos del formulario y actualizar la lista de ubicaciones
            setFormData({
                edificio: "",
                departamento: "",
                area: "",
            });

            const updatedUbicaciones = await obtenerUbicaciones();
            setUbicaciones(updatedUbicaciones);

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Hubo un problema al agregar la ubicación: ${error.message}`,
            });
        }
    };

    const handleDelete = async (ubicacion) => {
        const isDeleted = await eliminarUbicacion(ubicacion.id);
        if (isDeleted) {
            const updatedUbicaciones = await obtenerUbicaciones();
            setUbicaciones(updatedUbicaciones);
        }
    };

    const handleEdit = async (ubicacion) => {
        const updatedFormData = {
            edificio: ubicacion.edificio,
            departamento: ubicacion.departamento,
            area: ubicacion.area,
        };
        setFormData(updatedFormData);
        setShowModal(true);
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
                                        <div className="modal-footer justify-content-between">
                                            <button className="btn-cancel" onClick={handleCloseModal}>
                                                Cancelar
                                            </button>
                                            <button className="btn-accept" type="submit">
                                                Aceptar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Listado de Ubicaciones</h4>
                                </div>
                                <div className="card-body">
                                    <DTable
                                        columnas={columnas}
                                        data={ubicaciones}
                                    />
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
