import { Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Login from "../pages/Authentication/Login";
import AddNewAdmin from "../pages/Home/AddNewAdmin";
import Dashoboard from "../pages/Dashboard/Dashoboard";
import Gallery from "../pages/GalleryPhoto/Gallery";
import News from "../pages/News&Event/News";
import Event from "../pages/News&Event/Event";
import CommitteeYear from "../pages/Committee/CommitteeYear";
import AllCommittee from "../pages/AllCommittee/AllCommittee";
import User from "../pages/User/User";
import AllFee from "../pages/AllFee/AllFee";
import AdminList from "../pages/Home/AdminList";
import DonationDetails from "../pages/User/DonationDetails";
import Notification from "../pages/Notification/Notification";
import SingleMessage from "../pages/Message/SingleMessage";
export default function Routers() {
  return (
    <Routes>
      <Route element={<PrivateRouter />}>
        <Route path="/users" element={<User />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Event />} />
        <Route path="/" element={<Dashoboard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/committee-year" element={<CommitteeYear />} />
        <Route path="/committee" element={<AllCommittee />} />
        <Route path="/addAdmin" element={<AddNewAdmin />} />
        <Route path="/all-fee" element={<AllFee />} />
        <Route path="/all-admin" element={<AdminList />} />
        <Route path="/donations/:memberID" element={<DonationDetails />} />
        <Route path="/message/:id" element={<SingleMessage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
