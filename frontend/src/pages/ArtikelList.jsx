import { useEffect, useState } from "react";
import axios from "axios";
import ArtikelCard from "../components/ArtikelCard";

function ArtikelList() {
  const [artikelList, setArtikelList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/artikel").then((res) => {
      setArtikelList(res.data);
    });
  }, []);

  return (
    <section className="max-w-4xl mx-auto py-8 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4 text-center">
        Artikel Edukasi Islam & Lingkungan
      </h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        Bacaan singkat seputar ajaran Islam dalam menjaga bumi dan mengelola sumber daya dengan bijak.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {artikelList.map((artikel) => (
          <ArtikelCard key={artikel._id} artikel={artikel} />
        ))}
      </div>
    </section>
  );
}

export default ArtikelList;
