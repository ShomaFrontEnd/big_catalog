import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";


const LogOut = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    logOut();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ('Загрузка...');
}

export default LogOut;