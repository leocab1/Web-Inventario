import { DTable, Footer, Menu, Navbar, Title } from "../components";
import React, { useState, useEffect } from 'react';
import QR from "../components/commons/QR"; 
import { useFetchv2 } from "../hooks/useFetchv2";
import Swal from "sweetalert2";

const columnas = 
[
    { name: 'Identificador', selector: row => row.matricula },
    { name: 'Nombre', selector: row => row.nombre },
    { name: 'Tipo', selector: row => row.tipo },
    { name: 'Ubicación', selector: row => row.ubicacion },
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

export const Personas = () => {
    const [showModal, setShowModal] = useState(false);
    const { getData, setData, updateData, deleteData } = useFetchv2();
    const [Personas, setPersonas] = useState([]);
    const [formData, setFormData] = useState({
        matricula: "",
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        telefono: "",
        correo: "",
    });
    const [qrData, setQrData] = useState('Información de prueba para QR');

    const getPersonas = async () => {
        try {
            const personas = await getData('http://localhost/Inventario_Profe_Paulo/Api/Persona');
            if (personas.error === false) {
                setPersonas(personas.data); 
            } else {
                console.error('Error al obtener personas', personas.error);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    
    const addPersona = async (newPersona) => {
        try {
            const response = await setData('http://localhost/Inventario_Profe_Paulo/Api/Persona', newPersona);
    
            if (!response.error) {
                setPersonas(prevState => [...prevState, response.data]);
                Swal.fire('Éxito', 'Persona agregada correctamente', 'success');
            } else {
                console.error('Error al agregar persona', response.message);
                Swal.fire('Error', response.message, 'error');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            Swal.fire('Error', 'Ocurrió un error al agregar la persona', 'error');
        }
    };
    



    useEffect(() => {
        getPersonas(); // Llama a 'getPersonas' al cargar el componente
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setQrData(JSON.stringify(formData)); // Almacena los datos del formulario en el estado
    
        // Llama a la función para agregar la persona, pasando formData (newPersona)
        await addPersona(formData); 
        
        // Abre el modal de éxito
        await handleOpenModal(); 
    };
    

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            matricula: "",
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            telefono: "",
            correo: "",
        });
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
                                    <h4 className="card-title">Agregar persona</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Matricula/Identificador/No. de empleado</label>
                                            <input
                                                name="matricula"
                                                className="form-control"
                                                placeholder="NX02154"
                                                value={formData.matricula}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre(s)</label>
                                            <input
                                                name="nombre"
                                                className="form-control"
                                                placeholder="Alfredo"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Paterno</label>
                                            <input
                                                name="apellidoPaterno"
                                                className="form-control"
                                                placeholder="Adame"
                                                value={formData.apellidoPaterno}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Materno</label>
                                            <input
                                                name="apellidoMaterno"
                                                className="form-control"
                                                placeholder="Buenrostro"
                                                value={formData.apellidoMaterno}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono</label>
                                            <input
                                                name="telefono"
                                                className="form-control"
                                                placeholder="111222333"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Correo electrónico</label>
                                            <input
                                                name="correo"
                                                className="form-control"
                                                placeholder="yomero@correo.net"
                                                value={formData.correo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="modal-footer justify-content-between">
                                            <button type="button" className="btn btn-default" onClick={handleCloseModal}>Cancelar</button> 
                                            <button type="submit" className="btn btn-primary">Aceptar</button>
                                        </div>
                                    </form>

                                    {showModal && (
                                        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                            <div className="modal-dialog modal-sm">
                                                <div className="modal-content modal-filled bg-success">
                                                    <div className="modal-body p-4">
                                                        <div className="text-center">
                                                            <i className="ri-check-line h1"></i>
                                                            <h4 className="mt-2">Persona Agregada Correctamente!</h4>
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
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Personas registradas</h4>
                                </div>
                                <div className="card-body">
                                    <DTable cols={columnas} info={columnas} /> {/* Aquí pasas el estado 'Personas' que ahora tiene los datos de la API */}
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
