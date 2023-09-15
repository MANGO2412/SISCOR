import {Navigate,Link,useOutlet} from 'react-router-dom'
import {useAuth} from  './useAuth'


export default  function   ProtectedRoute(){
    const {user,logout}=useAuth();
    const outlet=useOutlet();

    if(!user){
      return <Navigate to="/" />
    }
   
    return(
    <div>
        {/* nav para cuando el usuario  este logeado */}
        <nav>
          <Link to="/settings">Settings</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={()=>{logout()}}>cerrar session</button>
        </nav>
        {outlet}
      </div>
    )
}