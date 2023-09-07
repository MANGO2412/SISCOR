import {Routes,Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import ProtectedRoute from './auth/protectedRoute'
import { AuthLayout } from './auth/authLayout';
import './App.css';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Infradio from './components/master/infradio';

const Home=()=>{
  return (
    <div>
    <h1>hell0 world</h1>
  </div>
  )
}


const About=()=>{
  return(
    <div>
      <h1>esto es una pagina sobre</h1>
    </div>
  )
}


export  const Rutas= createBrowserRouter(
   createRoutesFromElements(
    <Route element={<AuthLayout/>}>
      <Route path="/" element={ <Login/> } />
      <Route  path="/radios" element={<Infradio/>}/>

      <Route path="/welcome" element={<ProtectedRoute/>}> 
        <Route path="inicio" element={ <Home/> } />
        <Route  path="about" element={<About/>}/>
      </Route>         
    </Route>
   )
)

