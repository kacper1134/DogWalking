import { Route, Routes } from "react-router";
import ProfileDetails from "../components/Profile/UserSection/ProfileDetails";

const ProfilePage = () => {
  return (
    <Routes>
      <Route path="details" element={<ProfileDetails />}></Route>
    </Routes>
  );
};

export default ProfilePage;
