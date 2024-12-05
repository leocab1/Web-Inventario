import { DTable, Footer, Menu, Navbar, Title } from "../components";
import React, { useState, useEffect } from "react";
import { useFetchv2 } from "../hooks/useFetchv2";
import QR from "../components/commons/QR";
import Swal from "sweetalert2";
import EliminarB from "./Deleteb";
import Editar from "./edit";


const columnas = [
    { name: "Identificador", selector: (row) => row.matricula },
    { name: "Nombre", selector: (row) => row.nombre },
    { name: "Descripción", selector: (row) => row.descripcion },
    { name: "Tipo", selector: (row) => row.tipo },
    { name: "Estado", selector: (row) => row.estado },
    { name: "Fecha Registro", selector: (row) => row.Fecha },
    { name: "Activo", selector: (row) => row.activo },
    { name: "Código", selector: (row) => row.codigo },
    { name: "Ubicación", selector: (row) => row.ubicacion },
    {
        name: "Opciones",
        selector: (row) => row.action,
        cell: (props) => (
            <>
                <Editar onClick={() => handleEdit(props)} />
                <EliminarB onClick={() => handleDelete(props)} />
            </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];

export const Mobiliario = () => {
    const [showModal, setShowModal] = useState(false);
    const { getData } = useFetchv2();
    const [mobiliario, setMobiliario] = useState([]);
    const [newItem, setNewItem] = useState({
        matricula: "",
        nombre: "",
        descripcion: "",
        tipo: "",
        estado: "",
        Fecha: "",
        activo: "",
        codigo: "",
        ubicacion: "",
    });
    const [qrData, setQrData] = useState("Información de prueba para QR");

    const getMobiliario = async () => {
        try {
            const mobiliario = await getData("http://localhost/Inventario_Profe_Paulo/Api/Mobiliario");
            if (mobiliario.error === false) {
                setMobiliario(mobiliario.data);
            } else {
                console.error("Error al obtener mobiliario:", mobiliario.error);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({
            ...newItem,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si algún campo está vacío
        if (
            !newItem.nombre.trim() ||
            !newItem.descripcion.trim() ||
            !newItem.tipo.trim() ||
            !newItem.estado.trim() ||
            !newItem.Fecha.trim() ||
            !newItem.activo.trim() ||
            !newItem.codigo.trim() ||
            !newItem.ubicacion.trim()
        ) {
            // Mostrar alerta de error si algún campo está vacío
            Swal.fire({
                icon: "error",
                title: "Campos incompletos",
                text: "Por favor, completa todos los campos antes de enviar el formulario.",
                toast: true,
                position: "top-end",
                timer: 2500,
                timerProgressBar: true,
            });
            return; // Detener el envío del formulario
        }

        const newMobiliario = {
            nombre: newItem.nombre.trim(),
            descripcion: newItem.descripcion.trim(),
            tipo: newItem.tipo.trim(),
            estado: newItem.estado.trim(),
            fecha_registro: newItem.Fecha.trim(),
            activo: newItem.activo.trim(),
            codigo: newItem.codigo.trim(),
            ubicacion: newItem.ubicacion.trim(),
        };

        try {
            const response = await fetch("http://localhost/Inventario_Profe_Paulo/Api/Mobiliario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMobiliario),
            });
            if (!response.ok) throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
            const data = await response.json();
            console.log("Mobiliario agregado:", data);
            Swal.fire({
                icon: "success",
                title: "¡Mobiliario agregado!",
                text: "El mobiliario se ha agregado correctamente.",
                toast: true,
                position: "top-end",
                timer: 2500,
                timerProgressBar: true,
            });
        } catch (error) {
            console.error("Error al agregar mobiliario:", error.message);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Hubo un problema al agregar el mobiliario: ${error.message}`,
            });
        }
    };

    useEffect(() => {
        getMobiliario();
    }, []);

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
                                            <label>Nombre:</label>
                                            <input
                                                type="text"
                                                name="nombre"
                                                className="form-control"
                                                placeholder="Nombre del mobiliario"
                                                onChange={handleChange}
                                                value={newItem.nombre}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Descripción:</label>
                                            <input
                                                type="text"
                                                name="descripcion"
                                                className="form-control"
                                                placeholder="Descripción breve"
                                                onChange={handleChange}
                                                value={newItem.descripcion}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Tipo:</label>
                                            <select
                                                name="tipo"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={newItem.tipo}
                                                required
                                            >
                                                <option value="">Seleccione un tipo</option>
                                                <option value="Escritorio">Escritorio</option>
                                                <option value="Silla">Silla</option>
                                                <option value="Armario">Armario</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Estado:</label>
                                            <select
                                                name="estado"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={newItem.estado}
                                                required
                                            >
                                                <option value="">Seleccione el estado</option>
                                                <option value="Nuevo">Nuevo</option>
                                                <option value="Usado">Usado</option>
                                                <option value="Dañado">Dañado</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Fecha de Registro:</label>
                                            <input
                                                type="date"
                                                name="Fecha"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={newItem.Fecha}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Activo:</label>
                                            <select
                                                name="activo"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={newItem.activo}
                                                required
                                            >
                                                <option value="">¿Está activo?</option>
                                                <option value="1">Sí</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Código:</label>
                                            <input
                                                type="text"
                                                name="codigo"
                                                className="form-control"
                                                placeholder="Código del mobiliario"
                                                onChange={handleChange}
                                                value={newItem.codigo}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Ubicación:</label>
                                            <input
                                                type="text"
                                                name="ubicacion"
                                                className="form-control"
                                                placeholder="Ubicación del mobiliario"
                                                onChange={handleChange}
                                                value={newItem.ubicacion}
                                                required
                                            />
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Agregar Mobiliario
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Listado de Mobiliario</h3>
                                </div>
                                <div className="card-body">
                                    <DTable columnas={columnas} data={mobiliario} />
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
