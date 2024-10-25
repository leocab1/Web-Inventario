import { DTable, Footer, Menu, Navbar, Title } from "../components";
import React, { useState } from 'react';

const columnas = [
    {
        name: 'Identificador',
        selector: row=> row.matricula
    },
    {
        name: 'Nombre',
        selector: row=> row.nombre
    },
    {
        name: 'Descripcion',
        selector: row=> row.descripcion
    },
    {
        name: 'Tipo',
        selector: row=> row.tipo
    },
    {
        name: 'estado',
        selector: row=> row.estado
    },
    {
        name: 'Fecha Registro',
        selector: row=> row.Fecha
    },
    {
        name: 'Activo',
        selector: row=> row.activo
    },
    {
        name: 'Codigo',
        selector: row=> row.codigo
    },
    {
        name: 'Ubicación',
        selector: row=> row.ubicacion
    },
    {
        name: 'Opciones',
        selector: row => row.action,
        cell: (props) => (
            <button className="btn btn-info btn-sm">Editar</button>
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
        nombre: "Mesa binaria",
        descripcion: "Mesa de trabajo con dos puestos",
        tipo: "Mueble de oficina",
        estado: "Nuevo",
        Fecha: "2020-01-01",
        activo: "Usando",
        codigo: "MESA-01",
        ubicacion: "Edificio D5 - 211",
        action: "Editar",
    },
    {
        id: 2,
        matricula: "ZAQ0002",
        nombre: "CPU - HP Elite C800",
        descripcion: "Procesador de la computadora",
        tipo: "Equipo de computo",
        estado: "usado",
        Fecha: "2022-05-15",
        activo: "usando",
        codigo: "CPU-HP",
        ubicacion: "Edificio D5 - 211",
        action: "Editar",
    },
]

export const Mobiliario = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (    
        <>
            <Navbar />
            <Menu nombre="InveCastor" usuario="Castorcito UWU" />
            <div className="content-wrapper">
                <Title title="Mobiliario" breadcrums={["Inicio", "Mobiliario"]} />
                <section className="content">

                    <div className="row">
                        <div className="col-4">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Agregar mobiliario/artículo</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Matricula / Identificador / No. inventario</label>
                                            <input className="form-control" placeholder="NX02154" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre del mobiliario / artículo</label>
                                            <input className="form-control" placeholder="Mesa de madera" />
                                        </div>
                                        <div className="form-group">
                                            <label>Descripción</label>
                                            <input className="form-control" placeholder="en el edificio de tic's K5" />
                                        </div>
                                        <div className="form-group">
                                            <label>Tipo</label>
                                            <input className="form-control" placeholder="en el edificio de tic's K5" />
                                        </div>
                                        <div className="form-group">
                                            <label>Estado</label>
                                            <select className="form-control">
                                                <option>Seleccione</option>
                                                <option>Nuevo</option>
                                                <option>Usado</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Fecha Registro</label>
                                            <input type="date" className="" />
                                        </div>

                                        <div className="form-group">
                                            <label>Activo</label>
                                            <input className="form-control" placeholder="1" />
                                        </div> 
                                        <div className="form-group">
                                            <label>Codigo</label>
                                            <input className="form-control" placeholder="G-4574RXDS" />
                                        </div>                                       

                                        <div className="form-group">
                                            <label>Tipo de mobiliario</label>
                                            <select className="form-control">
                                                <option>Seleccione</option>
                                                <option>Muebles</option>
                                                <option>Equipo de cómputo</option>
                                                <option>Equipo de laboratorio</option>
                                                <option>Artículo de laboratorio</option>
                                                <option>Artículo general</option>
                                                <option>Otro</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Ubicación</label>
                                            <select className="form-control">
                                                <option>Seleccione</option>
                                                <option>Edificio D5 - 211</option>
                                                <option>Edificio K5 - 101</option>
                                                <option>Edificio D6 - 205</option>
                                                <option>Otro</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-secondary">Cancelar</button>
                                    <button type="button" className="btn btn-success" onClick={handleOpenModal}>
                                    Aceptar
                                </button>

                                {showModal && (
                                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                        <div className="modal-dialog modal-sm">
                                            <div className="modal-content modal-filled bg-success">
                                                <div className="modal-body p-4">
                                                    <div className="text-center">
                                                        <i className="ri-check-line h1"></i>
                                                        <h4 className="mt-2">Mobiliario Agregado Correctamente!</h4>


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