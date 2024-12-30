// data.js (Create a separate data file for better organization)
export const PRODUCT_DATA = [
    {
      id: 1,
      title: "Oxu az",
      source: "Oxu az",
      platform: "Website",
      link: "https://oxu.az",
      keywords: ["Azerbaijan", "Russia", "AZAL"],
      description: "Latest news from Oxu.az.",
      date: "2024-04-20T10:30:00Z", // ISO 8601 format
    },
    {
      id: 2,
      title: "Apa az",
      source: "Apa az",
      platform: "Telegram",
      link: "https://apa.az",
      keywords: ["Russia", "Grozny", "AZAL"],
      description: "Updates from Apa.az Telegram channel.",
      date: "2024-04-19T14:15:00Z",
    },
    {
      id: 3,
      title: "Baku WS",
      source: "Baku WS",
      platform: "X",
      link: "https://bakunews.az",
      keywords: ["Azerbaijan", "Airlines", "Russia"],
      description: "Breaking news from Baku WS.",
      date: "2024-04-18T09:45:00Z",
    },
    // ... other predefined products
    ...Array.from({ length: 1000 }, (_, i) => ({
      id: i + 7,
      title: `Title ${i + 7}`,
      source: `Source ${i + 7}`,
      platform: `Platform ${i % 5}`,
      link: `https://source${i + 7}.com`,
      keywords: ["Azerbaijan", "Russia", "AZAL"],
      description: "This is a sample description for the news source.",
      date: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(), // Random dates in the past
    })),
  ];
  