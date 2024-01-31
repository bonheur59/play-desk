import { useEffect, useState } from "react";
import Router from "./components/Router";
import "./App.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseApp";
// import { getUserDataFromFirestore } from "./firebaseUtil";

function App() {
  const auth = getAuth(app);
  //auth를 체크하기 전(initallize 전)에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);
  //auth의 CurrentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return <>{init ? <Router isAuthenticated={isAuthenticated} /> : "loading"}</>;
}

export default App;
