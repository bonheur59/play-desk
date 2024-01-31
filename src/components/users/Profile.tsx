import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebaseApp";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log("마이페이지에서 불러온 context", user);

  const onSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Profile_box">
      프로필페이지입니다.
      <div className="flex_box-lg">
        <div className="profile_image">
          <div>
            <div className="profile_email">{user?.email}</div>
            <div className="profile_name">{user?.nickName || "사용자"}</div>
          </div>
        </div>
        <div role="presentation" className="profile_logout" onClick={onSignOut}>
          로그아웃
        </div>
      </div>
      //{" "}
    </div>
  );
};

export default Profile;
