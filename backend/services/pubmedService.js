const axios = require("axios");
const xml2js = require("xml2js");

const fetchPubMedData = async (query) => {
  try {
    // STEP 1: Get IDs
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${query}&retmax=5&retmode=json`;

    const searchRes = await axios.get(searchUrl);
    const ids = searchRes.data.esearchresult.idlist.join(",");

    // STEP 2: Fetch details
    const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids}&retmode=xml`;

    const fetchRes = await axios.get(fetchUrl);

    // STEP 3: Convert XML → JSON
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(fetchRes.data);

    // STEP 4: Extract useful data
    const articles =
      result.PubmedArticleSet.PubmedArticle.map((item) => {
        const article = item.MedlineCitation.Article;

        return {
          title: article.ArticleTitle,
          abstract: article.Abstract?.AbstractText || "No abstract",
          journal: article.Journal.Title,
        };
      });

    return articles;
  } catch (error) {
    console.error("PubMed Error:", error.message);
    throw error;
  }
};

module.exports = { fetchPubMedData };