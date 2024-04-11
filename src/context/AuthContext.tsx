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
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null as UserData | null,
  logout: async () => {},
  loading: true,
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
              setLoading(false); // 사용자 정보가 로드되면 로딩 상태를 false로 설정
            }
          });
        } catch (error) {
          console.error("에러", error);
          setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
