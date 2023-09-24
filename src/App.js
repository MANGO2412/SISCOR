import {Routes,Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import ProtectedRoute from './auth/protectedRoute'
import { AuthLayout } from './auth/authLayout';
import './App.css';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Infradio from './components/master/infradio';
import Infusuario from './components/master/infusuario';
import Infhistorial from './components/master/infhistorial';
import { useAuth } from './auth/useAuth';

const Home=()=>{
  const {user} = useAuth();
  console.log(user.token);
  return (
    
    <div>
    <h1>hell0 world</h1>
    </div>
  )
}


const About=()=>{
  const {user} = useAuth();
  console.log(user.token);
  return(
    <div onLoad={()=>{
      console.log(user.token)
    }}>
      <h1>salio bine el logui</h1>
    </div>
   
  )
}


export const Rutas= createBrowserRouter(
   createRoutesFromElements(
    <Route element={<AuthLayout/>}>
      <Route path="/" element={ <Login/> } />
      <Route  path="/radios" element={<Infradio/>}/>
      <Route path='/usuarios' element={<Infusuario/>}/>
      <Route path='/historial' element={<Infhistorial/>}/>
      
      {/* rutas protegidas */}
      <Route path="/welcome" element={<ProtectedRoute/>}> 
        <Route path="inicio" element={ <Home/> } />
        <Route  path="radios" element={<Infradio/>}/>
        <Route  path="about" element={<About/>}/>
      </Route>         
    </Route>
   )
)

