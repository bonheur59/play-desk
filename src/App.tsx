import { useEffect, useState } from "react";
import Router from "./components/Router";
import "./App.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseApp";
import { getUserDataFromFirestore } from "./firebaseUtil";

function App() {
  const auth = getAuth(app);
  //auth를 체크하기 전(initallize 전)에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);
  //auth의 CurrentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
  const [isSeller, setIsSeller] = useState<boolean | null>(null); // isSeller 상태 추가

  //auth값이 바뀔때마다 AuthState가 실시간으로 반영됨
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        setIsAuthenticated(true);
        try {
          // 사용자가 인증된 경우에만 Firestore에서 사용자 데이터를 가져와 isSeller 값을 설정
          const userData = await getUserDataFromFirestore(user.uid);
          console.log("유저데이터", userData);
          if (userData) {
            setIsSeller(userData.isSeller);
          }
        } catch (error) {
          console.error(
            "Firestore에서 사용자 데이터를 가져오는 중 오류 발생:",
            error
          );
        }
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      {init ? (
        <Router isAuthenticated={isAuthenticated} isSeller={isSeller} />
      ) : (
        "loading"
      )}
    </>
  );
}

export default App;
