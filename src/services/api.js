const apiService = {
  getTeam: async () => {
    try {
      const response = await fetch('/api/team');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching team data:', error);
      // Return fallback data
      return {
        executive_director: {
          name: "Dr. Margaret Fagboyo",
          title: "Executive Director",
          bio: "With 24 years of experience in international development and multilateral partnerships, Dr Fagboyo is a seasoned development practitioner. She spent 18 years with the UK's Department for International Development (DFID, now FCDO), rising to the role of Acting Regional Coordinator for South West/South South Nigeria. From 2019 to 2022, she served as Special Adviser to the Ekiti State Governor on Development Partnerships and the SDGs, contributing to strategic policy execution at the state executive level. Dr Fagboyo holds a Master's degree in Public Administration and International Affairs from the University of Lagos and a Bachelor's degree in Education from the University of Ado Ekiti. In recognition of her contributions to public service, she was awarded an Honorary Doctorate in Public Administration (Honoris Causa) by Charisma University, Turks and Caicos Islands, a British Overseas Territory, in July 2021.",
          photo: "/img/dr-adesina.jpeg",
          vision: "A just and inclusive society where every individual, regardless of gender, background, or status, has equal opportunities to thrive and contribute to sustainable development.",
          message: "Welcome to IPADEV. We are committed to building bridges between communities, policymakers, and development practitioners to create sustainable change. Your support, whether through partnership, volunteering, or advocacy, helps us amplify the voices of those who need to be heard most. Together, we can build a more inclusive and equitable Nigeria."
        },
        board_members: [
          {
            name: "Dr. Adesina Fagbenro-Byron",
            role: "Board Chair",
            description: "Experienced development practitioner with expertise in policy advocacy and community development.",
            photo: "/img/dr-adesina.jpeg"
          },
          {
            name: "Margaret Fagboyo",
            role: "Executive Director",
            description: "Seasoned development practitioner with 24 years of experience in international development.",
            photo: "/img/margaret-fagboyo.jpg"
          },
          {
            name: "Olamide Falana",
            role: "Board Member",
            description: "Dedicated professional committed to social justice and community empowerment.",
            photo: "/img/olamide-falana.jpeg"
          },
          {
            name: "Ruth Essiet",
            role: "Board Member",
            description: "Passionate advocate for inclusive development and community transformation.",
            photo: "/img/ruth.jpeg"
          },
          {
            name: "Dominion Adelugba",
            role: "Board Member",
            description: "Experienced leader focused on sustainable development and capacity building.",
            photo: "/img/adelugba.jpeg"
          }
        ]
      };
    }
  }
};

export default apiService; 