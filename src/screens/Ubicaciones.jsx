import { DTable, Footer, Menu, Navbar, Title } from "../components";
import React, { useState } from 'react';

const columnas = [
    {
        name: 'Identificador',
        selector: row => row.matricula
    },
    {
        name: 'Edificio',
        selector: row => row.edificio
    },
    {
        name: 'Departamento',
        selector: row => row.edificio
    },
    {
        name: 'Area',
        selector: row => row.area
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
        edificio: "K5",
        departamento: "Tecnologias de la Informacion",
        area: "Laboratorio 211",
        action: "Editar",
    },
    {
        id: 2,
        matricula: "ZAQ0002",
        edificio: "k4",
        departamento: "edificio x",
        area: "Laboratorio uwu",
        action: "Editar",
    },
];

export const Ubicaciones = () => {
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
            <Menu nombre="Invecastor" usuario="Castorcito uwu" />
            <div className="content-wrapper">
                <Title title="Ubicaciones" breadcrums={["Personas", "Menú"]} />
                <section className="content">
                    <div className="row">
                        <div className="col-4">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Agregar Ubicacion</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Edificio(s)</label>
                                            <input className="form-control" placeholder="D-5" />
                                        </div>
                                        <div className="form-group">
                                            <label>Departamento</label>
                                            <input className="form-control" placeholder="D-5" />
                                        </div>
                                        <div className="form-group">
                                            <label>Area</label>
                                            <input className="form-control" placeholder="tics" />
                                        </div>
                                    </form>
                                </div>
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
                                                        <h4 className="mt-2">Informe Agregado Correctamente!</h4>


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

                        <div className="col-8">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Ubicaciones registradas</h4>
                                </div>
                                <div className="card-body">
                                    <DTable cols={columnas} info={data} />
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
