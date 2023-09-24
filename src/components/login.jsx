import * as  React from 'react';
import logo from './img/logo.png';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {useAuth} from '../auth/useAuth'

function Login() {
   const {login}=useAuth();
   const [username,setusername]=React.useState("");
   const [password,setPassword]=React.useState("");


   //function to send data to api
   const handleSubmit =()=>{
      login({username,password});    
   }
   
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:200 }}>
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src={logo} width="280" height="90" />
        <Card.Body>
          <Card.Title style={{ fontSize: 25, marginBottom: 30, marginLeft: 0, fontWeight: 'bolder' }}>Inicio de sesión</Card.Title>
          <div>
            <h2 style={{ fontSize: 20, marginLeft: 0 }}>Correo electrónico</h2>
          </div>
          <Form.Control
            type="email"
            id="inputemail5"
            placeholder='Correo electrónico'
            aria-describedby="emailHelpBlock"
            style={{ width: 380, marginLeft: 0 }}
            onChange={e=>setusername(e.target.value)}
          />
          <Form.Text id="passwordHelpBlock" muted style={{ marginLeft: 0 }}>
            Escribe el email proporcionado por la empresa.
          </Form.Text>
          <div>
            <h2 style={{ fontSize: 20, marginLeft: 0, marginTop: 15 }}>Contraseña</h2>
          </div>
          <Form.Control
            type="password"
            id="inputPassword5"
            placeholder='Contraseña'
            aria-describedby="passwordHelpBlock"
            style={{ width: 380, marginLeft: 0 }}
            onChange={e=>setPassword(e.target.value)}
          />
          <Form.Text id="passwordHelpBlock" muted style={{ marginLeft: 0, marginRight: 0 }}>
            Tu contraseña debe contener al menos 5 caracteres o más.
          </Form.Text>
          <button onClick={handleSubmit} style={{ backgroundColor: '#a78455', color: 'white', padding: '10px 10px', borderRadius: '5px', border: 1, marginTop: 20, marginLeft:160 }}>
            Iniciar sesión
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
