
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../../../../../app/hooks/useAuth";



const ProtectedRoute = () => {
  const navigate = useNavigate()
  
  const location = useLocation();
  const { currentUser, isLoading: userIsLoading } = useAuth();

  // console.log(location.pathname);

  const adminAllowed = !userIsLoading
    && currentUser
    && currentUser.name === 'Shamil'
    && currentUser.status === 'admin'
    && location.pathname.includes('admin');

  
  // console.log(adminAllowed)

  useEffect(() => {
    if (!adminAllowed) {
      navigate('home')
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  if (adminAllowed) {
    return <Outlet/>;
  }



}

export default ProtectedRoute;