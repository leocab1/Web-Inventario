import { DTable, Footer, Menu, Navbar, PieChart, Title, BarChart } from "../components";
import React, { useState } from 'react';
import QR from "../components/commons/QR";
import Editar from "./edit";
import EliminarB from "./Deleteb";

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
        name: 'Tipo',
        selector: row => row.tipo
    },
    {
        name: 'Ubicación',
        selector: row => row.ubicacion
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
        nombre: "Mesa binaria",
        tipo: "Mueble de oficina",
        ubicacion: "Edificio D5 - 211",
        action: "Editar",
    },
    {
        id: 2,
        matricula: "ZAQ0002",
        nombre: "CPU - HP Elite C800",
        tipo: "Equipo de computo",
        ubicacion: "Edificio D5 - 211",
        action: "Editar",
    },
];

export const Informes = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        empleado: '',
        ubicacion: '',
        tipoArticulo: '',
        fecha: '',
    });
    const [qrData, setQrData] = useState('');

    const handleOpenModal = () => {
        if (!formData.empleado || !formData.ubicacion || !formData.tipoArticulo || !formData.fecha) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const qrInfo = `Empleado: ${formData.empleado}, Ubicación: ${formData.ubicacion}, Tipo: ${formData.tipoArticulo}, Fecha: ${formData.fecha}`;
        setQrData(qrInfo);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ empleado: '', ubicacion: '', tipoArticulo: '', fecha: '' });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Navbar />
            <Menu nombre="InveCastor" usuario="Castorcitos uwu" />
            <div className="content-wrapper">
                <Title title="Informes" breadcrums={["Personas", "Menú"]} />
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
                                            <label>Empleado</label>
                                            <select name="empleado" className="form-control" onChange={handleInputChange}>
                                                <option value="">-Seleccione-</option>
                                                <option value="Juan Perez">Juan Perez</option>
                                                <option value="Laura Sanchez">Laura Sanchez</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Ubicación</label>
                                            <select name="ubicacion" className="form-control" onChange={handleInputChange}>
                                                <option value="">-Todas-</option>
                                                <option value="Administración">Administración</option>
                                                <option value="Recepción">Recepción</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Tipo de artículo</label>
                                            <select name="tipoArticulo" className="form-control" onChange={handleInputChange}>
                                                <option value="">Todos los tipos</option>
                                                <option value="Muebles">Muebles</option>
                                                <option value="Equipos de computo">Equipos de computo</option>
                                                <option value="Equipos de laboratorio">Equipos de laboratorio</option>
                                                <option value="Articulo de laboratorio">Articulo de laboratorio</option>
                                                <option value="Articulo general">Articulo general</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Fecha</label>
                                            <input type="date" name="fecha" className="form-control" onChange={handleInputChange} />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer justify-content-between">
    <button className="btn-cancel" onClick={handleCloseModal}>
        Cancelar
    </button>
    <button className="btn-accept"  onClick={handleOpenModal}>
        Aceptar
    </button>

                                    {showModal && (
                                        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                            <div className="modal-dialog modal-sm">
                                                <div className="modal-content modal-filled bg-success">
                                                    <div className="modal-body p-4">
                                                        <div className="text-center">
                                                            <h4 className="mt-2">Informe Agregado Correctamente!</h4>
                                                        </div>
                                                        <div className="text-center">
                                                        <QR value={qrData} />
                                                            </div>
                                                            <div className="text-center">
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
                            <div className="row">
                                <div className="col-12">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h4 className="card-title">Resultados</h4>
                                        </div>
                                        <div className="card-body">
                                            <DTable cols={columnas} info={data} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h4 className="card-title">Resultados</h4>
                                        </div>
                                        <div className="card-body">
                                            <PieChart />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h4 className="card-title">Resultados</h4>
                                        </div>
                                        <div className="card-body">
                                            <BarChart />
                                        </div>
                                    </div>
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
