import { Footer, Menu, Navbar, Title } from "../components";
import React, { useState, useEffect } from 'react';
import QR from "../components/commons/QR"; 
import Swal from "sweetalert2";


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
    
        // Verificar si algún campo está vacío
        if (!formData.nombre || !formData.apaterno || !formData.amaterno || !formData.telefono || !formData.correo) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos del formulario.',
            });
            return; // Detener el envío de datos si hay campos vacíos
        }
    
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
                <div className="mt-4 text-center">
                  <div className="d-flex justify-content-center">
                    <div className="border p-3 rounded shadow-sm">
                      <QR value={qrData} size={200} />
                    </div>
                  </div>
                  <p className="mt-2">Escanea este código QR para más detalles.</p>
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
                                                        <td className="text-center">
    <div className="d-flex justify-content-center align-items-center gap-2">
        <button
            className="btn btn-warning"
            onClick={() => handleEdit(persona)}
        >
            Editar
        </button>
        <button
            className="btn btn-danger"
            onClick={() => deletePersona(persona.id_persona)}
        >
            Eliminar
        </button>
    </div>
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
