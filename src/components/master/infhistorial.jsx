import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Infhistorial() {
  const navbarStyle = {
    backgroundColor: '#60182c',
    color: 'white',
    height: 80,
  };

  const TableStyle = {
    backgroundColor: '#60182c',
    color: 'white',
  };

  const [filterType, setFilterType] = useState("fecha");
  const [searchValue, setSearchValue] = useState("");

   const [data, setData] = useState([
    {
      id: 1,
      fecha: "2023-09-12",
      usuario: "Jose Ramirez",
      radio: "N/D",
      accion: "Ingreso al sistema",
    },
    {
      id: 2,
      fecha: "2023-09-12",
      usuario: "Josue Jimenez",
      radio: "77612924",
      accion: "Modifico el modelo",
    },
    {
      id: 3,
      fecha: "2023-09-12",
      usuario: "Ana Breton",
      radio: "98607997",
      accion: "Elimino su serie",
    },
    {
        id: 4,
        fecha: "2023-08-10",
        usuario: "Julian Perez",
        radio: "98607996",
        accion: "Modifico su RFSI",
      },
      {
        id: 5,
        fecha: "2022-07-11",
        usuario: "Luis Lopez",
        radio: "98607995",
        accion: "Elimino su Modelo",
      },
      {
        id: 6,
        fecha: "2023-09-12",
        usuario: "Ana Breton",
        radio: "98607997",
        accion: "Ingreso nueva Serie",
      },
  ]);

  const [filteredData, setFilteredData] = useState(data);

  function handleSearch() {
    // Filtra los datos basados en el tipo de filtro y el valor de búsqueda
    const filteredData = data.filter((item) => {
      if (filterType === "fecha") {
        return item.fecha === searchValue;
      } else if (filterType === "usuario") {
        return item.usuario.includes(searchValue);
      } else if (filterType === "radio") {
        return item.radio === searchValue;
      }
      return false;
    });
    setFilteredData(filteredData);
  }

  return (
    <div>
      <Navbar style={navbarStyle} variant="dark" responsive>
        <Container>
          <Navbar.Brand href="#zi">
            <img
              alt=""
              src="https://www.seguridadbc.gob.mx/images/top.png"
              width="420"
              height="70"
              className="d-inline-block align-top"
              style={{ justifyContent: 'left', marginLeft: -280 }}
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <body>
        <h1>Historial</h1>
        <div>
          <label htmlFor="filterType">Buscar por:</label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="fecha">Fecha</option>
            <option value="usuario">Usuario</option>
            <option value="radio">Radio</option>
          </select>
          <input
            type="text"
            id="searchValue"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={() => handleSearch()}>Buscar</button>
        </div>
        <Table striped responsive="sm" bordered hover>
          <thead>
            <tr>
              <th style={TableStyle}>ID</th>
              <th style={TableStyle}>Fecha</th>
              <th style={TableStyle}>Usuario</th>
              <th style={TableStyle}>Radio</th>
              <th style={TableStyle}>Accion</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fecha}</td>
                <td>{item.usuario}</td>
                <td>{item.radio}</td>
                <td>{item.accion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </body>
    </div>
  );
}

export default Infhistorial;