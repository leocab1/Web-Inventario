import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';

const defaultValues = {
    cols: [
        {
            name: 'Identificador',
            selector: row => row.matricula
        },
        {
            name: 'Nombre',
            selector: row => row.nombre
        },
        {
            name: 'A. Paterno',
            selector: row => row.paterno
        },
        {
            name: 'A. Materno',
            selector: row => row.materno
        },
        {
            name: 'Teléfono',
            selector: row => row.telefono
        },
        {
            name: 'Correo',
            selector: row => row.correo
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <div>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>Borrar</button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ],
    info: [
        {
            id: 1,
            matricula: "ZAQ0001",
            nombre: "Ana",
            paterno: "De",
            materno: "Armas",
            telefono: "12346679",
            correo: "anadearmas@gotmail.com"
        },
        {
            id: 2,
            matricula: "ZAQ0002",
            nombre: "Pedro",
            paterno: "Balmaceda",
            materno: "Pascal",
            telefono: "111555999",
            correo: "pedropascal@mymail.com"
        },
    ]
}

const handleEdit = (row) => {
    console.log("Editar persona:", row);
    // Aquí puedes agregar la lógica para abrir un modal o formulario de edición.
};

const handleDelete = (id) => {
    console.log("Eliminar persona con ID:", id);
    // Aquí puedes agregar la lógica para eliminar la persona, posiblemente con una confirmación.
};

export const DTable = ({ cols = defaultValues.cols, info = defaultValues.info }) => {
    return (
        <DataTable
            columns={cols}
            data={info}
        />
    )
}

DTable.propTypes = {
    cols: PropTypes.array,
    info: PropTypes.array,
};
