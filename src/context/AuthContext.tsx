import { ReactNode, createContext, useState, useEffect } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserDataFromFirestore } from "../firebaseUtil";
import { app } from "@/firebaseApp";

interface AuthProps {
  children: ReactNode;
}

interface UserData {
  email: string;
  nickName: string;
  isSeller: boolean;
  uid: string;
}

const AuthContext = createContext({
  user: null as UserData | null,
});

export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userData = await getUserDataFromFirestore(user.uid);

          if (userData) {
            console.log("유저데이터", userData);
            setCurrentUser({
              email: userData.email,
              nickName: userData.nickName,
              isSeller: userData.isSeller,
              uid: userData.uid,
            });
          }
        } catch (error) {
          console.error("에러", error);
        }
      } else {
        setCurrentUser(user);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
