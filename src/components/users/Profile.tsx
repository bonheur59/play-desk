import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebaseApp";
import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const auth = getAuth(app);
  console.log(auth);

  const onSignOut = async () => {
    try {
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
            <div className="profile_email">{auth?.currentUser?.email}</div>
            <div className="profile_name">
              {auth?.currentUser?.displayName || "사용자"}
            </div>
          </div>
        </div>
        <div role="presentation" className="profile_logout" onClick={onSignOut}>
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default Profile;
