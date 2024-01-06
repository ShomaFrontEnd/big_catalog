import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import sessionStorageService from '../services/sessionstorage.service';
import { useNavigate } from 'react-router-dom';
import getErrorMessage from '../utils/errorCatcher';



const AuthContext = React.createContext();
export const useAuth = () => { return useContext(AuthContext) }


//--------PROVIDER ----------------------------------------------------------------------------------------

const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionStorageService.getAccessToken()) {
      getCurrentUserData()
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error, { autoClose: 2000, });
      setError(null);
    }
  }, [error]);


  const logIn = async ({ email, password }) => {
    try {
      const data = await authService.login({ email, password });
      sessionStorageService.setTokens(data)
      await getCurrentUserData();
      navigate('/home')
    } catch (error) {
      // console.log(error)
      errorCatcher(error)
    }
  }

  const logOut = () => {
    console.log('logout')
    sessionStorageService.removeAuthData();
    setCurrentUser(null)
    navigate('/home')
  }


  async function getCurrentUserData() {

    try {
      const localUserId = sessionStorageService.getUserId();
      const { data } = await userService.get(localUserId);
      setCurrentUser(data.content);
    } catch (error) {
      errorCatcher(error)
    } finally { setLoading(false); }

  }


  //--- SUPPORT FUNCS --------------------------------------------------------------
  function errorCatcher(error) {
    setError(getErrorMessage(error));
  }






  return (

    <AuthContext.Provider value={{ logIn, currentUser, isLoading, logOut }}>
      {!isLoading ? children : 'Загрузка...'}
    </AuthContext.Provider>
  )


}

export default AuthProvider;






