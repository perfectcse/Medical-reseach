import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import SummaryCard from "./components/SummaryCard";
import Publications from "./components/Publications";
import Trials from "./components/Trials";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (disease, query) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/search?disease=${disease}&query=${query}`
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">🧠 Medical Research Assistant</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="loading">Loading...</p>}

      {data && (
        <>
          <SummaryCard summary={data.aiResponse} />
          <Publications publications={data.publications} />
          <Trials trials={data.clinicalTrials} />
        </>
      )}
    </div>
  );
}

export default App;