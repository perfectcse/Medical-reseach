const generateLLMResponse = async (query, publications, trials) => {
  try {
    let response = `🔍 Query: ${query}\n\n`;

    response += "📌 Condition Overview:\n";
    response += `This query focuses on ${query}. Based on research insights, here is a summary.\n\n`;

    response += "📚 Key Research Insights:\n";
    publications.slice(0, 3).forEach((p, i) => {
      response += `${i + 1}. ${p.title}\n`;
    });

    response += "\n🧪 Clinical Trials:\n";
    trials.slice(0, 3).forEach((t, i) => {
      response += `${i + 1}. ${t.title} (${t.status})\n`;
    });

    response += "\n💡 General Advice:\n";
    response += "Consult healthcare professionals and refer to latest clinical studies.";

    return response;

  } catch (error) {
    console.error("LLM ERROR:", error.message);
    return "Error generating response";
  }
};

module.exports = { generateLLMResponse };