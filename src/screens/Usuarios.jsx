import React, { useState, useEffect } from "react";
import { Footer, Menu, Navbar, Title } from "../components";
import QR from "../components/commons/QR";
import Swal from "sweetalert2";  // Importar SweetAlert

export const Usuarios = () => {
    const [formData, setFormData] = useState({
        matricula: "",
        nombre: "",
        paterno: "",
        materno: "",
        telefono: "",
        electronico: "",
        rol: "",
        areas: "",
    });
    const [qrData, setQrData] = useState(""); // Estado para almacenar la información del QR

    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState([]);

    // Obtener usuarios desde la API
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost/Inventario_Profe_Paulo/Api/usuarios");
            const result = await response.json();
            if (Array.isArray(result.data)) {
                setData(result.data);
            } else {
                console.error("La API no devolvió un array en 'data':", result);
                setData([]);
            }
        } catch (error) {
            console.error("Error al cargar los usuarios:", error);
            setData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar campos antes de enviar el formulario
        if (
            !formData.matricula ||
            !formData.nombre ||
            !formData.paterno ||
            !formData.materno ||
            !formData.telefono ||
            !formData.electronico ||
            !formData.rol ||
            !formData.areas
        ) {
            // Si algún campo está vacío, mostrar una alerta y no enviar el formulario
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos antes de enviar el formulario.',
                toast: true,
                position: 'top-end',
                timer: 2500,
            });
            return; // Detener la ejecución de la función
        }
    
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing
            ? `http://localhost/Inventario_Profe_Paulo/Api/usuarios/${formData.id}`
            : "http://localhost/Inventario_Profe_Paulo/Api/usuarios";
        
        const success = await sendRequest(method, url, formData);
        
        if (success) {
            fetchData();  // Vuelve a obtener los datos para actualizar la tabla
            resetForm();  // Limpiar el formulario
            if (!isEditing) {
                // Solo generar QR después de agregar un usuario
                const qrValue = JSON.stringify({
                    matricula: formData.matricula,
                    nombre: formData.nombre,
                    paterno: formData.paterno,
                    materno: formData.materno
                }); // Convertir a JSON para asegurar que los datos sean correctos
                setQrData(qrValue); // Generar el QR con la matrícula y otros datos
                setQrData(JSON.stringify(persona)); // Generar QR con datos

            }
        }
    };
    

    
    const sendRequest = async (method, url, formData) => {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: method === "PUT" ? "¡Usuario actualizado!" : "¡Usuario agregado!",
                    text: 'La operación se ha realizado con éxito.',
                    toast: true,
                    position: 'top-end',
                    timer: 2500,
                });
                return true;
            } else {
                console.error("Error en el servidor:", result);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al procesar la solicitud',
                    text: result.message || "No se pudo procesar la solicitud.",
                    toast: true,
                    position: 'top-end',
                    timer: 2500,
                });
                return false;
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al intentar agregar o actualizar el usuario',
                text: 'Hubo un problema al procesar la solicitud.',
                toast: true,
                position: 'top-end',
                timer: 2500,
            });
            return false;
        }
    };
    const handleEdit = (row) => {
        setFormData(row);
        setIsEditing(true);
    };

    const handleDelete = (row) => {
        console.log("ID que se pasa para eliminar:", row.id);  // Añadir este log para ver qué valor tiene 'row.id'
        Swal.fire({
            title: `¿Estás seguro de eliminar al usuario ${row.nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUsuario(row.id);  // Asegúrate de pasar el 'id' y no 'matricula'
            }
        });
    };


const eliminarUsuario = async (id) => {
    if (!id) {
        console.error("ID no válido");
        return;
    }

    try {
        const response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/usuarios/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Usuario eliminado!',
                text: 'El usuario ha sido eliminado con éxito.',
                toast: true,
                position: 'top-end',
                timer: 2500,
            });
            fetchData();  // Recargar la lista de usuarios
        } else {
            const errorResponse = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el usuario',
                text: errorResponse.message || 'Desconocido',
                toast: true,
                position: 'top-end',
                timer: 2500,
            });
            console.error("Error al eliminar usuario:", errorResponse);
        }
    } catch (error) {
        console.error("Error en la solicitud DELETE:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error al intentar eliminar el usuario',
            text: 'Hubo un problema al eliminar el usuario.',
            toast: true,
            position: 'top-end',
            timer: 2500,
        });
    }
};

    const resetForm = () => {
        setFormData({
            matricula: "",
            nombre: "",
            paterno: "",
            materno: "",
            telefono: "",
            electronico: "",
            rol: "",
            areas: "",
        });
        setIsEditing(false);
        setQrData("");  // Limpiar el QR al resetear el formulario
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
                                    <h4 className="card-title">{isEditing ? "Editar" : "Agregar"} persona</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        {["matricula", "nombre", "paterno", "materno", "telefono", "electronico", "areas"].map(field => (
                                            <div key={field} className="form-group">
                                                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                                <input
                                                    className="form-control"
                                                    name={field}
                                                    value={formData[field]}
                                                    onChange={handleInputChange}
                                                    placeholder={`Ingrese ${field}`}
                                                />
                                            </div>
                                        ))}
                                        <div className="form-group">
                                            <label>Rol</label>
                                            <select
                                                className="form-control"
                                                name="rol"
                                                value={formData.rol}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Seleccione un rol</option>
                                                <option value="Ayudante">Ayudante</option>
                                                <option value="Encargado">Encargado</option>
                                                <option value="Supervisor">Supervisor</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary">{isEditing ? "Actualizar" : "Agregar"}</button>
                                        {isEditing && (
                                            <button type="button" className="btn btn-secondary ml-2" onClick={resetForm}>
                                                Cancelar
                                            </button>
                                        )}
                                         <div className="mt-3">
                                            {qrData && <QR value={qrData} />}
                                        </div>
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
                                <div className="table-responsive">
                                    {data.length === 0 ? (
                                        <td colSpan="4" className="text-center">
                                        No se encontraron ubicaciones.
                                    </td>
                                    ) : (
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Identificador</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido Paterno</th>
                                                    <th>Apellido Materno</th>
                                                    <th>Teléfono</th>
                                                    <th>Correo Electrónico</th>
                                                    <th>Rol</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((row) => (
                                                    <tr key={row.id}>
                                                        <td>{row.matricula}</td>
                                                        <td>{row.nombre}</td>
                                                        <td>{row.paterno}</td>
                                                        <td>{row.materno}</td>
                                                        <td>{row.telefono}</td>
                                                        <td>{row.electronico}</td>
                                                        <td>{row.rol}</td>
                                                        <td className="text-center">
    <div className="d-flex justify-content-center align-items-center gap-2">
        <button
 className="btn btn-warning btn-sm"
             onClick={() => handleEdit(row)}
        >
        Editar
        </button>
        <button
  className="btn btn-danger btn-sm"

            onClick={() => handleDelete(row)}
        >
         Eliminar
        </button>
    </div>
</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
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
