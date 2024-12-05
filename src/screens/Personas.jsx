import { DTable, Footer, Menu, Navbar, Title } from "../components";
import React, { useState, useEffect } from 'react';
import QR from "../components/commons/QR"; 
import { useFetchv2 } from "../hooks/useFetchv2";
import Swal from "sweetalert2";
import {Enviar} from '../screens/Enviar'

const columnas = [
    { name: 'Identificador', selector: row => row.matricula },
    { name: 'Nombre', selector: row => row.nombre },
    { name: 'Tipo', selector: row => row.tipo },
    { name: 'Ubicación', selector: row => row.ubicacion },
    {
      name: 'Opciones',
      selector: row => row.action,
      cell: (row) => (
        <div>
          <button
            className="btn btn-info btn-sm"
            onClick={() => handleEdit(row)}
          >
            Editar
          </button>
          <button
            className="btn btn-danger btn-sm ml-2"
            onClick={() => handleDelete(row)}
          >
            Eliminar
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    },
  ];
  
  const handleEdit = (row) => {
    // Lógica para editar, puedes abrir un modal o pre-llenar un formulario con los datos de la persona seleccionada
    setFormData({
      matricula: row.matricula,
      nombre: row.nombre,
      apaterno: row.apaterno,
      amaterno: row.amaterno,
      telefono: row.telefono,
      correo: row.correo,
    });
    setShowModal(true);
  };
  
 







  

export const Personas = () => {
    const [showModal, setShowModal] = useState(false);
    const { getData, setData, updateData, deleteData } = useFetchv2();
    const [Personas, setPersonas] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        apaterno: "",
        amaterno: "",
        telefono: "",
        correo: "",
    });
    const [qrData, setQrData] = useState('');


    

    const getPersonas = async () => {
        try {
          const personas = await getData('http://localhost/Inventario_Profe_Paulo/Api/Persona');
          if (personas.error === false) {
            setPersonas(personas.data); // Aquí asignas las personas a `Personas`
          } else {
            console.error('Error al obtener personas', personas.error);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };
      
    
    
    const addPersona = async (persona) => {
      try {
        const response = await fetch("http://localhost/Inventario_Profe_Paulo/Api/Persona", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(persona),
        });
    
        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log("Persona agregada:", data);
    
        // Mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Persona agregada!',
          text: 'La persona se ha agregado correctamente.',
          showConfirmButton: false,
          timer: 2500, // Tiempo en milisegundos antes de que se cierre la alerta
          toast: true,
          position: 'top-end',
          timerProgressBar: true,
        });
    
      } catch (error) {
        console.error("Error al agregar persona", error.message);
    
        // Mostrar alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Hubo un problema al agregar la persona: ${error.message}`,
          showConfirmButton: true,
        });
      }
    };
    
    

    useEffect(() => {
        if (qrData) {
            console.log("QR Data actualizado:", qrData);
        }
    }, [qrData]); // Esto se ejecutará cada vez que qrData cambie
    


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

    useEffect(() => {
        console.log("Personas:", Personas);  // Aquí se va a loguear cada vez que `Personas` cambie
    }, [Personas]);  // Dependencia de `Personas`
    
   
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar recarga de la página
    
        const { isConfirmed } = await Swal.fire({
            title: 'Confirmar acción',
            text: '¿Deseas proceder con el registro de esta persona?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        });
    
        // Si el usuario cancela, detenemos la acción
        if (!isConfirmed) {
            return;
        }
    
        // Transforma los datos del formulario
        const transformedData = {
            nombre: formData.nombre,
            apaterno: formData.apaterno,
            amaterno: formData.amaterno,
            telefono: formData.telefono,
            correo: formData.correo,
        };
    
        console.log("Datos a enviar al QR:", transformedData);
    
        // Llamada para agregar la persona a la base de datos
        await addPersona(transformedData);
    
        // Actualiza el estado qrData con los datos transformados para mostrar el QR
        setQrData(`
            Nombre: ${transformedData.nombre} ${transformedData.apaterno} ${transformedData.amaterno}
            Teléfono: ${transformedData.telefono}
            Correo: ${transformedData.correo}
        `);
    
        // Abre el modal con el mensaje de éxito
        handleOpenModal();
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
                                             name="apaterno"
                                          className="form-control"
                                             placeholder="Adame"
                                           value={formData.apaterno}
                                                 onChange={handleChange}
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Materno</label>
                                            <input
                                                name="amaterno"
                                                className="form-control"
                                                placeholder="Buenrostro"
                                                value={formData.amaterno}
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
    <button className="btn-cancel" onClick={handleCloseModal}>
        Cancelar
    </button>
    <button className="btn-accept" type="submit">
        Aceptar
    </button>
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
                                                        <br />
                                                        <div className="text-center">
                                                        <QR value={qrData} />
                                                        </div>
                                                        <br />
                                                        <br />
                                                        <div className="text-center">
                                                            <button className="btn-accept" onClick={handleCloseModal}>  Aceptar </button>
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
    {console.log("Personas:", Personas)}  
    <DTable cols={columnas} info={Personas} />
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
