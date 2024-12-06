import React, { useState, useEffect } from 'react';
import { Footer, Menu, Navbar, Title } from "../components";
import EliminarB from "./Deleteb";
import Editar from "./edit";

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

    const [data, setData] = useState([]);

   
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost/Inventario_Profe_Paulo/Api/usuarios");
            const result = await response.json();
            
            // Acceder a la propiedad 'data' en la respuesta de la API
            if (Array.isArray(result.data)) {
                setData(result.data); // Usamos 'data' como el array que contiene los usuarios
            } else {
                console.error("La API no devolvió un array en 'data':", result);
                setData([]); // Asegura que 'data' sea un array vacío en caso de error
            }
        } catch (error) {
            console.error("Error al cargar los usuarios:", error);
            setData([]); // Asegura que 'data' sea un array vacío en caso de error
        }
    };
    

    // Llamar a la función fetchData cuando el componente se monta
    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        try {
            const response = await fetch("http://localhost/Inventario_Profe_Paulo/Api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Usuario agregado correctamente");
                fetchData(); // Vuelve a cargar los usuarios después de agregar uno
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
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al intentar agregar el usuario.");
        }
    };

    const handleEdit = (row) => {
        // Llena el formulario con los datos existentes
        setFormData(row);
    };

    const handleDelete = (row) => {
        if (window.confirm(`¿Estás seguro de eliminar al usuario ${row.nombre}?`)) {
            eliminarUsuario(row.id);
        }
    };

    const eliminarUsuario = async (id) => {
        try {
            const response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/usuarios/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Usuario eliminado correctamente");
                fetchData(); // Recarga los datos después de eliminar
            } else {
                alert("Error al eliminar el usuario.");
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert("Error al intentar eliminar el usuario.");
        }
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
                                        <button type="submit" className="btn btn-primary">Aceptar</button>
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
                                    {data.length === 0 ? (
                                        <p>There are no records to display</p>
                                    ) : (
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Identificador</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido Paterno</th>
                                                    <th>Apellido Materno</th>
                                                    <th>Teléfono</th>
                                                    <th>Correo Electrónico</th>
                                                    <th>Rol</th>
                                                    <th>Áreas Asignadas</th>
                                                    <th>Opciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((row) => (
                                                    <tr key={row.matricula}>
                                                        <td>{row.matricula}</td>
                                                        <td>{row.nombre}</td>
                                                        <td>{row.paterno}</td>
                                                        <td>{row.materno}</td>
                                                        <td>{row.telefono}</td>
                                                        <td>{row.electronico}</td>
                                                        <td>{row.rol}</td>
                                                        <td>{row.areas}</td>
                                                        <td>
                                                            <Editar onClick={() => handleEdit(row)} />
                                                            <EliminarB onClick={() => handleDelete(row)} />
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
                </section>
            </div>
            <Footer />
        </>
    );
};
