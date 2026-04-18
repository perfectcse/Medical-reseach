const axios = require("axios");

const fetchOpenAlexData = async (query) => {
  try {
    const url = `https://api.openalex.org/works?search=${query}&per-page=5`;

    const response = await axios.get(url);

    const results = response.data.results.map((item) => ({
      title: item.title,
      year: item.publication_year,
      source: item.primary_location?.source?.display_name,
      url: item.id,
    }));

    return results;
  } catch (error) {
    console.error("OpenAlex Error:", error.message);
    return [];
  }
};

module.exports = { fetchOpenAlexData };