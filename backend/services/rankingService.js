const rankPublications = (data, query) => {
  const keywords = query.toLowerCase().split(" ");

  return data
    .map((item) => {
      let score = 0;

      const text = `${item.title || ""} ${item.abstract || ""}`.toLowerCase();

      // keyword match
      keywords.forEach((word) => {
        if (text.includes(word)) score += 2;
      });

      // abstract bonus
      if (item.abstract && item.abstract !== "No abstract") {
        score += 2;
      }

      // recency bonus (if year exists)
      if (item.year && item.year >= 2020) {
        score += 2;
      }

      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score);
};

module.exports = { rankPublications };