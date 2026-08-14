import type { BlogCategory } from "./blog";

export type BlogTopic = {
  category: BlogCategory;
  title: string;
  prompt: string;
  tags: string[];
};

export const blogTopics: BlogTopic[] = [
  // Technology topics
  {
    category: "technology",
    title: "CNC Wire Forming Automation Trends",
    prompt:
      "Write about the latest trends in CNC wire forming automation, including robotic integration, Industry 4.0 connectivity, and smart manufacturing. Focus on how these technologies improve efficiency and quality in wire form production.",
    tags: ["automation", "CNC", "Industry 4.0", "robotics"],
  },
  {
    category: "technology",
    title: "AI and Machine Learning in Wire Forming",
    prompt:
      "Discuss how artificial intelligence and machine learning are being applied to wire forming operations, including predictive maintenance, quality control, and process optimization.",
    tags: ["AI", "machine learning", "quality control", "optimization"],
  },
  {
    category: "technology",
    title: "3D CNC Wire Bending Innovations",
    prompt:
      "Explore recent innovations in 3D CNC wire bending technology, including new machine capabilities, software improvements, and applications in automotive, aerospace, and medical industries.",
    tags: ["3D bending", "CNC", "innovation", "wire forming"],
  },
  {
    category: "technology",
    title: "Wire Forming Software and Simulation",
    prompt:
      "Cover the latest developments in wire forming simulation software, CAD/CAM integration, and virtual prototyping tools that help manufacturers reduce setup time and material waste.",
    tags: ["software", "simulation", "CAD/CAM", "prototyping"],
  },

  // Trade shows topics
  {
    category: "trade-shows",
    title: "Upcoming Wire Forming Trade Shows",
    prompt:
      "Preview upcoming trade shows and events relevant to the wire forming industry, including FABTECH, Wire Expo, IMTS, and regional manufacturing events. Highlight what attendees can expect.",
    tags: ["trade shows", "FABTECH", "Wire Expo", "events"],
  },
  {
    category: "trade-shows",
    title: "Trade Show Highlights and Takeaways",
    prompt:
      "Summarize key highlights, new product announcements, and industry trends observed at recent manufacturing and metal forming trade shows.",
    tags: ["trade shows", "industry trends", "new products"],
  },

  // Industry news topics
  {
    category: "industry-news",
    title: "Wire Forming Industry Market Update",
    prompt:
      "Provide an overview of the current state of the wire forming industry, including market trends, demand drivers, and economic factors affecting manufacturers.",
    tags: ["market update", "industry trends", "manufacturing"],
  },
  {
    category: "industry-news",
    title: "Reshoring and Domestic Manufacturing",
    prompt:
      "Discuss the trend of reshoring wire forming and metal fabrication back to the United States, including factors driving this shift and its impact on the industry.",
    tags: ["reshoring", "domestic manufacturing", "supply chain"],
  },
  {
    category: "industry-news",
    title: "Workforce Development in Manufacturing",
    prompt:
      "Address workforce challenges in the wire forming industry, including skills gaps, training programs, and strategies for attracting new talent to manufacturing careers.",
    tags: ["workforce", "training", "careers", "skills gap"],
  },

  // Manufacturing topics
  {
    category: "manufacturing",
    title: "Wire Forming Quality Control Best Practices",
    prompt:
      "Share best practices for quality control in wire forming operations, including inspection methods, statistical process control, and common defects to watch for.",
    tags: ["quality control", "inspection", "best practices"],
  },
  {
    category: "manufacturing",
    title: "Reducing Setup Time in Wire Forming",
    prompt:
      "Discuss strategies for reducing setup time and changeover in CNC wire forming operations, including tooling organization, program management, and SMED principles.",
    tags: ["setup reduction", "efficiency", "SMED", "lean manufacturing"],
  },
  {
    category: "manufacturing",
    title: "Wire Forming Design for Manufacturability",
    prompt:
      "Explain design for manufacturability (DFM) principles specific to wire forms, including bend radius guidelines, tolerance considerations, and how to design parts that are easier and cheaper to produce.",
    tags: ["DFM", "design", "tolerances", "bend radius"],
  },

  // Materials topics
  {
    category: "materials",
    title: "Choosing the Right Wire Material",
    prompt:
      "Guide readers through selecting the appropriate wire material for their application, comparing carbon steel, stainless steel, copper, brass, and specialty alloys.",
    tags: ["materials", "wire selection", "alloys", "specifications"],
  },
  {
    category: "materials",
    title: "Wire Coatings and Surface Treatments",
    prompt:
      "Explore different wire coatings and surface treatments including zinc plating, powder coating, passivation, and specialty finishes for corrosion resistance and aesthetics.",
    tags: ["coatings", "plating", "surface treatment", "corrosion"],
  },
  {
    category: "materials",
    title: "Understanding Wire Specifications",
    prompt:
      "Explain how to read and understand wire specifications including tensile strength, temper, diameter tolerances, and industry standards like ASTM.",
    tags: ["specifications", "ASTM", "tensile strength", "standards"],
  },

  // Equipment topics
  {
    category: "equipment",
    title: "CNC Wire Forming Machine Comparison",
    prompt:
      "Compare different types of CNC wire forming machines including rotary benders, 2D formers, and 3D multi-axis machines. Discuss when each type is most appropriate.",
    tags: ["CNC machines", "equipment", "comparison", "wire bending"],
  },
  {
    category: "equipment",
    title: "Wire Straightening Equipment",
    prompt:
      "Cover wire straightening technology including rotary straighteners, roll straighteners, and best practices for achieving straight, stress-free wire.",
    tags: ["straightening", "equipment", "wire processing"],
  },
  {
    category: "equipment",
    title: "Welding Equipment for Wire Forms",
    prompt:
      "Discuss welding equipment used in wire form production including resistance welders, MIG/TIG setups, and robotic welding cells for high-volume production.",
    tags: ["welding", "resistance welding", "MIG", "TIG"],
  },
];

export function getRandomTopic(): BlogTopic {
  const randomIndex = Math.floor(Math.random() * blogTopics.length);
  return blogTopics[randomIndex];
}

export function getTopicsByCategory(category: BlogCategory): BlogTopic[] {
  return blogTopics.filter((topic) => topic.category === category);
}

export function getRotatingTopic(dayOfYear: number): BlogTopic {
  const index = dayOfYear % blogTopics.length;
  return blogTopics[index];
}

export function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}
