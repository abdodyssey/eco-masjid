import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MasjidList from "./pages/MasjidList";
import ArtikelList from "./pages/ArtikelList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import KampanyeForm from "./pages/KampanyeForm";
import KalkulatorKarbon from "./pages/KalkulatorKarbon";
import ArtikelDetail from "./components/ArtikelDetail";
import EventList from "./pages/EventList";
import PengajuanMasjidForm from "./pages/PengajuanMasjidForm";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddEvent from "./pages/AddEvent";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  return (
      <>
        <div className="w-full mx-auto bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/masjid" element={<MasjidList />} />
            <Route path="/artikel" element={<ArtikelList />} />
            <Route path="/kampanye" element={<KampanyeForm />} />
            <Route path="/kalkulator" element={<KalkulatorKarbon />} />
            <Route path="/artikel/:id" element={<ArtikelDetail />} />
            <Route path="/event" element={<EventList />} />
            <Route path="/pengajuan" element={<PengajuanMasjidForm />} />
            <Route path="/admin/event/tambah" element={<AddEvent />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </div>


        <ScrollToTopButton />
      </>
  );
}

export default App;