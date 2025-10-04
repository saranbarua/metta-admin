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
import AdminList from "../pages/Home/AdminList";
import AllYouTube from "../pages/Youtube/AllYoutube";
export default function Routers() {
  return (
    <Routes>
      <Route element={<PrivateRouter />}>
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Event />} />
        <Route path="/" element={<Dashoboard />} />
        <Route path="/youtube" element={<AllYouTube />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/committee-year" element={<CommitteeYear />} />
        <Route path="/committee" element={<AllCommittee />} />
        <Route path="/addAdmin" element={<AddNewAdmin />} />
        <Route path="/all-admin" element={<AdminList />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
