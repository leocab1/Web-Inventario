// ModalEdit.js
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export const ModalEdit = ({ item, onClose, onSave }) => {
  const [editedItem, setEditedItem] = useState(item);

  useEffect(() => {
    setEditedItem(item); // Set item values on load
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!editedItem.nombre.trim() || !editedItem.descripcion.trim() || !editedItem.codigo.trim() || !editedItem.tipo.trim()) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de guardar.",
        toast: true,
        position: "top-end",
        timer: 2500,
        timerProgressBar: true,
      });
      return;
    }
    
    try {
      const response = await fetch(`http://localhost/Inventario_Profe_Paulo/Api/Mobiliario/${editedItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedItem),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      }

      onSave(editedItem);
      Swal.fire({
        icon: "success",
        title: "¡Mobiliario actualizado!",
        text: "Los datos se han actualizado correctamente.",
        toast: true,
        position: "top-end",
        timer: 2500,
        timerProgressBar: true,
      });
      onClose();
    } catch (error) {
      console.error("Error al actualizar mobiliario:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema al actualizar el mobiliario: ${error.message}`,
      });
    }
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Mobiliario</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={editedItem.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Descripción:</label>
                <input
                  type="text"
                  name="descripcion"
                  className="form-control"
                  value={editedItem.descripcion}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Codigo:</label>
                <input
                  type="text"
                  name="codigo"
                  className="form-control"
                  value={editedItem.codigo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Ubicación:</label>
                <input
                  type="text"
                  name="ubicacion"
                  className="form-control"
                  value={editedItem.ubicacion}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                                            <label>Tipo:</label>
                                            <select
                                                name="tipo"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={editedItem.tipo}
                                                required
                                            >
                                                <option value="">Seleccione un tipo</option>
                                                <option value="Escritorio">Escritorio</option>
                                                <option value="Silla">Silla</option>
                                                <option value="Armario">Armario</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
