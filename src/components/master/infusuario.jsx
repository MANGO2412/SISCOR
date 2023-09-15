import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Infusuario() {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellido: "",
    usuario: "",
    correo: "",
    contraseña: "",
    nivelUsuario: ""
  });

  const [usuarios, setUsuarios] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navbarStyle = {
    backgroundColor: '#60182c',
    color: 'white',
    height: 80
  };

  const TableStyle = {
    backgroundColor: '#60182c',
    color: 'white',
  };

  useEffect(() => {
    fetch("http://localhost:3300/usuarios")
      .then((response) => response.json())
      .then((data) => {
        // Verificar si la respuesta es un array o no
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          console.error("La respuesta de la API no es un array:", data);
        }
      })
      .catch((error) => {
        console.error("Error al cargar datos de la API:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedUserId(null);
    setFormData({
      id: "",
      nombre: "",
      apellido: "",
      usuario: "",
      correo: "",
      contraseña: "",
      nivelUsuario: ""
    });
  };

  const handleInsertButtonClick = () => {
    setShowModal(true);
    setEditMode(false);
    setSelectedUserId(null);
  };

  const handleEditButtonClick = (userId) => {
    setShowModal(true);
    setEditMode(true);
    setSelectedUserId(userId);

    const selectedUser = usuarios.find((user) => user.ID === userId);
    setFormData({ ...selectedUser });
  };

  const handleInsertSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = [...usuarios];

    if (editMode) {
      const userIndex = updatedUsers.findIndex((user) => user.ID === selectedUserId);
      updatedUsers[userIndex] = formData;
    } else {
      const newUserId = usuarios.length + 1;
      updatedUsers.push({ ...formData, id: newUserId });
    }
    setUsuarios(updatedUsers);

    handleModalClose();
  };

  const filteredUsers = usuarios.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar style={{ backgroundColor: '#60182c', color: 'white', height: 80 }} variant="dark" responsive>
        <Container>
          <Navbar.Brand href="#zi">
            <img
              alt=""
              src="https://www.seguridadbc.gob.mx/images/top.png"
              width="415"
              height="70"
              className="d-inline-block align-top"
              style={{ justifyContent: 'left', marginLeft: -280 }}
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <h1>Lista de Usuarios</h1>
      {/* Campo de búsqueda */}
      <Form.Group controlId="formSearch">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <br></br>
      <Button variant="warning" onClick={handleInsertButtonClick}>
        Insertar
      </Button>
      <Table striped responsive="sm" bordered hover>
        <thead>
          <tr>
            <th style={TableStyle}>ID</th>
            <th style={TableStyle}>Nombre</th>
            <th style={TableStyle}>Apellido</th>
            <th style={TableStyle}>Usuario</th>
            <th style={TableStyle}>Correo</th>
            <th style={TableStyle}>Contraseña</th>
            <th style={TableStyle}>Nivel_Uusario</th>
            <th style={TableStyle}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.ID}>
              <td>{user.ID}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.usuario}</td>
              <td>{user.correo ? (user.correo):(
                <p>sin correo</p>
              )}</td>
              <td>{user.contrasenia}</td>
              <td>{user.Nivel_Usuario}</td>
              <td>
                <button onClick={() => handleEditButtonClick(user.ID)}>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Ventana Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Editar Usuario" : "Insertar Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInsertSubmit}>
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formUsuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCorreo">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="text"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formContraseña">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formNivelUsuario">
              <Form.Label>Nivel de Usuario</Form.Label>
              <Form.Control
                as="select"
                name="nivelUsuario"
                value={formData.nivelUsuario}
                onChange={handleInputChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Control>
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">
              {editMode ? "Guardar Cambios" : "Insertar"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Infusuario;