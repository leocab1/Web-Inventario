import { Footer, Menu, Navbar, Title } from "../components";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import QRCode from "react-qr-code"; 

export const Mobiliario = () => {
  const [mobiliario, setMobiliario] = useState([]);
  const [newItem, setNewItem] = useState({
    id_mobiliarion: "",
    nombre: "",
    descripcion: "",
    tipo: "",
    estado: "",
    Fecha: "",
    activo: "",
    codigo: "",
    ubicacion: "",
  });

  const [qrData, setQrData] = useState(""); 

  const getMobiliario = () => {
    fetch("http://localhost/Inventario_Profe_Paulo/Api/Mobiliario")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setMobiliario(data.data);
        } else {
          console.error("Error al obtener mobiliario: No se encontraron datos");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newItem.nombre || !newItem.descripcion || !newItem.tipo || !newItem.estado || !newItem.Fecha || !newItem.activo || !newItem.codigo || !newItem.ubicacion) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de enviar el formulario.",
        toast: true,
        position: "top-end",
        timer: 2500,
        timerProgressBar: true,
      });
      return;
    }

    const mobiliarioData = {
      nombre: newItem.nombre.trim(),
      descripcion: newItem.descripcion.trim(),
      tipo: newItem.tipo.trim(),
      estado: newItem.estado.trim(),
      activo: newItem.activo.trim(),
      codigo: newItem.codigo.trim(),
      ubicacion: newItem.ubicacion.trim(),
    };

    if (!newItem.id_mobiliarion) {
      mobiliarioData.fecha_registro = newItem.Fecha.trim();
    }

    try {
      let response;
      let data;

      if (newItem.id_mobiliarion) {
        response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/Mobiliario/${newItem.id_mobiliarion}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mobiliarioData),
        });
        data = await response.json();
      } else {
        response = await fetch("http://localhost/Inventario_Profe_Paulo/Api/Mobiliario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mobiliarioData),
        });
        data = await response.json();
      }

      if (!response.ok) throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);

      Swal.fire({
        icon: "success",
        title: newItem.id_mobiliarion ? "¡Mobiliario actualizado!" : "¡Mobiliario agregado!",
        text: newItem.id_mobiliarion ? "El mobiliario se ha actualizado correctamente." : "El mobiliario se ha agregado correctamente.",
        toast: true,
        position: "top-end",
        timer: 2500,
        timerProgressBar: true,
      });

      getMobiliario();

      
      setQrData(`http://localhost/Inventario_Profe_Paulo/Detalles/${data.id_mobiliarion}`);

    
      if (!newItem.id_mobiliarion) {
        setNewItem({
          id_mobiliarion: "",
          nombre: "",
          descripcion: "",
          tipo: "",
          estado: "",
          Fecha: "",
          activo: "",
          codigo: "",
          ubicacion: "",
        });
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  };

  
  const handleDelete = async (id_mobiliarion) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Confirmar eliminación",
        text: "¿Estás seguro de eliminar este mobiliario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (!isConfirmed) return;

      const response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/Mobiliario/${id_mobiliarion}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      const data = await response.json();

      Swal.fire({
        icon: "success",
        title: "¡Mobiliario eliminado!",
        toast: true,
        position: "top-end",
        timer: 2500,
        timerProgressBar: true,
      });

      getMobiliario(); 
    } catch (error) {
      console.error("Error al eliminar mobiliario:", error);
      Swal.fire({ icon: "error", title: "Error", text: error.message });
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
            <div className="col-12 col-sm-12 col-md-6 mb-3">
              <div className="card card-primary">
                <div className="card-header">
                  <h5 className="card-title">{newItem.id_mobiliarion ? "Editar mobiliario" : "Agregar mobiliario/artículo"}</h5>
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
                        <option value="">Seleccione</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Código del Mobiliario:</label>
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
                      {newItem.id_mobiliarion ? "Actualizar Mobiliario" : "Agregar Mobiliario"}
                    </button>
                    {qrData && (
                      <div className="mt-4 text-center">
                        <div className="d-flex justify-content-center">
                          <div className="border p-3 rounded shadow-sm">
                            <QRCode value={qrData} size={200} />
                          </div>
                        </div>
                        <p className="mt-2">Escanea este código QR para más detalles.</p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Listado de Mobiliario</h5>
                </div>
                <div className="card-body p-2">
                  {mobiliario.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-sm table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Identificador</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th>Fecha Registro</th>
                            <th>Activo</th>
                            <th>Código</th>
                            <th>Ubicación</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mobiliario.map((item, index) => (
                            <tr key={index}>
                              <td>{item.id_mobiliarion}</td>
                              <td>{item.nombre}</td>
                              <td>{item.descripcion}</td>
                              <td>{item.tipo}</td>
                              <td>{item.estado}</td>
                              <td>{item.fecha_registro}</td>
                              <td>{item.activo === "1" ? "Sí" : "No"}</td>
                              <td>{item.codigo}</td>
                              <td>{item.ubicacion}</td>
                              <td>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => setNewItem(item)} 
                                >
                                  Editar
                                </button>
                                <button
                                  className="btn btn-sm btn-danger ml-1"
                                  onClick={() => handleDelete(item.id_mobiliarion)} 
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No hay datos para mostrar</p>
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
