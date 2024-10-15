import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';

export const DTable = ({ cols, info }) => {

    const columnas = cols;

    const data = info;

    return (
        <DataTable
			columns={columnas}
			data={data}
		/>
    )
}

DTable.defaultProps = {
    cols: [
        {
            name: 'Identificador',
            selector: row=> row.matricula
        },
        {
            name: 'Nombre',
            selector: row=> row.nombre
        },
        {
            name: 'A. Paterno',
            selector: row=> row.paterno
        },
        {
            name: 'A. Materno',
            selector: row=> row.materno
        },
        {
            name: 'Teléfono',
            selector: row=> row.telefono
        },
        {
            name: 'Correo',
            selector: row=> row.correo
        },
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