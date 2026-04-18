const axios = require("axios");

const fetchClinicalTrials = async (disease) => {
  try {
    const url = `https://clinicaltrials.gov/api/v2/studies?query.cond=${disease}&pageSize=5&format=json`;

    const response = await axios.get(url);

    const trials = response.data.studies.map((study) => ({
      title: study.protocolSection.identificationModule.briefTitle,
      status: study.protocolSection.statusModule.overallStatus,
      location:
        study.protocolSection.contactsLocationsModule?.locations?.[0]
          ?.city || "Not specified",
    }));

    return trials;
  } catch (error) {
    console.error("ClinicalTrials Error:", error.message);
    return [];
  }
};

module.exports = { fetchClinicalTrials };