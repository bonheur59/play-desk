import { useContext, useEffect, useState } from "react";
import Router from "./components/Router";
import "./App.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseApp";


import AuthContext from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function App() {
  const auth = getAuth(app);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //auth를 체크하기 전(initallize 전)에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);
  //auth의 CurrentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  console.log(user?.isSeller)

  useEffect(() => {
    onAuthStateChanged(auth, (userState) => {
      if (userState) {
        setIsAuthenticated(true);
        if (user?.isSeller) {
          navigate(`/seller/list`);
        } else {
          navigate(`/shop`);
        }
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>

        {init ? <Router isAuthenticated={isAuthenticated} /> : "loading"}
   

    </>
  );
}

export default App;
