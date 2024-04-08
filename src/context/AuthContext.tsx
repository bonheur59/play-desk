import { ReactNode, createContext, useState, useEffect } from "react";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getUserDataFromFirestore } from "../firebaseUtil";
import { app, db } from "@/firebaseApp";
import { doc, onSnapshot } from "firebase/firestore";
import { Auth } from "firebase/auth/cordova";

interface AuthProps {
  children: ReactNode;
}

interface UserData {
  email: string;
  nickName: string;
  isSeller: boolean;
  uid: string;
}

interface AuthContextType {
  user: UserData | null;
  logout: () => Promise<void>; // logout 함수의 타입 추가
}

const AuthContext = createContext<AuthContextType>({
  user: null as UserData | null,
  logout: async () => {},
});

export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "User", user.uid);
          onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              const user = {
                email: data.email,
                nickName: data.nickName,
                isSeller: data.isSeller,
                uid: data.uid,
              };
              setCurrentUser(user);
            }
          });
          // const userData = await getUserDataFromFirestore(user.uid);
          // console.log("유저데이터", userData);

          // if (userData) {
          //   setCurrentUser({
          //     email: userData.email,
          //     nickName: userData.nickName,
          //     isSeller: userData.isSeller,
          //     uid: userData.uid,
          //   });
          // }
        } catch (error) {
          console.error("에러", error);
        }
      } else {
        setLoading(false);
      }
    });
  }, [auth]);
  console.log("커런트 유저", currentUser);



  return (
    <AuthContext.Provider value={{ user: currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
