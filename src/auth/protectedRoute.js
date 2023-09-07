import {Navigate,Link,useOutlet} from 'react-router-dom'
import {useAuth} from  './useAuth'


export default  function   ProtectedRoute(){
    const {user}=useAuth();
    const outlet=useOutlet();

    if(!user){
      return <Navigate to="/" />
    }
   
    return(
    <div>
        <nav>
          <Link to="/settings">Settings</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        {outlet}
      </div>
    )
}