import { DTable, Footer, Menu, Navbar, Title } from "../components"
import React, { useState } from 'react';
import QR from "../components/commons/QR"; 
import EliminarB from "./Deleteb";
import Editar from "./edit";
import Enviar from "./Enviar";

const columnas = [
    {
        name: 'Identificador',
        selector: row => row.matricula
    },
    {
        name: 'Nombre',
        selector: row => row.nombre
    },
    {
        name: 'Apellido Paterno',
        selector: row => row.paterno
    },
    {
        name: 'Apellido Materno',
        selector: row => row.materno
    },
    {
        name: 'Telefono',
        selector: row => row.telefono
    },
    {
        name: 'Correo Electronico',
        selector: row => row.electronico
    },
    {
        rol: 'rol',
        selector: row => row.rol
    },
    {
        name: 'Opciones',
        selector: row => row.action,
        cell: (props) => (
            <>
                <Editar onClick={() => handleEdit(props)}/>
                <EliminarB onClick={() => handleDelete(props)} />
            </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
    },
];

const data = [
    {
        id: 1,
        matricula: "ZAQ0001",
        nombre: "Leonardo",
        paterno: "Cano",
        materno: "Garcia",
        telefono: "1234567890",
        electronico: "leonardo.cano@gmail.com",
        action: "Editar",
    },
    {
        id: 2,
        matricula: "ZAQ0002",
        nombre: "Carlos",
        paterno: "Garcia",
        materno: "Cano",
        telefono: "2215754515",
        electronico: "carlos.garcia@gmail.com",
        action: "Editar",
    },
];


export const Usuarios = () => {
    const [showModal, setShowModal] = useState(false);
    const [qrData, setQrData] = useState('Información de prueba para QR');

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <Navbar />
            <Menu nombre="InveCastor" usuario="Castorcitos uwu" />
            <div className="content-wrapper">
                <Title title="Usuarios" breadcrums={["Personas", "Menú"]} />
                <section className="content">

                    <div className="row">
                        <div className="col-4">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Agregar persona</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Matricula/Identificador/No. de empleado</label>
                                            <input className="form-control" placeholder="NX02154" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre(s)</label>
                                            <input className="form-control" placeholder="Alfredo" />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Paterno</label>
                                            <input className="form-control" placeholder="Adame" />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Materno</label>
                                            <input className="form-control" placeholder="Buenrostro" />
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono</label>
                                            <input className="form-control" placeholder="111222333" />
                                        </div>
                                        <div className="form-group">
                                            <label>Correo electrónico</label>
                                            <input className="form-control" placeholder="yomero@correo.net" />
                                        </div>

                                        <div className="form-group">
                                            <label>Rol:</label>
                                            <select
                                                name="rol"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={newUsuario.rol}
                                                required
                                            >
                                                <option value="admin">Administrador</option>
                                                <option value="empleado">Empleado</option>
                                                <option value="supervisor">Supervisor</option>
                                            </select>
                                        </div>
                                        
                                    </form>
                                </div>
                                <div className="card-footer">
                                    
                                <div className="modal-footer justify-content-between">
    <button className="btn-cancel" onClick={handleCloseModal}>
        Cancelar
    </button>
    <button className="btn-accept"  onClick={handleOpenModal}>
        Aceptar
    </button>
</div>
                                {showModal && (
                                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                        <div className="modal-dialog modal-sm">
                                            <div className="modal-content modal-filled bg-success">
                                                <div className="modal-body p-4">
                                                    <div className="text-center">
                                                        <i className="ri-check-line h1"></i>
                                                        <h4 className="mt-2">Usuario Agregado Correctamente!</h4>
                                                        <div className="text-center">
                                                        <QR value={qrData} />
                                                    </div>
                                                        <button type="button" className="btn btn-light my-2" onClick={handleCloseModal}>
                                                            Aceptar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}                              
                         </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Personas registradas</h4>
                                </div>
                                <div className="card-body">
                                <DTable cols={ columnas } info={ data } />
                                </div>
                            </div>
                        </div> 
                    </div>

                </section>
            </div>
            <Footer />
        </>
    )
}