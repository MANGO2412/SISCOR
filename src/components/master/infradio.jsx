import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAuth } from "../../auth/useAuth";

function Infradio() {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);

  const [editFormData, setEditFormData] = useState({
    No_inventario: "",
    RFSI: "",
    Modelo: "",
    Situacion: ""
  });

  const [insertFormData, setInsertFormData] = useState({
    No_inventario: "",
    RFSI: "",
    Serie: "",
    Modelo: "",
    Situacion: ""
  });

  const [radioData, setRadioData] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/radios", {
      headers: {
        "x-access-token": user.token
      }
    })
      .then((response) => {
        setRadioData(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar datos de la API:", error);
      });
  }, []);

  const handleEditModalOpen = (radio) => {
    setSelectedRadio(radio);
    setEditFormData({
      No_inventario: radio.No_inventario,
      RFSI: radio.RFSI,
      Modelo: radio.Modelo,
      Situacion: radio.Situacion.Situacion || ""
    });
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleInsertModalOpen = () => {
    setShowInsertModal(true);
  };

  const handleInsertModalClose = () => {
    setShowInsertModal(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleInsertInputChange = (e) => {
    const { name, value } = e.target;
    setInsertFormData({ ...insertFormData, [name]: value });
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/radios/update/${selectedRadio.Serie}`, editFormData, {
      headers: {
        "x-access-token": user.token
      }
    })
      .then((response) => {
        setRadioData(response.data);
        setShowEditModal(false);
        setSelectedRadio(null);
      })
      .catch((error) => {
        console.log(error);
        console.error("Error al cargar datos de la API:", error);
      });
  };

  const handleInsertSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/radios/add", insertFormData, {
      headers: {
        "x-access-token": user.token
      }
    })
      .then((response) => {
        setRadioData(response.data);
        setShowInsertModal(false);
      })
      .catch((error) => {
        console.log(error);
        console.error("Error al cargar datos de la API:", error);
      });
  };

  const navbarStyle = {
    backgroundColor: '#60182c',
    color: 'white',
    height: 80
  };

  const TableStyle = {
    backgroundColor: '#60182c',
    color: 'white',
  };
  

  const [selectedFilter, setSelectedFilter] = useState("");
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };
  
  const filteredRadios = radioData.filter((radio) => {
    const isInFilter = selectedFilter === "" || radio.Situacion.Situacion === selectedFilter;
    const matchesSearchTerm = radio.RFSI.toLowerCase().includes(searchTerm.toLowerCase());
    return isInFilter && matchesSearchTerm;
  });

  return (
    <div>
      <Navbar style={navbarStyle} variant="dark">
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
      {/* Campo de búsqueda */}
      <Form.Group controlId="formSearch">
        <Form.Control
          type="text"
          placeholder="Buscar por RFSI"
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="rounded-pill"
          style={{ borderColor: '#007BFF', width: '290px', height: '30px' }}
        />
      </Form.Group>
      <br></br>
      <button variant="primary" onClick={handleInsertModalOpen}>Crear nuevo radio</button>
    
      <h2>Filtro</h2>
      {/* Filtro por estado */}
      <Form.Group controlId="formFilter">
        <Form.Label>Filtrar por Estado</Form.Label>
        <Form.Control
          as="select"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          <option value="En servicio bajo resguardo">En servicio bajo resguardo</option>
          <option value="Préstamo Diario">Prestamo Diario</option>
        </Form.Control>
      </Form.Group>

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
          {filteredRadios.map((radio) => (
            <tr key={radio.Serie}>
              <td>{radio.No_inventario}</td>
              <td>{radio.RFSI}</td>
              <td>{radio.Serie}</td>
              <td>{radio.Modelo}</td>
              <td>{radio.Situacion.Situacion ? radio.Situacion.Situacion : <p>no hay ningun radio</p>}</td>
              <td>
                <button variant="primary" onClick={() => handleEditModalOpen(radio)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de modificar las radios */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar el radio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formNo_inventario">
              <Form.Label>no.Inventario</Form.Label>
              <Form.Control
                type="text"
                name="No_inventario"
                value={editFormData.No_inventario}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRFSI">
              <Form.Label>RFSI</Form.Label>
              <Form.Control
                type="text"
                name="RFSI"
                value={editFormData.RFSI}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="Modelo"
                value={editFormData.Modelo}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSituacion">
              <Form.Label>Situacion</Form.Label>
              <Form.Control
                as="select"
                name="Situacion"
                value={editFormData.Situacion}
                onChange={handleEditInputChange}
              >
                <option value='1'>A disposicion del ministerio</option>
                <option value='2'>En acta de Entreg-Recepcion</option>
                <option value='3'>En proceso de Entrega</option>
                <option value='4'>En reparacion de Programacion</option>
                <option value='5'>En servicio bajo resguardo</option>
                <option value='6'>Extraviado</option>
                <option value='7'>Garantia</option>
                <option value='8'>Para Baja</option>
                <option value='9'>Para enviar al distrito</option>
                <option value='10'>Para entregar al oficial</option>
                <option value='11'>Para reparacion</option>
                <option value='12'>Prestamo Diario</option>
                <option value='13'>Prestamo provisional</option>
                <option value='14'>Popiedad del Estado</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Modificar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para insertar nuevas radios */}
      <Modal show={showInsertModal} onHide={handleInsertModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Insertar nuevo radio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInsertSubmit}>
            <Form.Group controlId="formNo_inventario">
              <Form.Label>no.Inventario</Form.Label>
              <Form.Control
                type="text"
                name="No_inventario"
                value={insertFormData.No_inventario}
                onChange={handleInsertInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRFSI">
              <Form.Label>RFSI</Form.Label>
              <Form.Control
                type="text"
                name="RFSI"
                value={insertFormData.RFSI}
                onChange={handleInsertInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSerie">
              <Form.Label>Serie</Form.Label>
              <Form.Control
                type="text"
                name="Serie"
                value={insertFormData.Serie}
                onChange={handleInsertInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="Modelo"
                value={insertFormData.Modelo}
                onChange={handleInsertInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSituacion">
              <Form.Label>Situacion</Form.Label>
              <Form.Control
                as="select"
                name="Situacion"
                value={insertFormData.Situacion}
                onChange={handleInsertInputChange}
              >
                <option value="1">A disposicion del ministerio</option>
                <option value="2">En acta de Entreg-Recepcion</option>
                <option value="3">En proceso de Entrega</option>
                <option value="4">En reparacion de Programacion</option>
                <option value="5">En servicio bajo resguardo</option>
                <option value="6">Extraviado</option>
                <option value="7">Garantia</option>
                <option value="8">Para Baja</option>
                <option value="9">Para enviar al distrito</option>
                <option value="10">Para entregar al oficial</option>
                <option value="11">Para reparacion</option>
                <option value="12">Prestamo Diario</option>
                <option value="13">Prestamo provisional</option>
                <option value="14">Popiedad del Estado</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Crear radio
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Infradio;