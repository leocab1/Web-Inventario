import { Footer, Menu, Navbar, Title } from "../components";
import React, { useState, useEffect } from 'react';
import QR from "../components/commons/QR"; 
import Swal from "sweetalert2";
import '../assets/edit.css'

export const Personas = () => {
    const [showModal, setShowModal] = useState(false);
    const [Personas, setPersonas] = useState([]);
    const [formData, setFormData] = useState({
        id_persona: "",
        nombre: "",
        apaterno: "",
        amaterno: "",
        telefono: "",
        correo: "",
    });
    const [qrData, setQrData] = useState('');

    const getPersonas = async () => {
        try {
            const response = await fetch('http://localhost/Inventario_Profe_Paulo/Api/Persona');
            if (!response.ok) throw new Error('Error en la solicitud');
            const personas = await response.json();
            if (personas.status === 'ok' && Array.isArray(personas.data)) {
                setPersonas(personas.data);
            } else {
                console.error('Error al obtener personas');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const addPersona = async (persona) => {
        try {
            const response = await fetch("http://localhost/Inventario_Profe_Paulo/Api/Persona", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(persona),
            });
            if (!response.ok) throw new Error('Error al agregar persona');
            await response.json();
            Swal.fire({
                icon: 'success',
                title: '¡Persona agregada!',
                toast: true,
                position: 'top-end',
                timer: 2500,
            });
            getPersonas(); // Recargar la lista
            setQrData(JSON.stringify(persona)); // Generar QR con datos

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    const updatePersona = async (persona) => {
        try {
            const response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/Persona/${persona.id_persona}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(persona),
            });
            if (!response.ok) throw new Error('Error al actualizar persona');
            await response.json();
            Swal.fire({
                icon: 'success',
                title: '¡Persona actualizada!',
                toast: true,
                position: 'top-end',
                timer: 2500,
            });
            getPersonas();
        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    const deletePersona = async (id_persona) => {
        try {
            const { isConfirmed } = await Swal.fire({
                title: 'Confirmar eliminación',
                text: '¿Estás seguro de eliminar esta persona?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });
            if (!isConfirmed) return;

            const response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/Persona/${id_persona}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error('Error al eliminar persona');
            Swal.fire({
                icon: 'success',
                title: '¡Persona eliminada!',
                toast: true,
                position: 'top-end',
                timer: 2500,
            });
            getPersonas();
        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    useEffect(() => {
        getPersonas();
    }, []);

    const handleEdit = (persona) => {
        setFormData(persona); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.id_persona) {
            await updatePersona(formData);
        } else {
            await addPersona(formData);
        }
        setFormData({
            id_persona: "",
            nombre: "",
            apaterno: "",
            amaterno: "",
            telefono: "",
            correo: "",
        });
        setShowModal(false);
    };

    return (
        <>
            <Navbar />
            <Menu nombre="InveCastor" usuario="Castorcito uwu" />
            <div className="content-wrapper">
                <Title title="Personas" breadcrums={["Personas", "Menú"]} />
                <section className="content">
                    <div className="row">
                        <div className="col-4">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Agregar/Editar persona</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Nombre(s)</label>
                                            <input
                                                name="nombre"
                                                className="form-control"
                                                value={formData.nombre}
                                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Paterno</label>
                                            <input
                                                name="apaterno"
                                                className="form-control"
                                                value={formData.apaterno}
                                                onChange={(e) => setFormData({ ...formData, apaterno: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Materno</label>
                                            <input
                                                name="amaterno"
                                                className="form-control"
                                                value={formData.amaterno}
                                                onChange={(e) => setFormData({ ...formData, amaterno: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono</label>
                                            <input
                                                name="telefono"
                                                className="form-control"
                                                value={formData.telefono}
                                                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Correo</label>
                                            <input
                                                name="correo"
                                                className="form-control"
                                                value={formData.correo}
                                                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                                            />
                                        </div>
                                        <button className="btn btn-primary" type="submit">
                                            {formData.id_persona ? "Actualizar" : "Agregar"}
                                        </button>
                                        {qrData && (
                                        <div className="mt-3">
                                            <QR value={qrData} />
                                        </div>
                                    )}
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Personas registradas</h4>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Apellido Paterno</th>
                                                <th>Apellido Materno</th>
                                                <th>Teléfono</th>
                                                <th>Correo</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Personas.length > 0 ? (
                                                Personas.map((persona) => (
                                                    <tr key={persona.id_persona}>
                                                        <td>{persona.id_persona}</td>
                                                        <td>{persona.nombre}</td>
                                                        <td>{persona.apaterno}</td>
                                                        <td>{persona.amaterno}</td>
                                                        <td>{persona.telefono}</td>
                                                        <td>{persona.correo}</td>
                                                        <td>
                                                        <button
                                                          className="editBtn" // Usamos la clase editBtn que tienes definida
                                                             onClick={() => handleEdit(persona)} // Mantiene la funcionalidad
                                                        >
    <svg height="1em" viewBox="0 0 512 512">
        <path
            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
        ></path>
    </svg>
</button>
                                                            <button
                                                                className="btn btn-danger btn-sm mx-1"
                                                                onClick={() => deletePersona(persona.id_persona)}
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No hay personas registradas.</td>
                                                </tr>
                                            )}
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
