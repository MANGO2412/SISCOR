import React from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Infradio() {
  const navbarStyle = {
    backgroundColor: '#60182c', // Establece el color de fondo a "#60182c"
    color: 'white', // Cambia el color del texto a blanco
    height: 70
  };
  
  return (
    <div>
      <Navbar style={navbarStyle} variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="./logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Table striped responsive="sm" bordered>
        <thead>
          <tr>
            <th>No.inv</th>
            <th>RFSI</th>
            <th>Serie</th>
            <th>Modelo</th>
            <th>Rango</th>
            <th>Grupo Explicito</th>
            <th>Estado</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2356</td>
            <td>77612924</td>
            <td>SDF4521GV</td>
            <td>TPH900</td>
            <td>Todos los distritos</td>
            <td>Turistic</td>
            <td>Distrito de la presa</td>
            <td>Editar</td>
          </tr>
          <tr>
            <td>2356</td>
            <td>77612924</td>
            <td>SDF4521GV</td>
            <td>TPH900</td>
            <td>Todos los distritos</td>
            <td>Turistic</td>
            <td>Distrito de la presa</td>
            <td>Editar</td>
          </tr>
          <tr>
            <td>2356</td>
            <td>77612924</td>
            <td>SDF4521GV</td>
            <td>TPH900</td>
            <td>Todos los distritos</td>
            <td>Turistic</td>
            <td>Distrito de la presa</td>
            <td>Editar</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Infradio;
