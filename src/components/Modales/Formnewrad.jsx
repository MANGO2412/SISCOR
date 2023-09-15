import React, {useState} from "react";
import Form from 'react-bootstrap/Form';

const NewRadio = ({closeModal}) => {
    const [state, setState] = useState({
        No_inv: '',
        RFSI: '',
        Serie: '',
        Modelo: '',
        Rango: '',
        Grupoexp: '',
        estado:'',
    });


const finalSubmit = () => {
    if (state.No_inv && state.RFSI) {
      console.log(state); // Mostrar datos del formulario en la consola
      toast.success('Form submitted successfully');
    } else {
      toast.error('Please fill up all input fields');
    }
  };

const inputHandle = (name, value) => {
    setState((prevState) => ({
        ...prevState,
        [name]: value
    }));
};

return(
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

        <div
        style={{
          width: 370,
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: '#FFF',
          padding: 16
        }}
        >
           <div>
            <h3 style={{ marginTop: 12, marginBottom: 10, fontSize: 22 }}>Crear nuevo radio</h3>
           </div> 
           <div style={{ marginBottom:8}}>
            <h2 style={{ marginTop: 0, fontSize: 16 }}>No.inv</h2>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Numero de inventario</Form.Label>
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
           </div>
        </div>
    </div>
)
}