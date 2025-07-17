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
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
