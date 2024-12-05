import { DTable, Footer, Menu, Navbar, Title } from "../components";
import React, { useState } from 'react';
import { useFetchv2 } from "../hooks/useFetchv2";
import QR from "../components/commons/QR";
import Swal from "sweetalert2";
import EliminarB from "./Deleteb";
import Editar from "./edit";
import Enviar from "./Enviar";

// Columnas para la tabla
const columnas = [
    { name: 'Identificador', selector: row => row.matricula },
    { name: 'Nombre', selector: row => row.nombre },
    { name: 'Descripción', selector: row => row.descripcion },
    { name: 'Tipo', selector: row => row.tipo },
    { name: 'Estado', selector: row => row.estado },
    { name: 'Fecha Registro', selector: row => row.Fecha },
    { name: 'Activo', selector: row => row.activo },
    { name: 'Código', selector: row => row.codigo },
    { name: 'Ubicación', selector: row => row.ubicacion },
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

export const Mobiliario = () => {
    const [showModal, setShowModal] = useState(false);
    const [qrData, setQrData] = useState('Información de prueba para QR');
    const [newItem, setNewItem] = useState({
        matricula: '',
        nombre: '',
        descripcion: '',
        tipo: '',
        estado: '',
        Fecha: '',
        activo: '',
        codigo: '',
        ubicacion: ''
    });

    const [data, setData] = useState([
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
            estado: "Usado",
            Fecha: "2022-05-15",
            activo: "Usando",
            codigo: "CPU-HP",
            ubicacion: "Edificio D5 - 211",
            action: "Editar",
        },
    ]);

    // Maneja la apertura y cierre del modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({
            ...newItem,
            [name]: value
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Asegúrate de enviar los valores en el formato que espera la API
        const newMobiliario = {
            nombre: newItem.nombre,
            descripcion: newItem.descripcion,
            tipo: parseInt(newItem.tipo), // Convierte a número
            estado: parseInt(newItem.estado), // Convierte a número
            fecha_registro: new Date().toISOString().slice(0, 19).replace("T", " "), // Fecha actual en formato YYYY-MM-DD HH:MM:SS
            activo: parseInt(newItem.activo), // Convierte a número
            codigo: newItem.codigo,
            id_ubicacion: parseInt(newItem.ubicacion), // Convierte a número
        };
    
        try {
            const response = await fetch("http://localhost/Inventario_Profe_Paulo/Api/Mobiliario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMobiliario),
            });
    
            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
            }
    
            const responseData = await response.json();
            console.log("Mobiliario agregado:", responseData);
    
            Swal.fire({
                icon: 'success',
                title: '¡Mobiliario agregado!',
                text: 'El mobiliario se ha agregado correctamente.',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                position: 'top-end',
                timerProgressBar: true,
            });
    
            // Actualiza la lista de datos
            setData(prevData => [...prevData, { ...responseData, action: 'Editar' }]);
    
            setNewItem({
                matricula: '',
                nombre: '',
                descripcion: '',
                tipo: '',
                estado: '',
                Fecha: '',
                activo: '',
                codigo: '',
                ubicacion: ''
            });
    
            handleOpenModal(); // Abre el modal de éxito
        } catch (error) {
            console.error("Error al agregar mobiliario", error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Hubo un problema al agregar el mobiliario: ${error.message}`,
                showConfirmButton: true,
            });
        }
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
                                <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="matricula">Matrícula</label>
        <input
            type="text"
            className="form-control"
            id="matricula"
            name="matricula"
            value={newItem.matricula}
            onChange={handleChange}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={newItem.nombre}
            onChange={handleChange}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="descripcion">Descripción</label>
        <input
            type="text"
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={newItem.descripcion}
            onChange={handleChange}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="tipo">Tipo</label>
        <input
            type="text"
            className="form-control"
            id="tipo"
            name="tipo"
            value={newItem.tipo}
            onChange={handleChange}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <input
            type="text"
            className="form-control"
            id="estado"
            name="estado"
            value={newItem.estado}
            onChange={handleChange}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="Fecha">Fecha de Registro</label>
        <input
            type="date"
            className="form-control"
            id="Fecha"
            name="Fecha"
            value={newItem.Fecha}
            onChange={handleChange}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="activo">Activo</label>
        <input
            type="text"
            className="form-control"
            id="activo"
            name="activo"
            value={newItem.activo}
            onChange={handleChange}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="codigo">Código</label>
        <input
            type="text"
            className="form-control"
            id="codigo"
            name="codigo"
            value={newItem.codigo}
            onChange={handleChange}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="ubicacion">Ubicación</label>
        <input
            type="text"
            className="form-control"
            id="ubicacion"
            name="ubicacion"
            value={newItem.ubicacion}
            onChange={handleChange}
            required
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
                                    <h4 className="card-title">Mobiliarios Registrados</h4>
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

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content modal-filled bg-success">
                            <div className="modal-body p-4">
                                <div className="text-center">
                                    <h4 className="mt-2">Mobiliario Agregado Correctamente!</h4>
                                </div>
                                <div className="text-center">
                                    <QR value={qrData} />
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn btn-light" onClick={handleCloseModal}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
