const KalkulatorForm = ({ hitungKarbon, handleChange, handleReset, data }) => {
  return (
    <form onSubmit={hitungKarbon} className="space-y-4 mb-6">
      <input
        type="number"
        name="listrik"
        placeholder="Penggunaan listrik (kWh/bulan)"
        value={data.listrik}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        min={0}
      />
      <input
        type="number"
        name="air"
        placeholder="Penggunaan air (m³/bulan)"
        value={data.air}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        min={0}
      />
      <input
        type="number"
        name="plastik"
        placeholder="Pemakaian plastik (kg/bulan)"
        value={data.plastik}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        min={0}
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-emerald-700 text-white px-6 py-2 rounded hover:bg-emerald-800"
        >
          Hitung Jejak Karbon
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </form>



    
  );
};
export default KalkulatorForm;
