import { DTable, Footer, Menu, Navbar, Title } from "../components";
import React, { useState } from 'react';
import QR from "../components/commons/QR"; 

const columnas = [
    { name: 'Identificador', selector: row => row.matricula },
    { name: 'Edificio', selector: row => row.edificio },
    { name: 'Departamento', selector: row => row.departamento },
    { name: 'Área', selector: row => row.area },
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
        edificio: "K4",
        departamento: "Edificio X",
        area: "Laboratorio UWU",
        action: "Editar",
    },
];

export const Ubicaciones = () => {
    const [showModal, setShowModal] = useState(false);
    const [qrData, setQrData] = useState('');
    const [formData, setFormData] = useState({
        edificio: "",
        departamento: "",
        area: "",
    });
    const [ubicaciones, setUbicaciones] = useState(data); // Estado para las ubicaciones



    const handleCloseModal = () => {
        setShowModal(false); 
        setFormData({
            edificio: "",
            departamento: "",
            area: "",
        }); // Limpiar el formulario
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
        e.preventDefault(); // Evitar recarga de la página
    
        try {
            const response = await fetch('http://localhost/Inventario_Profe_Paulo/Api/ubicacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Enviar los datos del formulario
            });
    
            if (response.ok) {
                console.log('Ubicación agregada:', response); // Puedes ver la respuesta completa aquí
                setUbicaciones((prevState) => [...prevState, formData]); // Agregar la nueva ubicación al estado
                handleOpenModal(); // Abre el modal de éxito
            } else {
                console.error('Error al agregar ubicación:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
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
                                            <button type="button" className="btn btn-default" onClick={handleCloseModal}>Cancelar</button> 
                                            <button type="submit" className="btn btn-primary">Aceptar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Ubicaciones registradas</h4>
                                </div>
                                <div className="card-body">
                                    <DTable cols={columnas} info={ubicaciones} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Modal de confirmación */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content modal-filled bg-success">
                            <div className="modal-body p-4">
                                <div className="text-center">
                                    <i className="ri-check-line h1"></i>
                                    <h4 className="mt-2">Ubicacion Agregada Correctamente!</h4>
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

            <Footer />
        </>
    );
};
