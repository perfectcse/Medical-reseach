const { fetchPubMedData } = require("../services/pubmedService");
const { fetchOpenAlexData } = require("../services/openAlexService");
const { fetchClinicalTrials } = require("../services/clinicalTrialsService");
const { rankPublications } = require("../services/rankingService");
const { generateLLMResponse } = require("../services/llmService");

const searchData = async (req, res) => {
  try {
    const { disease, query } = req.query;

    // validation
    if (!disease || !query) {
      return res.status(400).json({
        error: "Please provide both disease and query",
      });
    }

    // query expansion
    const finalQuery = `${query} ${disease}`;

    // fetch all APIs
    const pubmedData = await fetchPubMedData(finalQuery);
    const openAlexData = await fetchOpenAlexData(finalQuery);
    const clinicalTrials = await fetchClinicalTrials(disease);

    // limit results
    const limitedPubmed = pubmedData.slice(0, 5);
    const limitedOpenAlex = openAlexData.slice(0, 5);
    const limitedTrials = clinicalTrials.slice(0, 3);

    // merge publications
    let publications = [
      ...limitedPubmed.map((item) => ({
        ...item,
        source: "PubMed",
      })),
      ...limitedOpenAlex.map((item) => ({
        ...item,
        source: "OpenAlex",
      })),
    ];

    // ranking
    publications = rankPublications(publications, finalQuery).slice(0, 6);

    // 🔥 LLM CALL (MOST IMPORTANT)
    const aiResponse = await generateLLMResponse(
      finalQuery,
      publications,
      limitedTrials
    );

    // final response
    res.json({
      query: finalQuery,
      aiResponse, // 🔥 THIS IS NEW
      totalResults: publications.length,
      publications,
      clinicalTrials: limitedTrials,
    });
  } catch (error) {
    console.error("Search Error:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = { searchData };