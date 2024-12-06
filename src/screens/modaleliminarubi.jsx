import React from "react";

export const ModalDelete = ({ item, onClose, onDelete }) => {
  const handleDelete = () => {
    // Llama a onDelete pasando el id del item
    Swal.fire({
      title: "¿Estás seguro?",
      text: `El mobiliario "${item.nombre}" será eliminado.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(item.id); // Llama a la función onDelete pasada como prop
      }
    });
  };

  return (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar Mobiliario</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar el mobiliario "{item.nombre}"?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
