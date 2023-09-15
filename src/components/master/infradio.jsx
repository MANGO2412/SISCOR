import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Infradio() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    no_inv: "",
    RFSI: "",
    Serie: "",
    Modelo: "",
    Estado: ""
  });
  const [radioData, setRadioData] = useState([]);

  useEffect(() => {
    // Realiza la solicitud a la API utilizando Axios
    axios.get("http://localhost:3300/radios")
      .then((response) => {
        // Actualiza el estado con los datos de la API
        setRadioData(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar datos de la API:", error);
      });
  }, []);

  const navbarStyle = {
    backgroundColor: '#60182c',
    color: 'white',
    height: 80
  };

  const TableStyle = {
    backgroundColor: '#60182c',
    color: 'white',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInsertButtonClick = () => {
    setShowModal(true);
  };

  const handleInsertSubmit = (e) => {
    e.preventDefault();
    console.log("Datos a insertar:", formData);
    setShowModal(false);
  };

  return (
    <div>
      <Navbar style={navbarStyle} variant="dark" >
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
      
        <h1>Lista de radios</h1>
        {/* <Button variant="primary" onClick={handleInsertButtonClick}>
          Insertar
        </Button> */}
        <Table striped responsive="sm" bordered hover>
          <thead>
            <tr>
              <th style={TableStyle}>No.inv</th>
              <th style={TableStyle}>RFSI</th>
              <th style={TableStyle}>Serie</th>
              <th style={TableStyle}>Modelo</th>
              <th style={TableStyle}>Situacion</th>
              <th style={TableStyle}>Accion</th>
            </tr>
          </thead>
          <tbody>
            {radioData.map((radio) => (
              <tr key={radio.Serie}>
                <td>{radio.no_inventario}</td>
                <td>{radio.rfsi}</td>
                <td>{radio.Serie}</td>
                <td>{radio.modelo}</td>
                <td>{radio.situacion}</td>
                <td>
                  {/* <button variant="primary" onClick={handleInsertButtonClick}>
                    Editar
                  </button> */}
                  <button>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Insertar nuevo radio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleInsertSubmit}>
              <Form.Group controlId="formno_inv">
                <Form.Label>No_inv</Form.Label>
                <Form.Control
                  type="text"
                  name="no_inv"
                  value={formData.no_inv}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {/* Resto de los campos de formulario aquí */}
              <Button variant="primary" type="submit">
                Insertar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
    </div>
  );
}

export default Infradio;
